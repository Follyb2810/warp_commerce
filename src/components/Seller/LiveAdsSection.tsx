import {  useSellerProductQuery } from "@/api/prodService";
import { Card, CardContent } from "../ui/card";
import AdCard, { IAddCardProps } from "./AdCard";



const LiveAdsSection = () =>{
  const {data,error} = useSellerProductQuery({})
 
  
  
  console.log(data?.data?.products)
  console.log(data?.data)
  console.log(error)
  return(
    <Card className="w-full">
      <CardContent className="space-y-4">
        {data?.data?.products.map((data:IAddCardProps,index:number) => (
          <AdCard key={index} {...data} />
        ))}
      </CardContent>
    </Card>
  );
}
export default LiveAdsSection

  