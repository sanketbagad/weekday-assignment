import { apiClient } from "../services/api-client";

// write jsdoc
/**
 * fetchJobs
 *
 * Fetches jobs from the api
 * @param {Object} - Object containing the pageParam
 * @returns {Object} - Object containing the data, currentPage, nextPage, and hasNextPage
 *
 * @example
 *
 **/
export const fetchJobs = async ({ pageParam }: { pageParam: number }) => {
  const limit = 10;
  const response = await apiClient.post("", {
    limit: 10,
    offset: pageParam,
  });
  const data = response.data;
  const nextPage = pageParam + limit;
  const hasNextPage = nextPage < 11657;
  return {
    data: data,
    currentPage: pageParam,
    nextPage: nextPage,
    hasNextPage: hasNextPage,
  };
};
