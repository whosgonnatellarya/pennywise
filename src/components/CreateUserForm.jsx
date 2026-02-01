import React from "react";
import { useForm } from "react-hook-form";
import { useCreateUser } from "../hooks/useCreateUser";
import toast from "react-hot-toast";

export default function CreateUserForm() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const mutation = useCreateUser();

  const onSubmit = async (data) => {
    try {
      await mutation.mutateAsync({
        email: data.email,
        full_name: data.full_name || null,
      });
      reset();
      toast.success("User created");
    } catch (err) {
      toast.error(err?.message || "Create failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="sr-only" htmlFor="email">Email</label>
          <input
            id="email"
            {...register("email", { required: "Email is required" })}
            placeholder="email@example.com"
            className="w-full px-3 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>}
        </div>

        <div className="w-44">
          <label className="sr-only" htmlFor="full_name">Name</label>
          <input
            id="full_name"
            {...register("full_name")}
            placeholder="Full name (optional)"
            className="w-full px-3 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>

        <div className="flex-none">
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="px-4 py-2 rounded-full bg-amber-700 text-white hover:bg-amber-800 disabled:opacity-60"
          >
            {mutation.isLoading ? "Saving…" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
}