import { Link } from "react-router-dom";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-white text-center py-6">
      <SocialIcons />

      <p className="text-gray-400 text-sm mt-4">Copyright © 2025 © All rights reserved WebPay</p>
      <div className="flex justify-center space-x-4 text-sm text-gray-500 mt-2">
        <Link to='/' className="hover:text-blue-500">Privacy Policy</Link>
        <Link to='/' className="hover:text-blue-500">Terms and Conditions</Link>
        <Link to='/' className="hover:text-blue-500">Cookie</Link>
      </div>
    </footer>
  );
}
