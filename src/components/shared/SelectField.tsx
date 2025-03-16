
import { Label } from "../ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "../ui/select";

interface SelectFieldProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  onChange: (value: string) => void;
  defaultValue?: string;
}

export default function SelectField({ options, placeholder = "Select an option", onChange, defaultValue }: SelectFieldProps) {
  return (
    <section>
     <Label htmlFor="terms" className="text-gray-800 dark:text-gray-200 text-lg block mb-2">
             Category <span className="text-red-500 font-black ml-[2px]">*</span>
     </Label>
    <Select onValueChange={onChange} defaultValue={defaultValue} >
      <SelectTrigger className="w-full bg-[#F9F9F9] dark:bg-gray-800 text-black dark:text-white py-6 pr-10">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    </section>
  );
}
