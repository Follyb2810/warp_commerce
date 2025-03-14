import { Button } from "../ui/button";

const AdCard = ({ ad }: { ad: { id: number; title: string; published: string; image: string } }) => (
    <div className="flex items-center gap-4">
      <img src={ad.image} alt={ad.title} className="w-16 h-16 rounded-lg object-cover" />
      <div className="flex-1">
        <h3 className="font-medium">{ad.title}</h3>
        <p className="text-sm text-gray-500">📅 Published {ad.published}</p>
      </div>
      <Button variant="outline" size="sm">View Details</Button>
    </div>
  );
export default AdCard