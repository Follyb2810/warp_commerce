import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";
// import { productDetailsData } from "@/CONSTANT/data";
import ProductTabs from "./ProductTabs";
import { useSingleProductQuery } from "@/api/prodService";
import ApiStatusMessage from "../shared/ApiStatusMessage";

export default function ProductDetail({
  productId,
}: {
  productId: string | null;
}) {
  const { isLoading, data, error } = useSingleProductQuery(productId, {
    skip: !productId,
  });

  console.log(productId, "productId");
  console.log(data?.data?.product);

  const pImage = data?.data?.product?.image_of_land;
  const image = [pImage, pImage];

  return (
    <section className="md:col-span-3">
      <ApiStatusMessage
        isLoading={isLoading}
        error={error}
        loadingText="Loading products..."
        errorText="Failed to load products. Please try again."
      />
      <div className="container mx-auto p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
        {data?.data?.product && <ProductImage image_of_land={image} />}
        <div>
          {data?.data?.product && <ProductInfo {...data?.data?.product} />}

          <ProductActions />
          <ProductTabs />
        </div>
      </div>
    </section>
  );
}

// let a = "a";
// let arr = Array(2).fill(a); // ['a', 'a']
//let a = "a";
// let arr = [a, a]; // ['a', 'a']
//let a = "a";
//let arr = new Array(2).fill(a); // ['a', 'a']
