import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useInfiniteJobs } from "./hooks/useInfiniteJobs";
import { Job } from "./types";
import JobCard from "./components/JobCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import FilterContainer from "./components/FilterContainer";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import {
  filterByBasePay,
  filterByExperience,
  filterByRoles,
  filterBySearchCompanyLocation,
  filterByWorkType,
} from "./lib/utils";
import { VscSearchStop } from "react-icons/vsc";
import { TbFaceIdError } from "react-icons/tb";

function App() {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>();
  const {
    selectedBasePays,
    selectedExperiences,
    selectedRoles,
    selectedWorkTypes,
    searchCompanyLocation,
  } = useSelector((state: RootState) => state.filters);

  const { ref, inView } = useInView();
  const { fetchNextPage, data, isFetchingNextPage, hasNextPage, status } =
    useInfiniteJobs();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    let allJobs = data?.pages.map((page) => page.data.jdList).flat() as Job[];

    // Filter by Base pay
    if (selectedBasePays && selectedBasePays.length > 0) {
      allJobs = filterByBasePay(allJobs, selectedBasePays);
    }

    // Filter by Employees
    // if (selectedEmployees && selectedEmployees.length > 0) {
    //   allJobs = filterByEmployees(allJobs, selectedEmployees);
    // }

    // Filter by Experiences
    if (selectedExperiences && selectedExperiences.length > 0) {
      allJobs = filterByExperience(allJobs, selectedExperiences);
    }

    // Filter by Roles
    if (selectedRoles && selectedRoles.length > 0) {
      allJobs = filterByRoles(allJobs, selectedRoles);
    }

    // Filter by Work Types
    if (selectedWorkTypes && selectedWorkTypes.length > 0) {
      allJobs = filterByWorkType(allJobs, selectedWorkTypes);
    }

    // Filter by Search Company Location
    if (searchCompanyLocation) {
      allJobs = filterBySearchCompanyLocation(allJobs, searchCompanyLocation);
    }

    setFilteredJobs(allJobs);
  }, [
    data,
    selectedBasePays,
    selectedExperiences,
    selectedRoles,
    selectedWorkTypes,
    searchCompanyLocation,
  ]);

  return status === "pending" ? (
    <div className=" flex justify-center items-center w-full h-screen">
      <AiOutlineLoading3Quarters
        className={` animate-spin text-blue-800 size-6`}
      />
    </div>
  ) : status === "error" ? (
    <div className=" flex justify-center items-center w-full h-screen flex-col ">
      <TbFaceIdError className=" size-20" />
      <p className="text-gray-500 text-xl mt-5">An error occurred.</p>
    </div>
  ) : (
    <div className=" p-5  max-w-screen-2xl mx-auto max-sm:p-3 space-y-10 pb-20 ">
      <FilterContainer />
      {filteredJobs?.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <VscSearchStop className=" size-20" />
          <p className="text-gray-500 text-xl mt-5">
            No Jobs available for this category at the moment.
          </p>
        </div>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 md:gap-x-8 xl:grid-cols-3 xl:gap-x-20 gap-y-16 justify-items-center max-sm:gap-y-8 pb-10 ">
          {filteredJobs?.map((job: Job) => (
            <JobCard job={job} key={job.jdUid} />
          ))}
          {!hasNextPage && !isFetchingNextPage && (
            <div>All jobs have been loaded.</div>
          )}
        </div>
      )}

      <div ref={ref} className="flex justify-center ">
        <hr />
        {isFetchingNextPage && (
          <AiOutlineLoading3Quarters
            className={`${isFetchingNextPage} && animate-spin text-blue-800 size-8`}
          />
        )}
      </div>
    </div>
  );
}
export default App;
