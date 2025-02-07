import { useState } from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import { Workout } from "@/types";
import WorkoutItem from "./WorkoutItem";

function WorkoutList({ workouts }: { workouts: Workout[] }) {
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());

  // Early return if there are no workouts
  if (workouts.length === 0) {
    return <div>No workouts found</div>;
  }

  // Toggle the activity completion state
  const handleChange = (value: boolean, activity: string) => {
    setCompletedActivities((prev) => {
      const updatedActivities = new Set(prev);
      value ? updatedActivities.add(activity) : updatedActivities.delete(activity);
      return updatedActivities;
    });
  };

  return (
    <Accordion variant="splitted">
      {workouts.map((workout) => (
        <AccordionItem key={workout.id} aria-label={workout.name} title={workout.name}>
          <WorkoutItem
            workout={workout}
            completedActivities={completedActivities}
            onChange={handleChange}
          />
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default WorkoutList;
