import { dealsData } from "@/CONSTANT/data";
import DealsOfTheWeek from "../shared/DealsOfTheWeek";
import AllProduct from "./AllProduct";

export default function Deal() {
  
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <DealsOfTheWeek {...dealsData} />
      </div>
      <AllProduct/>
    </div>
  )
}
