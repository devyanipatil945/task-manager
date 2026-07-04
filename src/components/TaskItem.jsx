import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";

function TaskItem({ item, completeTask, deleteTask, editTask }) {
  return (
    <div className={`task-item ${item.completed ? "completed" : ""}`}>

      {/* LEFT SIDE CONTENT */}
      <div className="task-content">

        {/* Task Title */}
        <span>{item.text}</span>

        {/* Details Section */}
        <div className="task-details">

          {/* Priority */}
          <span className={`priority ${(item.priority || "low").toLowerCase()}`}>
            {item.priority || "Low"}
          </span>

          {/* Category */}
          <p className="category">
            📂 {item.category || "General"}
          </p>

          {/* Due Date */}
          <p className="date">
            📅 {item.dueDate ? item.dueDate : "No Due Date"}
          </p>

        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="buttons">

        {/* Edit */}
        <button
          className="edit-btn"
          onClick={() => editTask(item.id)}
          title="Edit Task"
        >
          <FaEdit />
        </button>

        {/* Complete */}
        <button
          className="complete-btn"
          onClick={() => completeTask(item.id)}
          title="Mark Complete"
        >
          <FaCheck />
        </button>

        {/* Delete */}
        <button
          className="delete-btn"
          onClick={() => deleteTask(item.id)}
          title="Delete Task"
        >
          <FaTrash />
        </button>

      </div>

    </div>
  );
}

export default TaskItem;