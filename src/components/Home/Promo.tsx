import PromoBanner from '../shared/PromoBanner'
import { PromaBannerData } from '@/CONSTANT/data'

export default function Promo() {
  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-6 my-8">
    {
        PromaBannerData.map((data,index)=>(
            <PromoBanner {...data} key={index}/>
            
        ))
    }
      
      </div>
  )
}
