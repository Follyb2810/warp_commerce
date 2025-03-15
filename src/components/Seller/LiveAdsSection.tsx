import { Card, CardContent } from "../ui/card";
import AdCard from "./AdCard";

const LiveAdsSection = () => (
    <Card className="w-full">
      <h2 className="text-lg font-bold mb-4">My Live Ads</h2>
      <CardContent className="space-y-4">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </CardContent>
    </Card>
  );
export default LiveAdsSection
const ads = [
    { id: 1, title: "Mansion in South Lekki", published: "04-Dec-2023", image: "/ads/mansion.jpg" },
    { id: 2, title: "Selling modern apartment, built 2020", published: "04-Dec-2023", image: "/ads/apartment.jpg" },
    { id: 3, title: "New York Downtown Condo", published: "04-Dec-2023", image: "/ads/condo.jpg" },
  ];
  