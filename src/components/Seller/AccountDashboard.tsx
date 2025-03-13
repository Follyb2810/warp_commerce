import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clipboard } from "lucide-react";
import { RootState, useAppSelector } from "@/store";
import { maskAddress } from "@/utils/maskAddress";

const ads = [
  {
    id: 1,
    title: "Mansion in South Lekki",
    published: "04-Dec-2023",
    image: "/ads/mansion.jpg",
  },
  {
    id: 2,
    title: "Selling modern apartment, built 2020",
    published: "04-Dec-2023",
    image: "/ads/apartment.jpg",
  },
  {
    id: 3,
    title: "New York Downtown Condo",
    published: "04-Dec-2023",
    image: "/ads/condo.jpg",
  },
];

export default function AccountDashboard() {
    const {  user } = useAppSelector((state: RootState) => state.auth);
    
    const addressMasked = maskAddress(user?.walletAddress || "0x0000000000000000000000000000000000000000");


  const copyToClipboard = () => {
    navigator.clipboard.writeText(addressMasked);
    alert("Copied to clipboard!");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Section */}
        <Card className="w-full md:w-1/3 p-6">
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/avatar.jpg" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-bold mt-4">John Doe</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-500">{addressMasked}</span>
              <Clipboard
                size={16}
                className="cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={copyToClipboard}
              />
            </div>
            <div className="mt-4 flex gap-3">
              <Button variant="outline">View Profile</Button>
              <Button>Edit Profile</Button>
            </div>
          </div>
        </Card>

        {/* My Live Ads Section */}
        <Card className="w-full md:w-2/3 p-6">
          <h2 className="text-lg font-bold mb-4">My Live Ads</h2>
          <CardContent className="space-y-4">
            {ads.map((ad) => (
              <div key={ad.id} className="flex items-center gap-4">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{ad.title}</h3>
                  <p className="text-sm text-gray-500">📅 Published {ad.published}</p>
                </div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
