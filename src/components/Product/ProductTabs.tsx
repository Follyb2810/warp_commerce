import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DescriptionTab from "./DescriptionTab";
import ReviewsTab from "./ReviewsTab";


export default function ProductTabs() {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="border-b w-full flex">
        <TabsTrigger value="description" className="px-4 pb-2">Description</TabsTrigger>
        <TabsTrigger value="reviews" className="px-4 pb-2">Reviews (2)</TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <DescriptionTab />
      </TabsContent>
      <TabsContent value="reviews">
        <ReviewsTab />
      </TabsContent>
    </Tabs>
  );
}
