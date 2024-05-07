import { motion } from "framer-motion";
import BasePayFilter from "./Filters/BasePayFilter";
import EmployeesFilter from "./Filters/EmployeesFilter";
import ExperienceFilter from "./Filters/ExperienceFilter";
import RoleFilter from "./Filters/RoleFilter";
import SearchFilter from "./Filters/SearchFilter";
import WorkTypeFilter from "./Filters/WorkTypeFilter";

const FilterContainer = (): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex gap-5 flex-wrap max-sm:gap-2"
    >
      <RoleFilter />
      <EmployeesFilter />
      <ExperienceFilter />
      <WorkTypeFilter />
      <BasePayFilter />
      <SearchFilter />
    </motion.div>
  );
};

export default FilterContainer;
