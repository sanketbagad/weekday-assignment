import { useState } from "react";
import { workTypes } from "../../lib/constants";
import GenericSelect, { GenericOption } from "../shared/GenericSelect";
import { useDispatch } from "react-redux";
import { setSelectedWorkTypes } from "../../redux/slices/filterSlice";

const WorkTypeFilter = (): JSX.Element => {
  const dispatch = useDispatch();
  const [selectWorkType, setSelectWorkType] = useState<GenericOption[]>([]);
  const handleChange = (value: GenericOption[]) => {
    setSelectWorkType(value);
    dispatch(setSelectedWorkTypes(value));
  };
  return (
    <GenericSelect
      options={workTypes}
      placeholder="Remote"
      value={selectWorkType}
      onChange={handleChange}
      selectClassName=""
      optionClassName="h-fit overflow-hidden"
    />
  );
};

export default WorkTypeFilter;
