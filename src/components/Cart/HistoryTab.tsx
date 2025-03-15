import { CartItem, ICartResponseData } from '@/@types/types'
import { Card, CardContent } from '../ui/card'
import AppButton from '../shared/AppButton';
import { useAllOrderQuery, useAllUserOrderQuery, useOrderHistoryQuery, useUserOrderQuery } from '@/api/orderService';

export interface CartProps {
  cart?: ICartResponseData;
}

export default function HistoryTab() {
    
    const {data,error} = useOrderHistoryQuery({})
    const {data:d,error:e} = useUserOrderQuery({})
    const {data:a,error:b} = useAllOrderQuery({})
    const {data:al,error:u} = useAllUserOrderQuery({})
    console.log(al,'al')
    console.log(u,'u')
    console.log(a,'a')
    console.log(b,'b')
    console.log(d,'d')
    console.log(e,'e')
    console.log(data)
    console.log(error)
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
    <Card>
      <CardContent>
        {data?.data?.length > 0 ? (
          <div className="space-y-4">
            {data?.data?.map((purchase, index) => (
              <div
                key={`${purchase._id}-${index}`}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={purchase.item.image_of_land}
                  alt={purchase.item.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{purchase.item.title}</h3>
                  <p className="text-sm text-gray-600">
                    {purchase.item.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Paid: ${purchase.paid}
                  </p>
                  <p className="text-sm text-gray-500">
                    Transaction Hash: {purchase.transactionHash}
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <a
                    href={purchase.item.document_of_land}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm underline"
                  >
                    View Document
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No purchase history available.
          </p>
        )}
      </CardContent>
    </Card>
  </div>
  )
}
