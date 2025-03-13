const propertyTypes = [
    "Lands", "Block of Flats", "Duplex", "Mini Flat",
    "Townhouse/Terrace", "Studio Apartment", "Shared Apartment",
    "Sky Scrapers", "Bed-sitter"
  ];
  
  const conditions = [
    { label: "Fairly Used", count: 8 },
    { label: "Newly Built", count: 36 },
    { label: "Renovated", count: 1 },
    { label: "Uncompleted", count: 16 },
  ];
  
  export default function ShopFilters() {
    return (
      <aside className="w-64 p-4 bg-white border-r">
        <h3 className="font-semibold mb-2">PROPERTY TYPE</h3>
        {propertyTypes.map((type) => (
          <label key={type} className="flex items-center space-x-2 text-gray-700">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>{type}</span>
          </label>
        ))}
  
        <h3 className="font-semibold mt-4 mb-2">CONDITION</h3>
        {conditions.map(({ label, count }) => (
          <label key={label} className="flex items-center space-x-2 text-gray-700">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>{label} ({count})</span>
          </label>
        ))}
  
        <h3 className="font-semibold mt-4 mb-2">PRICE</h3>
        <div className="flex space-x-2">
          <input type="number" placeholder="From" className="w-1/2 border p-2 text-sm" />
          <input type="number" placeholder="To" className="w-1/2 border p-2 text-sm" />
        </div>
  
        <h3 className="font-semibold mt-4 mb-2">AVAILABILITY</h3>
        <label className="flex items-center space-x-2 text-gray-700">
          <input type="checkbox" className="form-checkbox text-blue-500" />
          <span>In Stock (62)</span>
        </label>
        <label className="flex items-center space-x-2 text-gray-700">
          <input type="checkbox" className="form-checkbox text-blue-500" />
          <span>Out of Stock (0)</span>
        </label>
      </aside>
    );
  }
  