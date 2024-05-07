/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  BasePayOption,
  ExperienceOption,
  Role,
  WorkTypeOption,
} from "./constants";
import { Job } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * filterByRoles
 *
 * Filter jobs by roles
 * @param {Job[]} jbList - List of jobs
 * @param {Role[]} selectedRoles - Selected roles
 * @returns {Job[]} - Filtered list of jobs
 *
 * @example
 *
 * filterByRoles(jbList, selectedRoles)
 */

export const filterByRoles = (jbList: any[], selectedRoles: Role[]): Job[] => {
  if (selectedRoles.length === 0) return jbList;

  return jbList.filter((job) =>
    selectedRoles.some((role) => job.jobRole.includes(role.name.toLowerCase()))
  );
};

// Filter by employee count (multiple choice)
// export const filterByEmployees = (
//   jbList: Job[],
//   selectedEmployees: EmployeeOption[]
// ) => {
//   // if (selectedEmployees.length === 0) return jbList;
//   // const employeeRanges = selectedEmployees.map((employee) =>
//   //   employee.name.split("-")
//   // );
//   // return jbList.filter((job) => {
//   //   const { employeeCount } = job;
//   //   return employeeRanges.some(
//   //     ([min, max]) =>
//   //       employeeCount >= parseInt(min) && employeeCount <= parseInt(max)
//   //   );
//   // });
// };

/**
 * filterByExperience
 *
 * Filter jobs by experience
 * @param {Job[]} jbList - List of jobs
 * @param {ExperienceOption[]} selectedExperiences - Selected experience options
 * @returns {Job[]} - Filtered list of jobs
 *
 * @example
 *
 * filterByExperience(jbList, selectedExperiences)
 */
export const filterByExperience = (
  jbList: Job[],
  selectedExperiences: ExperienceOption[]
): Job[] => {
  if (selectedExperiences.length === 0) return jbList;

  const experienceValues = selectedExperiences[0];
  console.log(experienceValues);

  return jbList.filter((job) => {
    const { maxExp } = job;
    return maxExp <= parseInt(experienceValues.name);
  });
};

/**
 * filterByWorkType
 *
 * Filter jobs by work type
 * @param {Job[]} jbList - List of jobs
 * @param {WorkTypeOption[]} selectedWorkTypes - Selected work type options
 * @returns {Job[]} - Filtered list of jobs
 *
 * @example
 *
 * filterByWorkType(jbList, selectedWorkTypes)
 */

export const filterByWorkType = (
  jbList: Job[],
  selectedWorkTypes: WorkTypeOption[]
): Job[] => {
  if (selectedWorkTypes.length === 0) return jbList;

  return jbList.filter((job) => {
    const isRemote = selectedWorkTypes.some(
      (workType) => workType.name.toLowerCase() === "remote"
    );
    const isInOffice = selectedWorkTypes.some(
      (workType) => workType.name.toLowerCase() === "inoffice"
    );
    const isHybrid = selectedWorkTypes.some(
      (workType) => workType.name.toLowerCase() === "hybrid"
    );

    const locationLower = job.location.toLowerCase();

    if (isRemote) {
      return locationLower.includes("remote");
    } else if (isInOffice) {
      return (
        !locationLower.includes("remote") && !locationLower.includes("hybrid")
      );
    } else if (isHybrid) {
      return locationLower.includes("hybrid");
    }

    return false; // Return no jobs if none of the selected work types match
  });
};

/**
 * filterByBasePay
 *
 * Filter jobs by base pay
 * @param {Job[]} jbList - List of jobs
 * @param {BasePayOption[]} selectedBasePays - Selected base pay options
 * @returns {Job[]} - Filtered list of jobs
 *
 * @example
 *
 * filterByBasePay(jbList, selectedBasePays)
 */
export const filterByBasePay = (
  jbList: Job[],
  selectedBasePays: BasePayOption[]
): Job[] => {
  if (selectedBasePays.length === 0) return jbList;

  const basePay = parseInt(selectedBasePays[0].name.split("L")[0]);
  console.log(basePay);

  return jbList.filter((job) => {
    return basePay >= job.minJdSalary && basePay <= job.maxJdSalary;
  });
};

// Filter by search company location
/**
 * filterBySearchCompanyLocation
 *
 * Filter jobs by search company location
 * @param {Job[]} jbList - List of jobs
 * @param {string} location - Location to search
 * @returns {Job[]} - Filtered list of jobs
 *
 * @example
 *
 * filterBySearchCompanyLocation(jbList, location)
 */
export const filterBySearchCompanyLocation = (
  jbList: Job[],
  location: string
) => {
  return jbList.filter((job) =>
    job.location.toLowerCase().includes(location.toLowerCase())
  );
};

// Apply all filters
export const applyFilters = (
  jbList: any[],
  selectedRoles: Role[],
  selectedExperiences: ExperienceOption[],
  selectedWorkTypes: WorkTypeOption[],
  selectedBasePays: BasePayOption[]
) => {
  let filteredJobs = jbList;

  filteredJobs = filterByRoles(filteredJobs, selectedRoles);
  filteredJobs = filterByExperience(filteredJobs, selectedExperiences);
  filteredJobs = filterByWorkType(filteredJobs, selectedWorkTypes);
  filteredJobs = filterByBasePay(filteredJobs, selectedBasePays);

  return filteredJobs;
};
