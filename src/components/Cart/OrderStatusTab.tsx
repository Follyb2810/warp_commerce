import { useAllUserOrderQuery } from '@/api/orderService'
import OrderCard from './OrderCard'

export default function OrderStatusTab() {
        const {data,error} = useAllUserOrderQuery({})
        console.log(error)
        console.log(data,'from order staus tab')
        console.log(data?.data,'from order staus tab')
  return (
    <div className="w-full max-w-3xl mx-auto p-4">

            
            <OrderCard order={data?.data}/>
      <h1>hello</h1>
        
    </div>
  )
}
