import { useUserCartQuery } from '@/api/cartService';
import ReviewsTab from '../Product/ReviewsTab';
import AppTabs from '../shared/AppTabs';
import ProfileSection from '../shared/ProfileSection';
import BuyerCartTab from './BuyerCartTab';
import ApiStatusMessage from '../shared/ApiStatusMessage';

export default function BuyerDashboard() {
  const { isLoading, data, error } = useUserCartQuery({});

  const tabsData = [
    { label: "All User Cart", value: "User Cart", content: <BuyerCartTab cart={data?.data ?? []} /> },
    { label: "Reviews (2)", value: "reviews", content: <ReviewsTab /> },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Buyer Account</h1>
      
      <ApiStatusMessage isLoading={isLoading} error={error} />

      {!isLoading && !error && (
        <div className="flex flex-col md:flex-row gap-6">
          <ProfileSection />
          <AppTabs tabs={tabsData} defaultValue={tabsData[0]?.value} />
        </div>
      )}
    </div>
  );
}
