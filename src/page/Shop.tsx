import ShopBanner from "@/components/Shop/ShopBanner";
import ShopFilters from "@/components/Shop/ShopFilters";
import ShopList from "@/components/Shop/ShopList";
import ShopPagination from "@/components/Shop/ShopPagination";
import ShopSorting from "@/components/Shop/ShopSorting";

export default function Shop() {
  return (
    <div className="flex">
      <ShopFilters />
      <div className="flex-1">
        <ShopBanner />
        <ShopSorting />
        <ShopList />
        <ShopPagination/>
      </div>
    </div>
  )
}
