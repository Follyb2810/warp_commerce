import React from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Newsletter: React.FC = () => {
  return (
    <section className="bg-navy-800 text-white py-20 text-center">
      <h3 className="text-3xl font-bold mb-5">Join our newsletter and get...</h3>
      <div className="flex items-center justify-center space-x-3">
        <Input type="email" placeholder="Your email address" className="w-72" />
        <Button>Subscribe</Button>
      </div>
    </section>
  );
};

export default Newsletter;
