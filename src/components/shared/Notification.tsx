import { Bell, MessageCircle, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const NotiData = [
  {
    icon: (className: string) => <ShoppingCart className={className} />,
    count: 3,
  },
  
  {
    icon: (className: string) => <Bell className={className} />,
    count: 0,
  },
  {
    icon: (className: string) => <MessageCircle className={className} />,
    count: 5,
  },
];

export default function Notification() {
  return (
    <section className="flex gap-3">
      {NotiData.map((item, index) => (
        <ButtonWithIcon
          key={index}
          icon={item.icon}
          count={item.count}
          onPress={() => console.log("Clicked")}
        />
      ))}
    </section>
  );
}

interface IButtonWithIcon<T = void> {
  icon: (className: string) => React.ReactNode;
  count?: number;
  onPress:() => T;
  // onPress(): void;
}

export function ButtonWithIcon({ icon, count, onPress }: IButtonWithIcon) {
  return (
    <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={`relative flex items-center justify-center p-2 transition-all duration-300 
      ${count && count > 0 ? "border border-red-500 bg-red-100 hover:bg-red-200 rounded-full" : "bg-transaparent rounded-full  hover:bg-gray-200"}`}
    onClick={onPress}
  >
  
      {icon(count && count > 0 ? "text-red-500" : "text-gray-600")}
      {count && count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold"
        >
          {count}
        </motion.span>
      )}
    </motion.button>
  );
}
