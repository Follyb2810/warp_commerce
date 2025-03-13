// import { propertiesData } from '@/CONSTANT/data'
import PropertyCard, { PropertyCardProps } from '../shared/PropertyCard'
import { useAllProductQuery } from '@/api/prodService'

export default function AllProduct() {
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
    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {data?.products?.length > 0 ? (
      data.products.slice(0,6).map((property: PropertyCardProps, index: number) => (
        <PropertyCard key={index} {...property} />
      ))
    ) : (
      <p className="text-center col-span-3 text-gray-500">No products available.</p>
    )}
  </div>
  )
}
