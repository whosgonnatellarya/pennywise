import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../lib/api";

/**
 * useUsers - fetch list of users
 * Query key: ["users"]
 */
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // backend expects GET /users/
      return apiGet("/users/");
    },
    staleTime: 1000 * 30, // 30s
    retry: 1,
  });
}