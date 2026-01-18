import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "../lib/api";

/**
 * useCreateUser - mutation hook for creating a user
 * optimistic update of the ["users"] query
 */
export function useCreateUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      // POST /users/ -> returns created user
      return apiPost("/users/", user);
    },

    onMutate: async (newUser) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const previous = qc.getQueryData(["users"]);
      qc.setQueryData(["users"], (old = []) => [
        ...old,
        { id: `temp-${Date.now()}`, ...newUser },
      ]);
      return { previous };
    },

    onError: (err, _variables, context) => {
      if (context?.previous) qc.setQueryData(["users"], context.previous);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}