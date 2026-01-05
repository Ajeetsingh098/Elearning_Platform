import React from 'react'
import HighlightText from '../Components/Core/HomePage/HighlightText'
import ContactFormSection from '../Components/Core/Aboutpage/ContactFormSection';
import Footer from '../Components/common/Footer';

const Stats = [
    { count: "5K", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
];

function About() {
    return (
        <div className='mx-auto text-white'>
            {/* Section 1: Hero */}
            <section className='bg-richblack-800'>
                <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white'>
                    <header className='mx-auto py-20 text-4xl font-semibold lg:w-[70%]'>
                        Driving Innovation in Online Education for a
                        <HighlightText text={"Brighter Future"} />
                        <p className='mx-auto mt-6 text-center text-base font-medium text-richblack-300 lg:w-[95%]'>
                            AtPoint is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                        </p>
                    </header>

                    {/* Images Section */}
                    <div className='grid grid-cols-3 gap-3 lg:gap-5 translate-y-[30%]'>
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500" alt="Students" className='rounded-xl object-cover h-37.5 lg:h-75  w-full shadow-lg shadow-blue-500/20' />
                        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=500" alt="Learning" className='rounded-xl object-cover h-37.5lg:h-75  w-full shadow-lg shadow-purple-500/40' />
                        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=500" alt="Collaboration" className='rounded-xl object-cover h-37.5 lg:h-75 w-full shadow-lg shadow-orange-500/20' />
                    </div>
                </div>
            </section>

            {/* Spacer for overlapping images */}
            <div className='h-25 lg:h-37.5'></div>

            {/* Section 2: Quote */}
            <section className='border-b border-richblack-700'>
                <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10'>
                    <div className='pb-20 text-center text-xl md:text-4xl font-semibold text-richblack-100'>
                        We are passionate about revolutionizing the way we learn. Our platform
                        <HighlightText text={"combines technology"} />,{" "}
                        <span className='bg-linear-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent font-bold'>
                            expertise
                        </span>, and community.
                    </div>
                </div>
            </section>

            {/* Section 3: Founding Story */}
            <section className='py-20'>
                <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10'>
                    <div className='flex flex-col items-center gap-10 lg:flex-row justify-between'>
                        <div className='flex lg:w-[50%] flex-col gap-10'>
                            <h1 className='bg-linear-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent'>
                                Our Founding Story
                            </h1>
                            <p className='text-base font-medium text-richblack-300'>
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It all started with a group of educators and technologists who recognized the need for accessible, high-quality learning in a digital world.
                            </p>
                            <p className='text-base font-medium text-richblack-300'>
                                We witnessed firsthand the limitations of traditional systems. We envisioned a platform that could bridge these gaps and empower individuals to unlock their full potential regardless of their geographical location.
                            </p>
                        </div>

                        <div className='lg:w-[45%]'>
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800"
                                alt="Founding Team"
                                className='rounded-2xl shadow-[0_0_20px_0_rgba(252,176,69,0.3)]'
                            />
                        </div>
                    </div>

                    <div className='flex flex-col items-center lg:flex-row justify-between gap-10 mt-20'>
                        <div className='flex lg:w-[40%] flex-col gap-6'>
                            <h1 className='bg-linear-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent'>
                                Our Vision
                            </h1>
                            <p className='text-base font-medium text-richblack-300'>
                                Our ultimate goal is to democratize education. We aim to make top-tier instruction available to anyone with a desire to grow, fostering a world where learning never stops.
                            </p>
                        </div>
                        <div className='flex lg:w-[40%] flex-col gap-6'>
                            <h1 className='bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-4xl font-semibold text-transparent'>
                                Our Mission
                            </h1>
                            <p className='text-base font-medium text-richblack-300'>
                                Our mission is to create a vibrant community of learners. We believe that through peer-to-peer interaction and expert mentorship, the learning process becomes truly impactful.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Stats Section with Boxed Backgrounds */}
            <section className='bg-richblack-800 py-20'>
                <div className='mx-auto w-11/12 max-w-maxContent'>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                        {Stats.map((data, index) => (
                            <div
                                key={index}
                                className='flex flex-col items-center justify-center gap-2 p-10 rounded-2xl bg-richblack-700 border border-richblack-600 hover:scale-105 transition-all duration-300 hover:bg-richblack-600 group'
                            >
                                <h1 className='text-4xl font-bold text-white group-hover:text-yellow-50'>
                                    {data.count}
                                </h1>
                                <h2 className='font-semibold text-richblack-400 group-hover:text-richblack-200'>
                                    {data.label}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 5: Why Choose Us */}
            <section className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col items-center gap-10 pb-20'>
                <div className='text-center'>
                    <h1 className='text-4xl font-semibold'>Why Choose <span className='text-blue-200'>AtPoint?</span></h1>
                    <p className='mt-3 text-richblack-300 max-w-150'>We combine industry-leading content with a world-class platform to ensure your success.</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    <div className='p-8 bg-richblack-800 border border-richblack-700 rounded-2xl hover:border-blue-500 transition-all'>
                        <div className='w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 text-blue-200 font-bold'>01</div>
                        <h3 className='text-xl font-bold mb-4'>Industry Experts</h3>
                        <p className='text-richblack-400 text-sm'>Learn from professionals who have years of experience in leading tech companies like Google, Meta, and Netflix.</p>
                    </div>
                    <div className='p-8 bg-richblack-800 border border-richblack-700 rounded-2xl hover:border-yellow-500 transition-all'>
                        <div className='w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-6 text-yellow-200 font-bold'>02</div>
                        <h3 className='text-xl font-bold mb-4'>Flexible Learning</h3>
                        <p className='text-richblack-400 text-sm'>Access your courses anytime, anywhere. Our platform is fully responsive and supports offline viewing on mobile devices.</p>
                    </div>
                    <div className='p-8 bg-richblack-800 border border-richblack-700 rounded-2xl hover:border-pink-500 transition-all'>
                        <div className='w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-6 text-pink-200 font-bold'>03</div>
                        <h3 className='text-xl font-bold mb-4'>Hands-on Projects</h3>
                        <p className='text-richblack-400 text-sm'>Don't just watch—build. Every course includes real-world projects that help you build a professional portfolio.</p>
                    </div>
                </div>
            </section>

            {/* Section 6: Contact Form */}
            <section className="bg-richblack-900  py-12 border-t border-richblack-800">

                <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 relative z-10'>
                
                    <div className='lg:w-150 w-full'>
                        <ContactFormSection />

                    </div>
                </div>
            </section>



            {/* section 7:reviews slider */}
            {/* <section>
                <div className='text-3xl text-center pb-5'>
                    Reviews from other learners
                </div>
            </section> */}

            {/* footerSection */}
            <Footer />


        </div>
    )
}

export default About