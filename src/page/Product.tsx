import ProductDetail from '@/components/Product/ProductDetail'
import { useParams } from 'react-router-dom'


export default function Product() {
    const {productId} = useParams()
  return (
   <>
   <p>{productId}</p>
   <ProductDetail/>
   </>
  )
}
