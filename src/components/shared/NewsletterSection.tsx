import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterSection() {
  return (
    <section className="bg-blue-900 text-white py-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          <a href="#" className="text-blue-300 underline">
            $20 discount
          </a>{" "}
          for your first order
        </p>
        <h2 className="text-2xl font-bold mt-2">Join our newsletter and get...</h2>
        <p className="text-gray-300 text-sm mt-2">
          Join our email subscription now to get updates on promotions and coupons.
        </p>

        <div className="mt-4 flex justify-center">
          <Input
            type="email"
            placeholder="Your email address"
            className="w-64 px-4 py-2 rounded-l-md border border-gray-300 text-black"
          />
          <Button className="rounded-r-md bg-white text-blue-900 px-4 py-2">Subscribe</Button>
        </div>
      </div>
    </section>
  );
}
