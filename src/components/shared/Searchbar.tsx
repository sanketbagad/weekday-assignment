import { cn } from "../../lib/utils";

interface SearchbarProps {
  placeholder: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
}


const Searchbar = ({
  placeholder,
  onChange,
  value,
  className,
}: SearchbarProps): JSX.Element => {
  return (
    <div className=" relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className={cn(
          "min-w-40 max-w-fit border min-h-10 rounded px-2 py-2 text-xs flex items-center h-fit justify-between relative transition-all duration-300 ease-in-out cursor-text outline-none",
          className
        )}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <p className="absolute  bottom-full left-0 text-[10px] font-semibold">
          {placeholder}
        </p>
      )}
    </div>
  );
};

export default Searchbar;
