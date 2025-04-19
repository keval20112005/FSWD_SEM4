import React from "react";

const TaskItem = ({ task, onRemove }) => {
  return (
    <li>
      {task} 
      <button onClick={onRemove}>❌</button>
    </li>
  );
};

export default TaskItem;
