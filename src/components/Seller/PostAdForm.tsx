import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image, X } from "lucide-react";
import { InputField } from "../shared/InputField";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function PostAdForm() {
  const [formData, setFormData] = useState({
    title: "",
    size_of_land: "",
    price: "",
    category: "",
    stock: "",
    address: "",
    mapping_location: "",
    description: "",
    document_of_land: null as File | null,
    image_of_land: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [documentError, setDocumentError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      setFormData({ ...formData, image_of_land: file });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && e.target.name === "document_of_land") {
      if (file.type !== "application/pdf") {
        setDocumentError("Only PDF documents are allowed.");
      } else {
        setDocumentError("");
        setFormData({ ...formData, document_of_land: file });
      }
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, image_of_land: null });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form className="container mx-auto px-6 py-10 max-w-3xl bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card className="p-4 border">
          <h2 className="text-lg font-semibold border-b pb-2">Post An Ad</h2>

          <InputField id="title" label="Title" placeholder="Enter title" required value={formData.title} onChange={handleChange} />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <InputField id="size_of_land" label="Land Size" placeholder="Enter land size" required value={formData.size_of_land} onChange={handleChange} />
            <InputField id="price" label="Price (USD)" placeholder="Enter price" required value={formData.price} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <InputField id="category" label="Category" placeholder="Enter category" required value={formData.category} onChange={handleChange} />
            <InputField id="stock" label="Stock" type="number" placeholder="Enter stock" required value={formData.stock} onChange={handleChange} />
          </div>

          <InputField id="address" label="Address" placeholder="Enter address" required value={formData.address} onChange={handleChange} className="mt-4" />
          <InputField id="mapping_location" label="Mapping Location" placeholder="Enter mapping location" required value={formData.mapping_location} onChange={handleChange} className="mt-4" />
        </Card>

        <Card className="p-4 border">
          <h2 className="text-lg font-semibold border-b pb-2">Description</h2>
          <InputField id="description" type="textarea" label="Description" placeholder="Enter a detailed description..." required value={formData.description} onChange={handleChange} className="mt-4 h-32" />
        </Card>

        <Card className="p-4 border">
          <h2 className="text-lg font-semibold border-b pb-2">Upload Files</h2>

          <Input id="image_of_land" name="image_of_land" type="file" accept="image/*" required className="mt-2" onChange={handleImageChange} />
          {imagePreview ? (
            <div className="relative mt-4">
              <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg border" />
              <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-40 mt-4 border border-dashed rounded-lg">
              <Image className="w-10 h-10 text-gray-400" />
              <p className="text-gray-500 text-sm ml-2">Image preview will appear here</p>
            </div>
          )}

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
            {documentError && <p className="text-red-500 text-sm mt-1">{documentError}</p>}
          </div>
        </Card>
      </div>

      <Button type="submit" className="mt-6 w-full">
        Submit Ad
      </Button>
    </form>
  );
}
