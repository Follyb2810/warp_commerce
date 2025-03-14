import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import AppButton from "./AppButton";

const tabs = [
  { label: "Buyer", path: "/shop" },
  { label: "Seller", path: "/seller" },
  // { label: "Admin", path: "/admin" },
];

export default function SwitchButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeIndex = tabs.findIndex((tab) => tab.path === location.pathname);

  return (
    <section className="relative flex p-1 rounded-lg w-64 bg-gray-200">

      <motion.div
        className="absolute inset-y-0 w-1/3 rounded-lg bg-blue-500"
        animate={{ left: `${(activeIndex / tabs.length) * 100}%` }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ width: `${100 / tabs.length}%` }}
      />
      {tabs.map((tab, index) => (
        <AppButton
          key={tab.path}
          label={tab.label}
          variant={activeIndex === index ? "default" : "secondary"}
          className={`w-1/${tabs.length} rounded-none relative z-10 text-center transition-all ${
            activeIndex === index ? "text-white" : "text-gray-600"
          }`}
          onClick={() => navigate(tab.path)}
        />
      ))}
    </section>
  );
}
