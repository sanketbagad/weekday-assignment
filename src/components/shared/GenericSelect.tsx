/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { cn } from "../../lib/utils";

export interface GenericOption {
  id: string;
  name: string;
  [key: string]: any;
}

interface GenericSelectProps {
  options: GenericOption[];
  placeholder: string;
  value: GenericOption[];
  onChange: (value: GenericOption[]) => void;
  optionClassName?: string;
  selectClassName?: string;
}

const GenericSelect: React.FC<GenericSelectProps> = ({
  options,
  placeholder,
  value,
  onChange,
  optionClassName,
  selectClassName,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option: GenericOption) => {
    if (value.some((item) => item.id === option.id)) {
      onChange(value.filter((item) => item.id !== option.id));
    } else {
      onChange([...value, option]);
    }
    setOpen(false);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div
      className={cn(
        "min-w-40 max-w-fit border min-h-10 rounded px-2 py-2 text-xs flex items-center h-fit justify-between relative transition-all duration-300 ease-in-out cursor-pointer",
        selectClassName
      )}
      onClick={handleOpen}
    >
      {value.length === 0 && (
        <span className="text-gray-400">{placeholder}</span>
      )}
      {value.length > 0 && (
        <div className=" absolute -top-4 left-0 text-[10px] font-semibold">
          {placeholder}
        </div>
      )}

      <div className="flex gap-1 text-[9px] flex-wrap">
        {value.map((option) => (
          <div
            key={option.id}
            className="bg-slate-200 text-black w-fit rounded-sm flex items-center justify-between gap-1 font-light pl-1"
          >
            {option.name}
            <RxCross2
              className="text-black cursor-pointer h-full w-4 p-0.5 hover:bg-red-300"
              onClick={(e) => {
                e.stopPropagation();
                handleOptionSelect(option);
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 ml-3 h-full">
        {value.length > 0 && (
          <RxCross2
            className="text-gray-400 size-4 cursor-pointer hover:text-black"
            onClick={(e) => {
              e.stopPropagation();
              handleClearAll();
            }}
          />
        )}
        <div className=" h-5 border-l-[1px] "></div>
        <IoIosArrowDown
          className={cn(
            "text-gray-400 size-4 transition-all duration-300 ease-in-out",
            open && "rotate-180"
          )}
        />
      </div>

      {/* Options */}
      {open && (
        <div
          className={cn(
            "absolute w-full h-60 overflow-y-scroll top-full left-0 z-50 bg-white border px-1",
            optionClassName
          )}
          ref={ref}
        >
          {options.map((option) => (
            <p
              key={option.id}
              className="text-black w-full px-2 py-1 rounded-sm hover:bg-slate-200"
              onClick={() => handleOptionSelect(option)}
            >
              {value.includes(option) ? null : option.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenericSelect;
