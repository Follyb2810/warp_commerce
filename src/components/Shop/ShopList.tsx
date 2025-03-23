import { useState } from "react";
import ApiStatusMessage from "../shared/ApiStatusMessage";
import ShopCard, { ShopCardProps } from "./ShopCard";
import { useAllProductQuery } from "@/api/prodService";
import ShopPagination, { IShopPaginate } from "./ShopPagination";
import { IProduct } from "@/@types/types";

export type IShopList = {
  products: IProduct[];
  pagination: IShopPaginate;
};

export default function ShopList() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { isLoading, data, error } = useAllProductQuery({ page, limit });

  const shopPaginate = data?.data?.pagination as IShopList["pagination"];
  const shopData = data?.data?.products as IShopList["products"];

  console.log(shopPaginate);
  console.log(shopData);

  return (
    <section className="md:col-span-3">
      <ApiStatusMessage
        isLoading={isLoading}
        error={error}
        loadingText="Loading products..."
        errorText="Failed to load products. Please try again."
      />

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 p-6">
        {shopData?.length > 0 ? (
          shopData.map((product: IProduct, index: number) => (
            <ShopCard key={index} {...(product as ShopCardProps)} />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No products available.
          </p>
        )}
      </div>

      {shopPaginate && (
        <ShopPagination
          page={page}
          limit={limit}
          totalPages={shopPaginate.totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}
