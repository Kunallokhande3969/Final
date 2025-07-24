"use client";
import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image";

const careerCards = [
  {
    src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/int_opps-student.png.webp",
    alt: "Internship Opportunities",
    title: "Premium Internships",
    description: "Work with Fortune 500 companies with stipends up to ₹7.3L",
    cta: "Apply Now",
    accentColor: "from-blue-500 to-blue-600",
    textColor: "text-blue-600",
  },
  {
    src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/exp_hiring-student.png.webp",
    alt: "AI Careers",
    title: "AI Leadership Roles",
    description: "Top-tier positions with compensation up to ₹73LPA",
    cta: "View Openings",
    accentColor: "from-purple-500 to-purple-600",
    textColor: "text-purple-600",
  },
  {
    src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/pgc_banner-student.png.webp",
    alt: "Online Courses",
    title: "Executive Education",
    description: "Upskill with programs from IITs and global universities",
    cta: "Explore Courses",
    accentColor: "from-green-500 to-green-600",
    textColor: "text-green-600",
  },
];

const Main = () => {
  const [activeCard, setActiveCard] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.studentReducer);

  const handleAuthAction = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      toast.error("Please login to access this feature", {
        toastId: "auth-error",
        position: "bottom-center",
      });
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Build Your <span className="text-blue-600">Future</span> With Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Access exclusive opportunities curated for India's top talent
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-20">
          {careerCards.map((card, index) => (
            <div
              key={index}
              className={`relative group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 ease-out h-80 md:h-96 border-t-4 ${card.textColor.replace(
                "text-",
                "border-"
              )}`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Image Container with Smoother Zoom */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeCard === index ? "scale-110" : "scale-100"
                  }`}
                  quality={90}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-500" />

              {/* Content with Smoother Transitions */}
              <div className="relative h-full flex flex-col justify-end p-4 md:p-6 text-white">
                <div
                  className={`transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeCard === index
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-90"
                  }`}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200 mb-4">
                    {card.description}
                  </p>
                </div>

                <button
                  onClick={(e) => handleAuthAction(e, "/student")}
                  className={`w-full flex items-center justify-center bg-white ${
                    card.textColor
                  } py-2 md:py-3 px-4 rounded-lg font-medium transition-all duration-500 ease-out ${
                    activeCard === index
                      ? "opacity-100 translate-y-0 hover:scale-[1.02] hover:shadow-sm"
                      : "opacity-0 translate-y-5 pointer-events-none"
                  }`}
                >
                  {card.cta}
                  <FiArrowRight
                    className={`ml-2 transition-transform duration-300 ${
                      activeCard === index ? "group-hover:translate-x-1" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section with Enhanced Button */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto bg-gray-50 rounded-xl p-6 md:p-8 mb-8 md:mb-12">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">
              Ready to accelerate your career?
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6">
              Join 10,000+ professionals who transformed their careers with us
            </p>
            <button
              onClick={(e) => handleAuthAction(e, "/student")}
              className="group inline-flex items-center px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium md:font-bold rounded-lg text-base md:text-lg transition-all duration-500 ease-out hover:from-blue-700 hover:to-blue-600 hover:shadow-lg"
            >
              <span className="relative inline-block overflow-hidden">
                <span className="block transition-transform duration-500 group-hover:-translate-y-6">
                  Get Started
                </span>
                <span className="absolute left-0 top-6 block w-full text-center transition-transform duration-500 group-hover:-translate-y-6">
                  Let's Go!
                </span>
              </span>
              <FiArrowRight className="ml-2 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
