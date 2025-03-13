import React from 'react';
// import AppButton from './AppButton';
// import { ArrowBigRight } from 'lucide-react';
import { Button } from '../ui/button';

const HeroSection: React.FC = () => {
  return (
    <section 
    className="flex items-center justify-start relative py-24 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `linear-gradient(rgba(18, 36, 66, 0.8), rgba(18, 36, 66, 0.8)), url("https://res.cloudinary.com/devgodfrey/image/upload/v1741693912/hero_house_xfs3vx.jpg")`
    }}
  >
    <div className="container mx-auto px-4 md:px-8 lg:px-12">
      <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-lg max-w-md">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Specialist in the Real Estate Business
        </h1>
        <Button variant={'default'} className=" text-white px-6 py-3 text-lg font-medium rounded-md hover:bg-primaryButton/90 transition-colors">
          Shop Now
        </Button>
      </div>
    </div>
  </section>
  );
};

export default HeroSection;
