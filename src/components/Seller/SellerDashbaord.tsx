import ProfileSection from "../shared/ProfileSection";
import LiveAdsSection from "./LiveAdsSection";

export default function SellerDashbaord() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <ProfileSection />
        <LiveAdsSection />
      </div>
    </div>
  );
}
