function TaskInput({
  task,
  setTask,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  category,
  setCategory,
  handleAddTask,
}) {
  return (
    <div className="task-input">

      {/* Task Input */}
      <input
        type="text"
        placeholder="Enter Task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
        <option value="Shopping">Shopping</option>
      </select>

      {/* Priority (MISSING BEFORE - FIXED) */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Due Date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      {/* Button */}
      <button onClick={handleAddTask}>
        Add Task
      </button>

    </div>
  );
}

export default TaskInput;