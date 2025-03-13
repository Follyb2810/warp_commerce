import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";
import { productDetailsData } from "@/CONSTANT/data";
import ProductTabs from "./ProductTabs";

export default function ProductDetail() {


  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
      <ProductImage images={productDetailsData.images} />
      <div>
        <ProductInfo {...productDetailsData} />
        <ProductActions />
        <ProductTabs/>
      </div>
    </div>
  );
}
