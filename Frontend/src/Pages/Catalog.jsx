import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiConnector } from "../Services/apiConnector";
import { categories } from "../Services/api";
import { FaStar, FaUserGraduate } from "react-icons/fa";

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    // Dynamic Rating Calculation
    useEffect(() => {
        const count = course.ratingAndReviews?.length;
        if (count > 0) {
            const totalRating = course.ratingAndReviews.reduce((acc, curr) => acc + curr.rating, 0);
            const multiplier = Math.pow(10, 1);
            setAvgReviewCount(Math.round((totalRating / count) * multiplier) / multiplier);
        } else {
            setAvgReviewCount(0);
        }
    }, [course]);

    return (
        <div
            onClick={() => navigate(`/courses/${course._id}`)}
            className="group bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 cursor-pointer flex flex-col"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-yellow-400 text-xs font-bold border border-yellow-400/20">
                    ₹{course.price}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col grow">
                <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                    {course.courseName}
                </h3>

                <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                    {course.courseDescription}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-4 text-slate-400 text-xs">
                    <div className="flex items-center gap-1">
                        <FaUserGraduate className="text-yellow-400" />
                        <span>{course.studentsEnrolled?.length || 0} Students</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaStar className={`${avgReviewCount > 0 ? "text-yellow-400" : "text-slate-600"}`} />
                        <span className={avgReviewCount > 0 ? "text-white" : "text-slate-500"}>
                            {avgReviewCount > 0 ? avgReviewCount : "No Ratings"}
                        </span>
                        <span className="text-slate-500">({course.ratingAndReviews?.length || 0})</span>
                    </div>
                </div>

                <div className="mt-auto pt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img
                            src={course.instructor.image}
                            className="h-6 w-6 rounded-full border border-slate-600 object-cover"
                            alt="instructor"
                        />
                        <span className="text-slate-300 text-xs font-medium">
                            {course.instructor.firstName} {course.instructor.lastName}
                        </span>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/courses/${course._id}`);
                        }}
                        className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    );
};

const Catalog = () => {
    const { categoryName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getCategoryDetails = async () => {
            setLoading(true);
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API);
                const category_id = res?.data?.data?.filter(
                    (ct) => ct.name.split(" ").join("-").toLowerCase() === categoryName
                )[0]?._id;

                if (category_id) setCategoryId(category_id);
            } catch (error) {
                console.error("Fetch categories error", error);
            }
        };
        getCategoryDetails();
    }, [categoryName]);

    useEffect(() => {
        const getCategoryPageDetails = async () => {
            if (!categoryId) return;
            try {
                const res = await apiConnector("POST", categories.CATEGORY_PAGE_DETAILS_API, {
                    tagId: categoryId,
                });

                if (!res.data.success) {
                    throw new Error("Could not fetch category page data");
                }
                setCatalogPageData(res?.data);
            } catch (error) {
                console.error("API Error:", error);
            } finally {
                setLoading(false);
            }
        };
        getCategoryPageDetails();
    }, [categoryId]);

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <nav className="text-sm text-slate-500 mb-4 flex gap-2">
                        <span onClick={() => navigate("/")} className="hover:text-white cursor-pointer transition-colors">Home</span>
                        <span>/</span>
                        <span>Catalog</span>
                        <span>/</span>
                        <span className="text-yellow-400 font-medium capitalize">{categoryName.replace("-", " ")}</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-extrabold capitalize bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        {categoryName.replace("-", " ")}
                    </h1>
                    <p className="text-slate-400 mt-4 max-w-2xl text-lg">
                        Master {categoryName.replace("-", " ")} with our expert-led courses. High-quality content designed to take you from beginner to pro.
                    </p>
                </header>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="h-80 bg-slate-800 animate-pulse rounded-2xl border border-slate-700"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      
                        {catalogPageData?.data?.selectedTag?.courses?.length > 0 ? (
                            catalogPageData.data.selectedTag.courses.map((course) => (
                                <CourseCard key={course._id} course={course} />
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                                <p className="text-slate-500 text-xl font-medium">No courses available for this category yet.</p>
                                <button onClick={() => navigate("/")} className="mt-4 text-yellow-400 hover:underline">Check other categories</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog;





