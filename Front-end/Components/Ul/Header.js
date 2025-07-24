"use client";
import React, { useCallback, useState, useEffect } from "react";
import { FcBriefcase } from "react-icons/fc";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.studentReducer);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProtectedNav = useCallback((e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      if (!toast.isActive("auth-toast")) {
        toast.error("Please log in to access this resource!", {
          toastId: "auth-toast",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      window.location.href = path;
    }
  }, [isAuthenticated]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 py-2 bg-white z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto ">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <FcBriefcase className="text-2xl sm:text-3xl" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                <span className="text-blue-600">Career</span>Hub
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <button
              onClick={(e) => handleProtectedNav(e, "/jobs")}
              className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 transition-colors duration-200"
            >
              Jobs / Internships
            </button>

            <div className="flex items-center gap-1 group cursor-pointer px-3 py-2">
              <span className="text-gray-700 group-hover:text-blue-600 font-medium transition-colors duration-200">
                Online Trainings
              </span>
              <span className="bg-yellow-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                OFFER
              </span>
            </div>

            <button
              onClick={(e) => handleProtectedNav(e, "/fresher-jobs")}
              className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 transition-colors duration-200"
            >
              Fresher Jobs
            </button>

            <div className="flex items-center space-x-3 ml-4">
              <Link
                href="/student"
                className="px-3 py-1.5 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium text-sm transition-colors duration-200"
              >
                Student
              </Link>
              <Link
                href="/employe"
                className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm transition-colors duration-200"
              >
                Employer
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX className="h-5 w-5" />
              ) : (
                <FiMenu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white w-full overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="px-4 py-2 space-y-2 border-t border-gray-200">
          <button
            onClick={(e) => {
              handleProtectedNav(e, "/jobs");
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium"
          >
            Jobs / Internships
          </button>

          <button className="flex items-center w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium">
            <span>Online Trainings</span>
            <span className="ml-2 bg-yellow-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              OFFER
            </span>
          </button>

          <button
            onClick={(e) => {
              handleProtectedNav(e, "/fresher-jobs");
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium"
          >
            Fresher Jobs
          </button>

          <div className="pt-2 space-y-2">
            <Link
              href="/student"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-blue-600 hover:bg-blue-50 font-medium text-center border border-blue-500"
            >
              Student
            </Link>
            <Link
              href="/employe"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium text-center"
            >
              Employer
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;