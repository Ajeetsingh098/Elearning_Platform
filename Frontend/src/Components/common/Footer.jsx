import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaGoogle,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Community = ["Forums", "Chapters", "Events"];
const Plans = ["Paid Membership", "For Students", "Business Solutions"];
const Resources = [
  "Articles",
  "Blog",
  "Cheat Sheets",
  "Code Challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];

function Footer() {
  return (
    <footer className="bg-linear-to-t from-slate-950 via-slate-900 to-slate-800 text-slate-400">
      <div className="w-11/12 max-w-7xl mx-auto py-16">

        {/* ================= TOP FOOTER ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo + Description */}
          <div className="flex flex-col gap-4">
            <h2 className="text-white text-xl font-semibold">
              Coding Skills
            </h2>
            <p className="text-sm leading-relaxed">
              Learn industry-level coding skills with expert-led courses and
              become job-ready from anywhere in the world.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4 text-lg">
              <a href="#" className="hover:text-white hover:scale-110 transition-all duration-200">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-white hover:scale-110 transition-all duration-200">
                <FaGoogle />
              </a>
              <a href="#" className="hover:text-white hover:scale-110 transition-all duration-200">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-white hover:scale-110 transition-all duration-200">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {Community.map((item, index) => (
                <li key={index}>
                  <Link to="/" className="hover:text-white transition duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Plans */}
          <div>
            <h3 className="text-white font-semibold mb-4">Plans</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {Plans.map((item, index) => (
                <li key={index}>
                  <Link to="/" className="hover:text-white transition duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {Resources.map((item, index) => (
                <li key={index}>
                  <Link to="/" className="hover:text-white transition duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="border-t border-slate-700/60 my-10"></div>

        {/* ================= BOTTOM FOOTER ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>
            © {new Date().getFullYear()} Coding Skills. All rights reserved.
          </p>

          <div className="flex gap-6">
            {BottomFooter.map((item, index) => (
              <Link
                key={index}
                to="/"
                className="hover:text-white transition duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;




































// import React from 'react'
// import { Link } from 'react-router-dom';
// import { FaFacebook,FaGoogle,FaTwitter,FaYoutube } from 'react-icons/fa'

// const ButtomFooter=["Privacy Policy","Cookie","Terms"];

// const Community=["Forms","Chapters","Events"];
// const Plans=["Paid Membership","For Students","Bussiness Solutions"];
// const Resources=["Articles","Blog","Chart Sheet","Code challenges","Docs","projects","Videos","Workspaces"];

// function Footer() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Footer
