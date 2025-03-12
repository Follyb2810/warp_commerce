import React from 'react';
import AppButton from './AppButton';
import { ArrowBigRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section
      className="bg-[url('https://placehold.co/600x400/000000/FFFFFF/png')] bg-cover bg-center text-white py-24 flex flex-col"
    >
      <div className="p-4">
        <h4 className="text-2xl font-bold mb-5">
          Specialist in the <br /> Real Estate Business
        </h4>
        <span>Only this week</span>
        <p>from $1999</p>
        <AppButton
          label="Shop Now"
          rightIcon={<ArrowBigRight />}
          className="border-0 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-warp-100"
        />
      </div>
    </section>
  );
};

export default HeroSection;
