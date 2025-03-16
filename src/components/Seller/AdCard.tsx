import { IApiResponse } from "@/@types/types";
import AppButton from "../shared/AppButton";
import { useDeleteProductMutation } from "@/api/prodService";

export type IAddCardProps = {
  title: string;
  image_of_land: string;
  price: number;
  stock?: number; // Made optional to handle undefined cases
  _id?: string;
};

const AdCard = ({ title, image_of_land, stock, _id, price }: IAddCardProps) => {
  const [deleteProduct, { isLoading: loadDelete }] = useDeleteProductMutation();

  const handleProductDelete = async (productId?: string) => {
    if (!productId) {
      console.error("Product ID is missing");
      return;
    }

    console.log(productId, "productId");
    try {
      const result: IApiResponse = await deleteProduct({ productId }).unwrap();
      console.log(result);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <section className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
      <img
        src={image_of_land}
        alt={title}
        className="w-24 h-24 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <h3 className="font-medium text-red-500">Price NTRN {price}</h3>
        <p className={`text-sm ${stock && stock > 0 ? "text-green-400" : "text-red-500"}`}>
          {stock && stock > 0 ? `Available stock: ${stock}` : "Out of Stock"}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <AppButton
          label="View Details"
          onClick={() => console.log(_id)}
          variant="outline"
          size="sm"
        />
        <AppButton
          label="Delete Product"
          onClick={() => handleProductDelete(_id)}
          variant="destructive"
          size="sm"
          isLoading={loadDelete}
        />
      </div>
    </section>
  );
};

export default AdCard;
