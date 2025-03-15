import { useUserCartQuery } from '@/api/cartService';
import AppTabs from '../shared/AppTabs';
import ProfileSection from '../shared/ProfileSection';
import BuyerCartTab from './BuyerCartTab';
import HistoryTab from './HistoryTab';
import OrderStatusTab from './OrderStatusTab';
// import ApiStatusMessage from '../shared/ApiStatusMessage';

export default function BuyerDashboard() {
  const {  data } = useUserCartQuery({});

  const tabsData = [
    { label: "All User Cart", value: "User Cart", content: <BuyerCartTab cart={data?.data ?? { items: [] }} /> },
    { label: "All Order History", value: "reviews", content: <HistoryTab cart={data?.data ?? { items: [] }} /> },
    { label: "All Order ", value: "All Order", content: <OrderStatusTab  /> },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Buyer Account</h1>

      {/* <ApiStatusMessage isLoading={isLoading} error={error} /> */}

      <div className="flex flex-col md:flex-row gap-6">
        <ProfileSection />
        <AppTabs tabs={tabsData} defaultValue={tabsData[0]?.value} />
        {/* {!isLoading && !error && <AppTabs tabs={tabsData} defaultValue={tabsData[0]?.value} />} */}
      </div>
    </div>
  );
}

