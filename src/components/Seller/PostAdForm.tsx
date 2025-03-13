import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function PostAdForm() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Post An Ad</h1>

      {/* General Info Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-2">General Info</h2>

        <div className="mt-4">
          <Label htmlFor="listingName">Listing Name <span className="text-red-500">*</span></Label>
          <Input id="listingName" placeholder="Enter listing name" className="mt-2" required />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="landSize">Land Size <span className="text-red-500">*</span></Label>
            <div className="relative">
              <Input id="landSize" placeholder="Enter land size" className="mt-2 pr-10" required />
              <span className="absolute right-3 top-3 text-gray-500">ac</span>
            </div>
          </div>

          <div>
            <Label htmlFor="price">Price (USD) <span className="text-red-500">*</span></Label>
            <div className="relative">
              <Input id="price" placeholder="Enter price" className="mt-2 pr-10" required />
              <span className="absolute right-3 top-3 text-gray-500">$</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-2">Description</h2>
        <Textarea id="description" placeholder="Enter a detailed description..." className="mt-4 h-32" />
      </div>

      {/* Submit Button */}
      <Button className="w-full">Post Ad</Button>
    </div>
  );
}
