import React from "react";

const Header = ({ siteMetadata }) => {
  return (
    <header className="container mx-auto p-3 flex justify-between">
      <div>
        <h1 className="text-3xl m-2">
          Pin<span className="text-xs"> </span>4<span className="text-xs"> </span>Ukraine
        </h1>
      </div>
      <div>
        <ul className="flex">
          <li className="m-2">
            <a href="#">
              <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />Twitter</svg>
            </a>
          </li>
          <li className="m-2">
            <a href="#">
              <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />Instagram</svg>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
