import { useParams } from "react-router-dom";
import { useWorkouts } from "./hooks";
import { NavBar, WorkoutList } from "./components";

function WorkoutPage() {
  const { id } = useParams();
  const { workouts, isLoading, error } = useWorkouts(id ?? "mauricio");

  if (isLoading) {
    return "Cargando...";
  }

  if (error || !workouts) {
    return "Error" + JSON.stringify(error);
  }

  return (
    <div>
      <NavBar />
      <WorkoutList workouts={workouts} />
    </div>
  );
}

export default WorkoutPage;
