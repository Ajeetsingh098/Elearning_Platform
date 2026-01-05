


const Tag = require("../models/Tags");

exports.createTag = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required",
            });
        }

        const tagDetails = await Tag.create({ name, description });
        
        return res.status(200).json({
            success: true,
            message: "Tag created successfully",
            data: tagDetails
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.showAlltags = async (req, res) => {
    try {
       
        const allTags = await Tag.find({});
        return res.status(200).json({
            success: true,
            message: "All tags returned successfully",
            data: allTags
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.tagPageDetails = async (req, res) => {
    try {
        const { tagId } = req.body;

       
        const selectedTag = await Tag.findById(tagId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: [
                    { path: "instructor" },
                    { path: "ratingAndReviews" }
                ]
            })
            .exec();

        if (!selectedTag) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

    
        const differentCategories = await Tag.find({ _id: { $ne: tagId } })
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: { path: "instructor" }
            })
            .exec();

       
        const allCategories = await Tag.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: { path: "instructor" }
            })
            .exec();

        const allCourses = allCategories.flatMap((tag) => tag.courses);
       
        const mostSellingCourses = allCourses
            .sort((a, b) => (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0))
            .slice(0, 10);

        return res.status(200).json({
            success: true,
            data: {
                selectedTag,
                differentCategories,
                mostSellingCourses
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};













// const Tag = require("../models/Tags");


// exports.createTag = async (req, res) => {
//     try {
//         const { name, description } = req.body;
//         if (!name || !description) {
//             return res.status(402).json({
//                 success: false,
//                 message: "All field required",
//             })
//         }

//         const tagDetails = await Tag.create({
//             name: name,
//             description: description,
//         });
//         console.log(tagDetails)

//         return res.status(200).json({
//             success: true,
//             message: "tag created successfully",
//         })

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         })
//     }
// };


// exports.showAlltags = async (req, res) => {
//     try {

//         const allTags = await Tag.find({}, { name: true, description: true });
//         return res.status(200).json({
//             success: true,
//             message: "All tags return successfully",
//             data: allTags

//         })

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         })
//     }
// };


// exports.tagPageDetails = async (req, res) => {
//     try {
//         const { tagId } = req.body;

//         const selectedTag = await Tag.findById(tagId)
//             .populate(

//                 {
//                     path: "courses",
//                     match: { status: "Published" },
//                     populate: "ratingAndReviews"
//                 }

//             ).exec();

//         if (!selectedTag) {
//             return res.status(400).json({
//                 success: false,
//                 message: "data not found",

//             })
//         }
//         if (selectedTag.courses.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "No courses found for the selected tag",

//             })
//         }

//         const diffTag = await Tag.find({ _id: { $ne: tagId } }).populate("course").exec();

//         //top 10 courses apend here
//         const allTags = await Tag.find()
//             .populate({
//                 path: "courses",
//                 match: { status: "Published" },
//             }).exec();

//             const allCourses=allTags.flatMap((tag)=>tag.courses)
//              const mostSellingCourses=allCourses.sort((a,b)=>b.sold-a.sold).slice(0,10);
             
//         return res.status(200).json({
//             success: true,
//             data: {
//                 selectedTag,
//                 diffTag,
//                 mostSellingCourses
//             },
//             message: "all course here",

//         })


//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Interval server error",
//             error: error.message,
//         })
//     }
// }