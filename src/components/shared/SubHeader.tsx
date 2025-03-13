import { navbarItemsContent } from "@/CONSTANT/data";
import { useState } from "react";
import { Link } from "react-router-dom";

function SubHeader() {
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

  const toggleSecondaryMenu = () => {
    setIsSecondaryMenuOpen(!isSecondaryMenuOpen);
  };

  return (
    <>
      {/* Desktop navbar */}
      <div className="hidden md:grid container mx-auto px-4 py-4 grid-cols-1 md:grid-cols-2 text-xs">
        <div className="flex gap-3 items-center">
          {navbarItemsContent.menu.map((item, index) => (
            <Link key={index} to={item.href}>
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex justify-between items-center gap-2 col-span-1">
          <p className="flex gap-2 items-center">
            {/* <HandShield /> */}
            {navbarItemsContent.subtext}
          </p>

          <p>
            {navbarItemsContent.contactText}{' '}
            <span className="font-bold">{navbarItemsContent.contactSpanText}</span>
          </p>

          {/* <div>
            <SelectItems placeholder={'English'} items={navbarItemsContent.languages} />
          </div> */}
        </div>
      </div>

      {/* Mobile navbar - toggle button */}
      <div className="md:hidden container mx-auto px-4 py-2">
        <button 
          className="text-xs flex items-center gap-1 text-gray-700 dark:text-gray-300"
          onClick={toggleSecondaryMenu}
        >
          More info
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 transition-transform ${isSecondaryMenuOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expandable secondary menu for mobile */}
        {isSecondaryMenuOpen && (
          <div className="mt-2 text-xs space-y-3 pb-2">
            <div className="flex flex-wrap gap-3">
              {navbarItemsContent.menu.map((item, index) => (
                <Link key={index} to={item.href} className="py-1">
                  {item.name}
                </Link>
              ))}
            </div>
            
            <p className="flex gap-2 items-center">
              {/* <HandShield /> */}
              {navbarItemsContent.subtext}
            </p>

            <p>
              {navbarItemsContent.contactText}{' '}
              <span className="font-bold">{navbarItemsContent.contactSpanText}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default SubHeader;