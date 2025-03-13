import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageProps {
  images: string[];
}

export default function ProductImage({ images }: ProductImageProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handlePrev = () => {
    const index = images.indexOf(selectedImage);
    setSelectedImage(images[(index - 1 + images.length) % images.length]);
  };

  const handleNext = () => {
    const index = images.indexOf(selectedImage);
    setSelectedImage(images[(index + 1) % images.length]);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-[400px] h-[300px]">
        <img src={selectedImage} alt="Product" className="w-full h-full object-cover rounded-lg" />
        <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow" onClick={handlePrev}>
          <ChevronLeft />
        </button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow" onClick={handleNext}>
          <ChevronRight />
        </button>
      </div>
      <div className="flex mt-3 space-x-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Thumbnail"
            className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${selectedImage === img ? "border-blue-500" : "border-transparent"}`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>
  );
}
