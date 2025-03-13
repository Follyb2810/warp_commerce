interface FeatureItem {
    icon: string;
    text: string;
  }
  
  const features: FeatureItem[] = [
    { icon: "🛒", text: "Everyday fresh products" },
    { icon: "🚚", text: "Free delivery for order over $70" },
    { icon: "💰", text: "Daily Mega Discounts" },
    { icon: "🏆", text: "Best price on the market" },
  ];
  
  export default function FeatureList() {
    return (
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto flex flex-wrap justify-center gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-700">
              <span className="text-xl">{feature.icon}</span>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  