const { useState } = React;

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Fix login bug", priority: "high" },
    "task-2": { id: "task-2", content: "Add user profile", priority: "medium" },
    "task-3": {
      id: "task-3",
      content: "Update documentation",
      priority: "low",
    },
    "task-4": { id: "task-4", content: "Implement search", priority: "high" },
  },
  columns: {
    todo: { id: "todo", title: "To Do", taskIds: ["task-1", "task-2"] },
    progress: { id: "progress", title: "In Progress", taskIds: ["task-3"] },
    done: { id: "done", title: "Done", taskIds: ["task-4"] },
  },
  columnOrder: ["todo", "progress", "done"],
};

function Task({ task, index, onDragStart, onDragEnd }) {
  return (
    <div
      className={`task priority-${task.priority}`}
      draggable
      onDragStart={(e) => onDragStart(e, task.id, index)}
      onDragEnd={onDragEnd}
    >
      <div className="task-content">{task.content}</div>
      <div className={`priority-badge ${task.priority}`}>
        {task.priority.toUpperCase()}
      </div>
    </div>
  );
}

function Column({ column, tasks, onDragOver, onDrop, onDragStart, onDragEnd }) {
  return (
    <div className="column">
      <h3 className="column-title">{column.title}</h3>
      <div
        className="task-list"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, column.id)}
      >
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            task={task}
            index={index}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </div>
  );
}

function JiraBoard() {
  const [data, setData] = useState(initialData);
  const [draggedTask, setDraggedTask] = useState(null);

  const onDragStart = (e, taskId, index) => {
    setDraggedTask({ taskId, index });
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = () => {
    setDraggedTask(null);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e, destinationColumnId) => {
    e.preventDefault();

    if (!draggedTask) return;

    const { taskId } = draggedTask;

    // Find source column
    const sourceColumnId = Object.keys(data.columns).find((columnId) =>
      data.columns[columnId].taskIds.includes(taskId)
    );

    if (sourceColumnId === destinationColumnId) return;

    // Update data
    setData((prevData) => {
      const newData = { ...prevData };

      // Remove from source
      newData.columns = { ...newData.columns };
      newData.columns[sourceColumnId] = {
        ...newData.columns[sourceColumnId],
        taskIds: newData.columns[sourceColumnId].taskIds.filter(
          (id) => id !== taskId
        ),
      };

      // Add to destination
      newData.columns[destinationColumnId] = {
        ...newData.columns[destinationColumnId],
        taskIds: [...newData.columns[destinationColumnId].taskIds, taskId],
      };

      return newData;
    });
  };

  return (
    <div className="board">
      <h1>Jira-like Kanban Board</h1>
      <div className="board-columns">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          );
        })}
      </div>
    </div>
  );
}

ReactDOM.render(<JiraBoard />, document.getElementById("root"));
