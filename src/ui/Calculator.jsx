import { useState } from "react";

export default function Calculator({ workouts }) {
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [workout, setWorkout] = useState(workouts.at(0).numExercises);

  const duration = (sets * speed * workout) / 60 + (sets - 1) * durationBreak;
  const mins = Math.floor(duration);
  const secs = (duration - mins) * 60;

  return (
    <div>
      <select>
        {workouts.map((workout) => (
          <option key={workout.name}>
            {workout.name(workout.numExercises)}
          </option>
        ))}
      </select>

      <div>
        <label htmlFor="">How many sets</label>
        <input type="range" name="sets" id="" min={1} max={5} />
        <span>{sets} sets</span>
      </div>

      <div>
        <label htmlFor="">Speed</label>
        <input type="range" name="" id="" min={30} max={180} step={30} />
        <span>{speed} sec/exercise</span>
      </div>

      <div>
        <label htmlFor="">Break</label>
        <input type="range" name="" id="" min={1} max={10} />
        <span>{durationBreak} min/break</span>
      </div>

      <div>
        {mins < 10 && "0"}
        {mins}: {secs < 10 && "0"} {secs}
      </div>
    </div>
  );
}
