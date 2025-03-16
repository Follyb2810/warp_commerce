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
    { label: "All Pending Order", value: "Pending Order", content: <OrderStatusTab  /> },
    { label: "All Order History", value: "History of Order", content: <HistoryTab  /> },
  ];

  return (
    <div className="container mx-auto  py-10 w-full">
      <h1 className="text-2xl font-bold mb-6">Buyer Account</h1>

      {/* <ApiStatusMessage isLoading={isLoading} error={error} /> */}

      <div className="flex flex-col md:flex-row gap-6 w-full">
        <ProfileSection />
        <AppTabs tabs={tabsData} defaultValue={tabsData[0]?.value} />
        {/* {!isLoading && !error && <AppTabs tabs={tabsData} defaultValue={tabsData[0]?.value} />} */}
      </div>
    </div>
  );
}

