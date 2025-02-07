import { Workout } from "@/types";
import { Checkbox } from "@heroui/react";

type Props = {
  workout: Workout;
  completedActivities: Set<string>;
  onChange: (value: boolean, activity: string) => void;
};
function WorkoutItem({ workout, completedActivities, onChange }: Props) {
  return (
    <>
      {workout.activities.map((activity) => {
        return (
          <ul className="mb-3" key={activity.name}>
            <Checkbox
              name={activity.name}
              isSelected={completedActivities.has(activity.name)}
              onValueChange={(value) => onChange(value, activity.name)}
            >
              <li className="flex gap-2 justify-between">
                <p className="text-sm font-bold">{activity.name}</p>
                <p className="text-xs whitespace-nowrap">
                  {activity.sets} X {activity.action}{" "}
                  {activity.weight ? `(${activity.weight})` : ``}
                </p>
              </li>
              <small className="text-xs text-slate-400">{activity.note}</small>
            </Checkbox>
          </ul>
        );
      })}
    </>
  );
}

export default WorkoutItem;
