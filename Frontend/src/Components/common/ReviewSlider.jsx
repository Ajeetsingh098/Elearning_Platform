import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import { apiConnector } from "../../Services/apiConnector";
import { courseEndpoints } from "../../Services/api";
import { FaStar } from "react-icons/fa";

function ReviewSlider() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllReviews = async () => {
            setLoading(true);
            try {
                const res = await apiConnector("GET", courseEndpoints.GET_ALL_RATING_API);
                if (res?.data?.success) {
                    setReviews(res?.data?.data);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllReviews();
    }, []);

    if (loading) return <div className="h-37.5 flex items-center justify-center text-white">Loading Reviews...</div>;

    return (
        <div className="w-full max-w-300 mx-auto px-4">
            <Swiper
                // These settings create the "centered with peek" effect
                slidesPerView={1.2} 
                spaceBetween={20}
                centeredSlides={true}
                loop={reviews.length > 3} 
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                  
                    640: {
                        slidesPerView: 1.8,
                    },
                  
                    1024: {
                        slidesPerView: 2.5,
                        spaceBetween: 30,
                    },
                }}
                modules={[FreeMode, Pagination, Autoplay]}
                className="pb-12" 
            >
                {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex flex-col gap-4 bg-slate-800 p-6 text-[14px] text-slate-25 rounded-2xl border border-slate-700 min-h-50 transition-all duration-300 hover:border-yellow-400/50">
                            <div className="flex items-center gap-4">
                                <img
                                    src={review?.user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}`}
                                    alt="Profile"
                                    className="h-12 w-12 rounded-full object-cover border-2 border-slate-600"
                                />
                                <div className="flex flex-col overflow-hidden">
                                    <h1 className="font-bold text-white truncate">
                                        {review?.user?.firstName} {review?.user?.lastName}
                                    </h1>
                                    <h2 className="text-[12px] font-medium text-yellow-500/80 truncate">
                                        {review?.course?.courseName}
                                    </h2>
                                </div>
                            </div>
                            
                            <p className="font-medium text-slate-400 italic leading-relaxed line-clamp-4">
                                "{review?.review}"
                            </p>

                            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-700/50">
                                <span className="font-bold text-yellow-400 text-lg">
                                    {review.rating.toFixed(1)}
                                </span>
                                <ReactStars
                                    count={5}
                                    value={review.rating}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<FaStar />}
                                    fullIcon={<FaStar />}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ReviewSlider;