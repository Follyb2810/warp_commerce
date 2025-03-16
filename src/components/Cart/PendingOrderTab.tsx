import { useAllUserOrderQuery } from '@/api/orderService'
import { Card, CardContent } from '../ui/card'
import HistoryCard from './HistoryCard'
import { IUserOrderHistory } from '@/@types/types';

export default function PendingOrderTab() {
  const status = "pending";
  const { data } = useAllUserOrderQuery(status);
  
  return (
<div className="w-full mx-auto py-4">
      <Card>
        <CardContent>
          {data?.data?.length > 0 ? (
            <div className="space-y-4">
              {data.data.map((purchase:IUserOrderHistory,index:number) => (
               <HistoryCard purchase={purchase} showActions key={index}/>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No purchase history available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
