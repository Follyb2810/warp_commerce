// import { shopProptiesData } from "@/CONSTANT/data";
import ShopCard, { ShopCardProps } from "./ShopCard";
import { useAllProductQuery } from "@/api/prodService";
// import { PropertyCardProps } from "../shared/PropertyCard";

export default function ShopList() {
    const {isLoading,data,status,error} = useAllProductQuery({})
        console.log(data)
        console.log(status)
        console.log(isLoading)
        if (isLoading) {
          return <p className="text-center text-gray-500">Loading products...</p>;
        }
      
        if (error) {
          return <p className="text-center text-red-500">Failed to load products. Please try again.</p>;
        }
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {/* {shopProptiesData.map((property, index) => (
        <ShopCard key={index} {...property} />
      ))} */}
      {data?.products?.length > 0 ? (
            data.products.slice(0,6).map((property: ShopCardProps, index: number) => (
              <ShopCard key={index} {...property} />
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">No products available.</p>
          )}
    </div>
  );
}
