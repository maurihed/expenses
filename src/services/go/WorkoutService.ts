import { Workout } from "@/types";

export class WorkoutService {

    public static async getWorkouts(workoutName: string): Promise<Workout[]> {
      try {
        const response = await fetch(`/workouts/${workoutName}.json`);
        const workouts = await response.json() as Workout[];
        return Promise.resolve(workouts);
      } catch (error) {
        return Promise.reject(error);
      }
    }
}
