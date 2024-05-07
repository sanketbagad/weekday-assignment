import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchJobs } from "../apis/fetch-jobs";

// write jsdoc

/**
 * useInfiniteJobs
 *
 * Custom hook to fetch jobs from the api with inifinite scroll
 * @returns {Object} - Object containing the queryKey, queryFn, initialPageParam, and getNextPageParam
 *
 * @example
 *
 **/

export const useInfiniteJobs = () =>
  useInfiniteQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextPage : undefined;
    },
  });
