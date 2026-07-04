import { useState, useEffect } from "react";

function EditModal({
  isOpen,
  task,
  onClose,
  onSave,
}) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setText(task.text);
      setPriority(task.priority);
      setDueDate(task.dueDate);
    }
  }, [task]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Task</h2>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="modal-buttons">

          <button
            className="save-btn"
            onClick={() =>
              onSave({
                ...task,
                text,
                priority,
                dueDate,
              })
            }
          >
            Save
          </button>

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditModal;