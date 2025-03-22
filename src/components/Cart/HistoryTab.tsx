import { ICartResponseData } from '@/@types/types';
import { Card, CardContent } from '../ui/card';
import { IUserOrderHistory } from '@/@types/types';
import { useAllUserOrderQuery } from '@/api/orderService';
import HistoryCard from './HistoryCard';

export interface CartProps {
  cart?: ICartResponseData;
}



export default function HistoryTab() {
  const { data, error } = useAllUserOrderQuery('release',{});

  console.log(error);

  return (
    <div className="w-full mx-auto py-4">
      <Card>
        <CardContent>
          {data?.data?.length > 0 ? (
            <div className="space-y-4">
              {data.data.map((purchase:IUserOrderHistory,index:number) => (
               <HistoryCard purchase={purchase} key={index}/>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No purchase history available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * import React, { useEffect, useState } from "react";

interface Purchase {
  _id: string;
  payment: {
    amount: number;
    txHash: string;
  };
  items: {
    product: {
      _id: string;
      price: number;
      stock: number;
      image_of_land: string;
    };
    quantity: number;
    price: number;
    _id: string;
  }[];
  status: string;
  totalAmount: number;
  createdAt: string;
}

const PurchaseHistory: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch("/api/purchase-history"); // Replace with your actual API endpoint
        const data = await response.json();
        if (data.success) {
          setPurchases(data.data);
        }
      } catch (error) {
        console.error("Error fetching purchase history:", error);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Purchase History</h2>
      {purchases.length === 0 ? (
        <p>No purchase history available.</p>
      ) : (
        <div className="grid gap-4">
          {purchases.map((purchase) => (
            <div key={purchase._id} className="border p-4 rounded-lg shadow-lg">
              <p className="text-gray-700">
                <strong>Transaction Hash:</strong> {purchase.payment.txHash}
              </p>
              <p className="text-gray-700">
                <strong>Amount:</strong> {purchase.payment.amount} ETH
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong> {purchase.status}
              </p>
              <p className="text-gray-700">
                <strong>Date:</strong> {new Date(purchase.createdAt).toLocaleString()}
              </p>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {purchase.items.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 border p-2 rounded">
                    <img
                      src={item.product.image_of_land}
                      alt="Product"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold">Price: {item.price} ETH</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Stock: {item.product.stock}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;

 * 
 */

/**
 * 
 * <div
                key={`${purchase._id}-${index}`}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={purchase.item.image_of_land}
                  alt={purchase.item.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{purchase.item.title}</h3>
                  <p className="text-sm text-gray-600">
                    {purchase.item.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Paid: ${purchase.paid}
                  </p>
                  <p className="text-sm text-gray-500">
                    Transaction Hash: {purchase.transactionHash}
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <a
                    href={purchase.item.document_of_land}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm underline"
                  >
                    View Document
                  </a>
                </div>
              </div>
 * 
 */