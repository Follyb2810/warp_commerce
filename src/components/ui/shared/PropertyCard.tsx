// src/components/PropertyCard.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PropertyCardProps {
  imageUrl: string;
  title: string;
  price: string;
  location: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ imageUrl, title, price, location }) => {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{location}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={imageUrl} alt={title} className="rounded-md w-full h-48 object-cover mb-2" />
        <p className="text-green-500 font-semibold">{price}</p>
      </CardContent>
      <CardFooter>
        {/* Add any footer content here, like a "View Details" button */}
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
