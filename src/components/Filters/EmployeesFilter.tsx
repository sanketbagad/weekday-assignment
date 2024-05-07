import { useState } from "react";
import { EmployeeOption, employees } from "../../lib/constants";
import GenericSelect from "../shared/GenericSelect";
import { useDispatch } from "react-redux";
import { setSelectedEmployees } from "../../redux/slices/filterSlice";


const EmployeesFilter = (): JSX.Element => {
  const dispatch = useDispatch();
  const [selectedEmployeeOptions, setSelectedEmployeeOptions] = useState<
    EmployeeOption[]
  >([]);

  const handleChange = (value: EmployeeOption[]) => {
    setSelectedEmployeeOptions(value);
    dispatch(setSelectedEmployees(value));
  };

  return (
    <GenericSelect
      options={employees}
      placeholder="Number of Employees"
      value={selectedEmployeeOptions}
      onChange={handleChange}
      optionClassName="h-fit overflow-hidden"
    />
  );
};

export default EmployeesFilter;
