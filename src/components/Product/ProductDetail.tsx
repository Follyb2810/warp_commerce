import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";
// import { productDetailsData } from "@/CONSTANT/data";
// import ProductTabs from "./ProductTabs";
import { useSingleProductQuery } from "@/api/prodService";
import ApiStatusMessage from "../shared/ApiStatusMessage";
import AppTabs from "../shared/AppTabs";
import DescriptionTab from "./DescriptionTab";
import ReviewsTab from "./ReviewsTab";

export default function ProductDetail({
  productId,
}: {
  productId: string | null;
}) {
  const { isLoading, data, error } = useSingleProductQuery(productId, {
    skip: !productId,
  });
  
  console.log(data,'useSingleProductQuery')
  
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
          <AppTabs tabs={tabsData} defaultValue="description" />
        </div>
      </div>
    </section>
  );
}

const tabsData = [
  { label: "Description", value: "description", content: <DescriptionTab /> },
  { label: "Reviews (2)", value: "reviews", content: <ReviewsTab /> },
];

// let a = "a";
// let arr = Array(2).fill(a); // ['a', 'a']
//let a = "a";
// let arr = [a, a]; // ['a', 'a']
//let a = "a";
//let arr = new Array(2).fill(a); // ['a', 'a']
