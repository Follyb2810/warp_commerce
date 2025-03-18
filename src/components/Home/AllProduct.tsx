// import { propertiesData } from '@/CONSTANT/data'
// import { useEffect } from 'react';
import ApiStatusMessage from '../shared/ApiStatusMessage'
import PropertyCard, { PropertyCardProps } from '../shared/PropertyCard'
import { useAllProductQuery } from '@/api/prodService'
// import { getLocation } from '@/utils/getLocation';

export default function AllProduct() {
  const { isLoading, data, error } = useAllProductQuery({});
  
//   :51.51381330519996

// Lng:-0.09054358532943897
  // useEffect(()=>{
  //   console.log(getLocation('51.51381330519996','-0.09054358532943897'))
  // },[])
  return (
    <div className="md:col-span-3">

      <ApiStatusMessage
        isLoading={isLoading}
        error={error}
        loadingText="Loading products..."
        errorText="Failed to load products. Please try again."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data?.products?.length > 0 ? (
          data?.data.products.slice(0, 6).map((property: PropertyCardProps, index: number) => (
            <PropertyCard key={index} {...property}  isAddToCart />
          ))
        ) : (
          !isLoading && !error && (
            <p className="text-center col-span-3 text-gray-500">No products available.</p>
          )
        )}
      </div>
    </div>
  );
}
