
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../Mail_templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");


exports.capturePayment = async (req, res) => {
    const { course_id } = req.body;
    const userId = req.user.id;
    if (!course_id) {
        return res.json({
            success: false,
            message: "please provide valid course id",
        })
    }

    let course;
    try {
        course = await Course.findById(course_id);
        if (!course) {
            return res.json({
                success: false,
                message: "Could not find the course",
            })
        }

        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            return res.status(402).json({
                success: false,
                message: "Student is already enrolled",
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }


    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
            courseId: course_id,
            userId,
        }
    };

    try {
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        return res.status(201).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "could not initiate orders",
        });
    }

};


exports.verifySignature = async (req, res) => {
    try {
        const webhookSecret = "0987654321";
        const signature = req.headers("x-razorpay-signature");

        const shasum = crypto.createHmac("sha256", webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if (signature === digest) {
            console.log("payment is authorised");
            const { courseId, userId } = req.body.payment.entity.notes;
            try {
                const enrolledCourse = await Course.findOneAndUpdate(
                    { _id: courseId },
                    { $push: { studentsEnrolled: userId } },
                    { new: true }

                );
                if (!enrolledCourse) {
                    return res.status(500).json({
                        success: false,
                        message: "Course not found"
                    });
                }

                console.log(enrolledCourse);
                const enrolledStudent = await User.findOneAndUpdate(
                    { _id: userId },
                    { $push: { courses: courseId } },
                    { new: true }
                )

                console.log(enrolledStudent);

                //mail send krdo confirmation wala//
                const emailResponse = await mailSender(
                    enrolledStudent.email,
                    "congratulation from the Atpoint",

                );

                console.log(emailResponse);
                return res.status(200).json({
                    success: true,
                    message: "Course added successfully"
                });

            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        } else {
            return res.status(500).json({
                success: false,
                message: "Invalid request",
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


