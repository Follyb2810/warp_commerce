import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Image, X } from "lucide-react";
import { InputField } from "../shared/InputField";

export default function PostAdForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [documentError, setDocumentError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && e.target.name === "document_of_land") {
      if (file.type !== "application/pdf") {
        setDocumentError("Only PDF documents are allowed.");
      } else {
        setDocumentError("");
      }
    }
  };
  const removeImage = () => {
    setImagePreview(null);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <form
      className="container mx-auto px-6 py-10 max-w-3xl bg-white shadow-md rounded-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Post An Ad</h1>

      <div className="space-y-6">
        <Card className="p-4 border">
          <h2 className="text-lg font-semibold border-b pb-2">General Info</h2>

          <div className="mt-4">
            <InputField id="title" containerClassName="mt-4" className="mt-2" placeholder="Enter title" required value=""/>
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter title"
              required
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="size_of_land">
                Land Size <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="size_of_land"
                  name="size_of_land"
                  placeholder="Enter land size"
                  required
                  className="mt-2 pr-10"
                />
                <span className="absolute right-3 top-3 text-gray-500">ac</span>
              </div>
            </div>

            <div>
              <Label htmlFor="price">
                Price (USD) <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="price"
                  name="price"
                  placeholder="Enter price"
                  required
                  className="mt-2 pr-10"
                />
                <span className="absolute right-3 top-3 text-gray-500">$</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Input
                id="category"
                name="category"
                placeholder="Enter category"
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="stock">
                Stock <span className="text-red-500">*</span>
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                placeholder="Enter stock"
                required
                className="mt-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="address">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter address"
              required
              className="mt-2"
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="mapping_location">
              Mapping Location <span className="text-red-500">*</span>
            </Label>
            <Input
              id="mapping_location"
              name="mapping_location"
              placeholder="Enter mapping location"
              required
              className="mt-2"
            />
          </div>
        </Card>

        <Card className="p-4 border">
          <h2 className="text-lg font-semibold border-b pb-2">Description</h2>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter a detailed description..."
            required
            className="mt-4 h-32"
          />
        </Card>

        <Card className="p-4 border">
          <h2 className="text-lg font-semibold border-b pb-2">Upload Files</h2>

          <div className="mt-4">
            <Label htmlFor="image_of_land">
              Image of Land <span className="text-red-500">*</span>
            </Label>
            <Input
              id="image_of_land"
              name="image_of_land"
              type="file"
              accept="image/*"
              required
              className="mt-2"
              onChange={handleImageChange}
            />
            {imagePreview ? (
              <div className="relative mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-40 mt-4 border border-dashed rounded-lg">
                <Image className="w-10 h-10 text-gray-400" />
                <p className="text-gray-500 text-sm ml-2">
                  Image preview will appear here
                </p>
              </div>
            )}
          </div>

          <div className="mt-4">
            <Label htmlFor="document_of_land">
              Document of Land (PDF) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="document_of_land"
              name="document_of_land"
              type="file"
              accept="application/pdf"
              required
              className="mt-2"
              onChange={handleFileChange}
            />
            {documentError && (
              <p className="text-red-500 text-sm mt-1">{documentError}</p>
            )}
          </div>
        </Card>
      </div>

      <Button className="w-full mt-6 text-lg">Post Ad</Button>
    </form>
  );
}
