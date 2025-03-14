import { Heart, Share2, RefreshCw } from "lucide-react";

export default function ProductActions() {
  return (
    <div className="flex space-x-4 text-gray-600 mt-4 py-2">
      <button className="flex items-center space-x-1 hover:text-black">
        <Heart className="w-5 h-5" />
        <span>Add to Wishlist</span>
      </button>
      <button className="flex items-center space-x-1 hover:text-black">
        <Share2 className="w-5 h-5" />
        <span>Share this Product</span>
      </button>
      <button className="flex items-center space-x-1 hover:text-black">
        <RefreshCw className="w-5 h-5" />
        <span>Compare</span>
      </button>
    </div>
  );
}
