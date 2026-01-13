

const express = require("express");
const app = express();



const UserRoutes = require("./routes/User");
const ProfileRoutes = require("./routes/Profile");
const PaymentRoutes = require("./routes/Payment");
const CourseRoutes = require("./routes/Course");
const TagRoutes = require("./routes/Tag");


const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;



database.connect();




app.use(
    cors({
        origin: ["https://elearning-platform-1-uwnb.onrender.com",
            "https://elearning-platform-5fsba7rr0-ajeet-singhs-projects-24e97d87.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
);

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}));

cloudinaryConnect();


app.use("/api/v1/auth", UserRoutes);
app.use("/api/v1/profile", ProfileRoutes);
app.use("/api/v1/course", CourseRoutes);
app.use("/api/v1/payment", PaymentRoutes);
app.use("/api/v1/tag", TagRoutes);


app.get("/", (req, res) => {
    return res.status(201).json({
        success: true,
        message: "Your server is up and running"
    })
});


app.listen(PORT, () => {
    try {
        console.log(`Site is running at http://localhost:${PORT}`)
    } catch (error) {
        console.log("server is not started", error)
    }
})

