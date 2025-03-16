import { useAllUserOrderQuery } from '@/api/orderService'
import { Card, CardContent } from '../ui/card'
import { IPurchaseHistory } from './HistoryTab'
import HistoryCard from './HistoryCard'

export default function OrderStatusTab() {
        const {data,error} = useAllUserOrderQuery({})
        console.log(error)
        console.log(data,'from order staus tab')
        console.log(data?.data,'from order staus tab')
  return (
<div className="w-full mx-auto py-4">
      <Card>
        <CardContent>
          {data?.data?.length > 0 ? (
            <div className="space-y-4">
              {data.data.map((purchase:IPurchaseHistory) => (
               <HistoryCard purchase={purchase}/>
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
