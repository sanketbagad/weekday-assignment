import { useState } from "react";
import SingleSelect, { GenericOption } from "../shared/SingleSelect";
import { basePays } from "../../lib/constants";
import { useDispatch } from "react-redux";
import { setSelectedBasePays } from "../../redux/slices/filterSlice";


const BasePayFilter = (): JSX.Element => {
  const dispatch = useDispatch();
  const [selectBasePay, setSelectBasePay] = useState<GenericOption>();
  const handleChange = (value: GenericOption) => {
    setSelectBasePay(value);
    dispatch(setSelectedBasePays(value ? [value as GenericOption] : []));
  };

  return (
    <SingleSelect
      options={basePays}
      placeholder="Min Base Pay"
      value={selectBasePay || null}
      onChange={handleChange as (value: GenericOption | null) => void}
      isSingle={true}
      optionClassName="h-fit overflow-hidden"
    />
  );
};

export default BasePayFilter;
