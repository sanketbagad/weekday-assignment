import BasePayFilter from "./Filters/BasePayFilter";
import EmployeesFilter from "./Filters/EmployeesFilter";
import ExperienceFilter from "./Filters/ExperienceFilter";
import RoleFilter from "./Filters/RoleFilter";
import SearchFilter from "./Filters/SearchFilter";
import WorkTypeFilter from "./Filters/WorkTypeFilter";

const FilterContainer = (): JSX.Element => {
  return (
    <div className=" flex gap-5 flex-wrap max-sm:gap-2">
      <RoleFilter />
      <EmployeesFilter />
      <ExperienceFilter />
      <WorkTypeFilter />
      <BasePayFilter />
      <SearchFilter />
    </div>
  );
};

export default FilterContainer;
