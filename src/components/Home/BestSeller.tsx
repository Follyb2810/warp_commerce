import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import { propertiesData } from "@/CONSTANT/data"
import PropertyCard, { PropertyCardProps } from "../shared/PropertyCard";
import { useAllProductQuery } from "@/api/prodService";

export function BestSeller() {
  const { isLoading, data, error } = useAllProductQuery({});

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Failed to load products. Please try again.
      </p>
    );
  }
  return (
    <section className="w-full container mx-auto overflow-x-hidden relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {data?.data?.products?.length > 0 ? (
            data?.data.products
              .slice(0, 6)
              .map((property: PropertyCardProps, index: number) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <PropertyCard key={index} {...property} isAddToCart />
                </CarouselItem>
              ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No products available.
            </p>
          )}
        </CarouselContent>

        <CarouselPrevious className="absolute left-0 z-10" />
        <CarouselNext className="absolute right-0 z-10" />
      </Carousel>
    </section>
  );
}
