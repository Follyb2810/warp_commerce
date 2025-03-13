// import { propertiesData } from "@/CONSTANT/data";
import PropertyCard, { PropertyCardProps } from "../shared/PropertyCard";
import { useAllProductQuery } from "@/api/prodService";


export default function SuperDiscount() {
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
    <section className="container mx-auto my-5">
        <div className="bg-warp-300 rounded-2xl text-center p-4 font-bold text-2xl">Super discount for your first purchase</div>
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center py-7">
    {data?.products?.length > 0 ? (
      data.products.map((property: PropertyCardProps, index: number) => (
        <PropertyCard key={index} {...property} />
      ))
    ) : (
      <p className="text-center col-span-3 text-gray-500">No products available.</p>
    )}
    </div>
</section>
  )
}
