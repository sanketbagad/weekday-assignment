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
  value: GenericOption | null;
  onChange: (value: GenericOption | null) => void;
  optionClassName?: string;
  selectClassName?: string;
  isSingle?: boolean; // New prop to control selection mode
}

const SingleSelect: React.FC<GenericSelectProps> = ({
  options,
  placeholder,
  value,
  onChange,
  optionClassName,
  selectClassName,
  isSingle = false, // Default to multi-select mode
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
    if (isSingle) {
      // Single select mode
      onChange(value?.id === option.id ? null : option);
      setOpen(false);
    } else {
      // Multi-select mode
      if (value && value.id === option.id) {
        onChange(null);
      } else {
        onChange(option);
      }
      setOpen(false);
    }
  };

  const handleClearAll = () => {
    onChange(null);
  };

  return (
    <div
      className={cn(
        "min-w-40 max-w-64 border min-h-10 rounded px-2 py-2 text-xs flex items-center h-fit justify-between relative transition-all duration-300 ease-in-out cursor-pointer",
        selectClassName
      )}
      onClick={handleOpen}
    >
      {!value && <span className="text-gray-400">{placeholder}</span>}
      {value && (
        <div className=" absolute -top-4 left-0 text-[10px] font-semibold">
          {placeholder}
        </div>
      )}
      <div className="flex gap-1 text-[9px] flex-wrap">
        {value && (
          <div
            key={value.id}
            className="bg-slate-200 text-black w-fit rounded-sm flex items-center justify-between gap-1 font-light pl-1"
          >
            {value.name}
            <RxCross2
              className="text-black cursor-pointer h-full w-4 p-0.5 hover:bg-red-300"
              onClick={(e) => {
                e.stopPropagation();
                handleOptionSelect(value);
              }}
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 ml-3">
        {value && (
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
              {option.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleSelect;
