
import ProductCart from '@/components/Cart/ProductCart'
import BackButton from '@/components/shared/BackButton'
import { CartData } from '@/CONSTANT/data'
import { useParams } from 'react-router-dom'

export default function Cart() {
    const {productId} = useParams()
  return (
    <div>
      <BackButton/>
     <p>
        Cart {productId}
      </p>
      <ProductCart
        image={CartData[0].image}
        inStock
        price={CartData[0].price}
        title={CartData[0].title}
        discount={CartData[0].discount}
        discountPrice={CartData[0].discountPrice}
        // key={}
        
       />
    </div>
  )
}


