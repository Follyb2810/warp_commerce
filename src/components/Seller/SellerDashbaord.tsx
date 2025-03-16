import AppTabs from "../shared/AppTabs";
import ProfileSection from "../shared/ProfileSection";
// import AdCard from "./AdCard";
import LiveAdsSection from "./LiveAdsSection";
import PostAdForm from "./PostAdForm";

export default function SellerDashbaord() {
  
  const tabsData = [
      { label: "Active Ads", value: "LiveAds", content: <LiveAdsSection /> },
      { label: "Post Ads", value: "PostAdForm", content: <PostAdForm /> },
    
    ];
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Seller Account</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <ProfileSection />
        <AppTabs tabs={tabsData} defaultValue={tabsData[0]?.value} />
        
      </div>
    </div>
  );
}
