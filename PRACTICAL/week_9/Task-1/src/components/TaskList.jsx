import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, removeTask }) => {
  return (
    <ul>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <TaskItem key={index} task={task} onRemove={() => removeTask(index)} />
        ))
      ) : (
        <p>No tasks available. Add some tasks!</p>
      )}
    </ul>
  );
};

export default TaskList;
