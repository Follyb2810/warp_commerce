import { useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon, Menu, X } from "lucide-react";
import AppButton from "./AppButton";
import SwitchButton from "./SwitchButton";
import Notification from "./Notification";
import { InputField } from "./InputField";
import CategorySelector from "./CategorySelector";

interface IMobileMenu {
  isOpen: boolean;
  closeMobile: () => void;
  handleOutsideClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const MobileMenu: React.FC<IMobileMenu> = ({ isOpen, closeMobile, handleOutsideClick }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-end md:hidden"
        onClick={handleOutsideClick}
      >
        <div
          className="w-64 h-full bg-gray-900 shadow-lg flex flex-col items-center justify-center gap-6 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={closeMobile} className="absolute top-5 right-5 text-white">
            <X className="w-6 h-6" />
          </button>
          <InputField
            id="search"
            type="text"
            placeholder="Search..."
            value=""
            onChange={() => {}}
            icon={<SearchIcon className="h-5 w-5" />}
            onIconClick={() => console.log("Search clicked")}
            containerClassName="w-3/4"
          />
          <nav>
            <ul className="flex flex-col gap-4 text-lg">
              {["Home", "Shop", "Duplex/High Rise", "Bungalow","Blog", "Contact"].map((item) => (
                <li key={item} className="text-warp-100 cursor-pointer">{item}</li>
              ))}
            </ul>
          </nav>
          <Notification />
          <SwitchButton />
          <AppButton label="Connect Wallet" variant="default" className="w-3/4" />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

interface ITopHeader {
  isOpen?: boolean;
  closeMobile?: () => void;
}

const TopHeader: React.FC<ITopHeader> = ({ isOpen, closeMobile }) => (
  <section className="p-3 flex items-center justify-between">
    <h2 className="text-lg font-bold text-warp-100 px-2">warppay</h2>
    <div className="flex md:hidden items-center gap-4">
      <AppButton label="Connect" variant="default" />
      <button onClick={closeMobile} className="text-white">
        {isOpen ? <X className="text-warp-100 w-6 h-6" /> : <Menu className="text-warp-100 w-6 h-6" />}
      </button>
    </div>
    <div className="hidden md:flex flex-1 justify-between items-center gap-6">
      <InputField
        id="search"
        type="text"
        placeholder="Search for product, house, land"
        value=""
        onChange={() => {}}
        icon={<SearchIcon className="h-5 w-5" />}
        onIconClick={() => console.log("Search clicked")}
        containerClassName="w-full max-w-sm"
      />
      <Notification />
      <SwitchButton />
      <AppButton label="Connect Wallet" variant="default" />
    </div>
  </section>
);

const BottomHeader: React.FC = () => (
  <section className="p-3 flex items-center border-t border-gray-700 gap-6">
    <CategorySelector />
    <nav className="hidden md:flex flex-1">
      <ul className="flex gap-6 justify-end w-full">
        {["Home", "Shop", "Duplex/High Rise", "Bungalow","Blog", "Contact"].map((item) => (
          <li key={item} className="text-warp-100 cursor-pointer text-xl">{item}</li>
        ))}
      </ul>
    </nav>
  </section>
);


const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMobile = () => setIsOpen((prev) => !prev);
  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <header className=" text-white">
      <TopHeader isOpen={isOpen} closeMobile={closeMobile} />
      <MobileMenu isOpen={isOpen} closeMobile={closeMobile} handleOutsideClick={handleOutsideClick} />
      <BottomHeader />
    </header>
  );
};

export default Header;
