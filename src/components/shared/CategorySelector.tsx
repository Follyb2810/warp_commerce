import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetCategoryQuery } from "@/api/prodService";
import { ICategory } from "@/@types/types";

const CategorySelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data } = useGetCategoryQuery({});

  const categories = useMemo(() =>
      data?.data?.map((item: { _id: string; name: string }) => ({
        _id: item._id,
        name: item.name,
      })) || [],
    [data]
  );

  return (
    <div className="relative flex flex-col items-start gap-2">
      <div className="flex items-center gap-2 border rounded-lg p-2">
        <Button size="icon">
          <Menu className="w-5 h-5" />
        </Button>

        <Button
          className="flex items-center gap-2 text-white"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          All Categories
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </Button>
      {selectedCategory && (
        <div className="text-sm text-gray-400 mt-1">
          <span className="font-medium bg-gray-200 p-2 rounded-lg">
            {selectedCategory}
          </span>
        </div>
      )}
      </div>


      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={cn(
              "absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 border border-gray-200",
              isOpen && "overflow-hidden"
            )}
          >
            <ul className="py-2" onMouseLeave={() => setIsOpen(false)}>
              {categories.map((category: ICategory) => (
                <li
                  key={category._id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors text-gray-700"
                  onClick={() => {
                    setSelectedCategory(category.name!);
                    console.log("Selected Category ID:", category._id);
                    setIsOpen(false);
                  }}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategorySelector;
