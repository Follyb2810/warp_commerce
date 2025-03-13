import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Ad = {
  id: number;
  title: string;
  image: string;
  publishedDate: string;
  views: number;
  likes: number;
  price: string;
};

const adsData: Ad[] = [
  {
    id: 1,
    title: "Mansion in South Lekki",
    image: "/ad.jpg", // Replace with actual image path
    publishedDate: "04-Dec-2023",
    views: 98,
    likes: 1,
    price: "$2,300,000",
  },
  { id: 2, title: "Mansion in South Lekki", image: "/ad.jpg", publishedDate: "04-Dec-2023", views: 98, likes: 1, price: "$2,300,000" },
  { id: 3, title: "Mansion in South Lekki", image: "/ad.jpg", publishedDate: "04-Dec-2023", views: 98, likes: 1, price: "$2,300,000" },
  { id: 4, title: "Mansion in South Lekki", image: "/ad.jpg", publishedDate: "04-Dec-2023", views: 98, likes: 1, price: "$2,300,000" },
];

export default function MyPostedAds() {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">My Posted Ads</h2>

      {/* Tabs Navigation */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="border-b flex space-x-6 pb-2">
          <TabsTrigger 
            value="active" 
            onClick={() => setActiveTab("active")}
            className={`relative ${activeTab === "active" ? "font-semibold border-b-2 border-black" : "text-gray-500"}`}
          >
            Active Ads <Badge className="ml-1 bg-black text-white">5</Badge>
          </TabsTrigger>

          <TabsTrigger 
            value="expired" 
            onClick={() => setActiveTab("expired")}
            className={`relative ${activeTab === "expired" ? "font-semibold border-b-2 border-black" : "text-gray-500"}`}
          >
            Expired Ads
          </TabsTrigger>

          <TabsTrigger 
            value="unpublished" 
            onClick={() => setActiveTab("unpublished")}
            className={`relative ${activeTab === "unpublished" ? "font-semibold border-b-2 border-black" : "text-gray-500"}`}
          >
            Unpublished Ads <Badge className="ml-1 bg-red-500 text-white">4</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Active Ads Tab Content */}
        <TabsContent value="active" className="pt-4">
          {adsData.map((ad) => (
            <Card key={ad.id} className="mb-4 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={ad.image} alt={ad.title} className="w-20 h-20 rounded-md object-cover" />
                <div>
                  <h3 className="text-lg font-semibold">{ad.title}</h3>
                  <p className="text-sm text-gray-500">📅 Published: {ad.publishedDate}</p>
                  <p className="text-sm text-gray-500">👁 Views: {ad.views} ❤️ Liked: {ad.likes}</p>
                  <div className="flex space-x-2 mt-2">
                    <Button variant="outline">Delete Listing</Button>
                    <Button variant="outline">Edit Listing</Button>
                    <Button variant="default">Messages</Button>
                  </div>
                </div>
              </div>
              <div className="text-lg font-semibold">{ad.price}</div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-4">
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
      </div>
    </div>
  );
}
