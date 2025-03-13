import ProductDetail from '@/components/Product/ProductDetail'
import BackButton from '@/components/shared/BackButton'
import { useParams } from 'react-router-dom'


export default function Product() {
    const {productId} = useParams()
  return (
   <section>
         <BackButton/>
   <p>{productId}</p>
   <ProductDetail productId={productId!}/>
   </section>
  )
}
