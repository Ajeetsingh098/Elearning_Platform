# Elearning_Platform

                                  
                                     
 An interactive Learning Management System (LMS) designed to bring high-quality education to your home. This platform allows students to access courses and instructors to manage content through a seamless, modern interface.

 Live Demo: [elearning-platform-lovat.vercel.app](https://elearning-platform-lovat.vercel.app/)

<img width="1912" height="1001" alt="Screenshot 2026-02-05 165605" src="https://github.com/user-attachments/assets/6fd91acb-c1e8-4570-acda-675cab516abf" />
<img width="1917" height="960" alt="Screenshot 2026-02-05 165625" src="https://github.com/user-attachments/assets/c476ef02-b977-48b0-a292-73e2e18fdd5d" />
<img width="1914" height="1012" alt="Screenshot 2026-02-05 165810" src="https://github.com/user-attachments/assets/cf979f50-17ac-4521-b6a0-29f088d203c4" />
<img width="1915" height="1005" alt="Screenshot 2026-02-05 165706" src="https://github.com/user-attachments/assets/7fadd244-81b8-4ca6-acdb-eec0311bb508" />

 Key Features:-

 
                       Course Management: Browse, enroll in, and track progress through various educational modules.

                      Secure Authentication: Role-based access control for Students and Instructors.

                      Interactive UI: A clean, focused learning environment built with React and Tailwind CSS.

                      Robust Backend: High-performance API built with Node.js and Express, featuring optimized CORS configurations for secure cross-origin requests.

                      Deployment Ready: Frontend optimized for Vercel and Backend prepared for scalable hosting.


 Tech Stack:-

 
                       Frontend: React.js: Component-based UI structure.

                      Tailwind CSS: Utility-first styling for a responsive and modern look.

                      Vercel: Optimized production deployment.

                      Backend: Node.js & Express.js: Scalable server-side logic.

                     CORS Middleware: Secured communication between frontend and backend.

                      RESTful API: Structured endpoints for user and course data.


 System Overview:-

 
                      The platform uses a decoupled architecture to ensure speed and security:

                      Client Layer: The React frontend handles routing and state management for a smooth user experience.

                      API Layer: The Express backend manages business logic, data validation, and security headers.

                      Data Layer: ( using MongoDB) Centralized storage for course videos, descriptions, and user progress.


 Project Structure:-
 

                         Elearning_Platform/
                                              ├── Backend/            # Express.js server & API logic
                                              │   ├── controllers/    # Route controllers
                                              │   ├── middleware/     # Auth and CORS handling
                                              │   └── routes/         # API endpoints
                                              ├── Frontend/           # React frontend application
                                              │   ├── src/components/ # Reusable UI components
                                              │   └── src/pages/      # Dashboard and Course views
                                                   └── README.md

                                                   
 Local Setup:-

 
            Clone the project:

                                   Bash
                                   git clone https://github.com/Ajeetsingh098/Elearning_Platform.git
            Backend Configuration:
 
                                   Bash
                                   cd Backend
                                   npm install
                                     npm start
            Frontend Configuration:

                                    Bash
                                    cd ../Frontend
                                     npm install
                                    npm run dev

                                    
Author

                Ajeet Singh 
