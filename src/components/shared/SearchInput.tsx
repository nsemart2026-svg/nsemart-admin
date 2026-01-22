import { SearchIcon } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({
  placeholder = "Search...",
  className = "",
  value,
  onChange,
}: SearchInputProps) => {
  return (
    <div className={`relative bg-white ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-md focus:outline-none"
        value={value}         
        onChange={onChange}   
      />

      <SearchIcon className="absolute left-3 top-2 text-gray-500 w-5 h-5 pointer-events-none" />
    </div>
  );
};

export default SearchInput;
