import { Facebook, Twitter, Instagram } from "lucide-react";

export default function SocialIcons() {
  return (
    <div className="flex space-x-4 justify-center mt-4">
      <a href="#" className="text-gray-600 hover:text-blue-500">
        <Facebook />
      </a>
      <a href="#" className="text-gray-600 hover:text-blue-500">
        <Twitter />
      </a>
      <a href="#" className="text-gray-600 hover:text-blue-500">
        <Instagram />
      </a>
    </div>
  );
}
