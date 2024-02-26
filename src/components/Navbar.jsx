import { useState } from "react";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [navbarState, setNavbarState] = useState("closed");
  const toggleNavBar = () => {
    setNavbarState((prevState) => (prevState === "closed" ? "open" : "closed"));
  };
  const menu2 = [
    {
      label : 'Mortgages',
      link : ''
    },
    {
      label : 'Business',
      link : ''
    },
    {
      label : 'GIC Rates',
      link : ''
    },
    {
      label : 'Earn In Mortgages',
      link : ''
    }
  ]
  return (
    <>
    <nav className="flex justify-between items-center px-16 py-6 bg-black max-lg:px-4 max-lg:py-4">
      {navLinks.map((link, index) => {
        if (link.img) {
          return (
            <div key={`nav-link-${index}`}>
              <Link to={link.href}>
                <img
                  src={link.img}
                  alt="nav-logo"
                  className="w-[250px] max-lg:w-[200px] max-sm:w-[150px]"
                />
              </Link>
            </div>
          );
        }
        return (
          <div key={`nav-link-${index}`} className="max-lg:hidden">
            <Link
              to={link.href}
              className="text-white hover:text-slate-gray font-lato"
            >
              {link.label}
            </Link>
          </div>
        );
      })}
      <div
        className={`lg:hidden bg-white fixed flex flex-col items-center top-0 left-0 w-[100vw] h-[100vh] px-4 py-12 z-10 transition duration-500 ${
          navbarState === "closed" ? "translate-x-[100%]" : "translate-x-0"
        }`}
      >
        {navLinks.map((link, index) => {
          if (link.img) {
            return "";
          }
          return (
            <div key={`nav-link-${index}`} className="my-6">
              <Link to={link.href} className="font-lato text-theme-purple">
                {link.label}
              </Link>
            </div>
          );
        })}
      </div>

      <div className="lg:hidden z-20">
        <img src="" alt="" />
        <p className="text-white" onClick={toggleNavBar}>
          <span
            className={`block w-6 h-[2px] mb-1 bg-slate-300 transition ${
              navbarState === "open" ? "rotate-45 translate-y-[3px]" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-[2px] mb-1 bg-slate-300 ${
              navbarState === "open" ? "transition hidden" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-[2px] mb-1 bg-slate-300 transition ${
              navbarState === "open"
                ? "rotate-[-45deg] translate-y-[-3px]"
                : "0"
            }  `}
          ></span>
        </p>
      </div>
    </nav>
    {/* Menu */}
    <div className="bg-white py-9 w-[60%] mx-auto flex justify-between">
            {
              menu2.map((e,i)=>{
                return (<div>
                  <a className="text-theme-purple text-lg" href={e.link}>{e.label}</a>
                </div>)
              })
            }
    </div>
    </>
  );
};

export default Navbar;
