export default function ShopSorting() {
    return (
      <div className="flex justify-end p-4">
        <label className="text-gray-700 mr-2">Sort by:</label>
        <select className="border p-2 rounded text-sm">
          <option>Alphabetically, A-Z</option>
          <option>Price, Low to High</option>
          <option>Price, High to Low</option>
        </select>
      </div>
    );
  }