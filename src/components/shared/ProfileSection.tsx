import { Clipboard } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import { RootState, useAppSelector } from "@/store";
import { maskAddress } from "@/utils/maskAddress";

 const ProfileSection = () => {
    const { user } = useAppSelector((state: RootState) => state.auth);
    const addressMasked = maskAddress(user?.walletAddress || "0x0000000000000000000000000000000000000000");
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(user?.walletAddress || "0x0000000000000000000000000000000000000000");
      alert("Copied to clipboard!");
    };
  
    return (
      <Card className="w-full md:w-1/3 p-6 h-1/2">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/avatar.jpg" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-bold mt-4">John Doe</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-500">{addressMasked}</span>
            <Clipboard size={16} className="cursor-pointer text-gray-400 hover:text-gray-600" onClick={copyToClipboard} />
          </div>
          <div className="mt-4 flex gap-3">
            <Button variant="outline">View Profile</Button>
            <Button>Edit Profile</Button>
          </div>
        </div>
      </Card>
    );
  };
  
  export default ProfileSection