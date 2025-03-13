import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-white text-center py-6">
      <p className="text-lg font-semibold">8 800 555-55</p>
      <p className="text-gray-500 text-sm">Working 8:00 - 22:00</p>

      <SocialIcons />

      <p className="text-gray-400 text-sm mt-4">Copyright © 2025 © All rights reserved WebPay</p>
      <div className="flex justify-center space-x-4 text-sm text-gray-500 mt-2">
        <a href="#" className="hover:text-blue-500">Privacy Policy</a>
        <a href="#" className="hover:text-blue-500">Terms and Conditions</a>
        <a href="#" className="hover:text-blue-500">Cookie</a>
      </div>
    </footer>
  );
}
