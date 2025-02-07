import { WorkoutService } from "@/services";
import { Workout } from "@/types";
import { useQuery } from "react-query";

// Define the hook return type
type UseWorkoutsReturn = {
  workouts: Workout[] | undefined;
  isLoading: boolean;
  error: Error | null;
};

export const useWorkouts = (id: string): UseWorkoutsReturn => {
  const { data, isLoading, error } = useQuery<Workout[]>(
    ["workouts", id], // Dynamically use the id as part of the query key
    () => WorkoutService.getWorkouts(id),
    {
      staleTime: Infinity, // Disable background fetching
      enabled: !!id, // Only run the query when id is available
    }
  );

  return {
    workouts: data,
    isLoading,
    error: error as Error | null,
  };
};
