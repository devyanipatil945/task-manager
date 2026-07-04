import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import TaskList from "./components/TaskList";
import Stats from "./components/Stats";
import ProgressBar from "./components/ProgressBar";
import EditModal from "./components/EditModal";

import jsPDF from "jspdf";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  // ==========================
  // States
  // ==========================

  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Work");
  const [dueDate, setDueDate] = useState("");

  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [darkMode, setDarkMode] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // ==========================
  // Save Local Storage
  // ==========================

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ==========================
  // Add Task
  // ==========================

  const handleAddTask = () => {

    if (!task.trim()) {
      toast.error("Please enter a task");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
      priority,
      category,
      dueDate,
    };

    setTasks([...tasks, newTask]);

    toast.success("Task Added Successfully 🎉");

    setTask("");
    setPriority("Medium");
    setCategory("Work");
    setDueDate("");
  };

  // ==========================
  // Delete Task
  // ==========================

  const deleteTask = (id) => {

    setTasks(tasks.filter((item) => item.id !== id));

    toast.error("Task Deleted 🗑️");

  };

  // ==========================
  // Complete Task
  // ==========================

  const completeTask = (id) => {

    setTasks(
      tasks.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );

    toast.success("Task Status Updated ✔️");

  };
    // ==========================
  // Open Edit Modal
  // ==========================

  const editTask = (id) => {
    const taskToEdit = tasks.find((item) => item.id === id);

    if (!taskToEdit) return;

    setSelectedTask(taskToEdit);
    setIsModalOpen(true);
  };

  // ==========================
  // Close Edit Modal
  // ==========================

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  // ==========================
  // Save Edited Task
  // ==========================

  const saveTask = (updatedTask) => {
    setTasks(
      tasks.map((item) =>
        item.id === updatedTask.id
          ? updatedTask
          : item
      )
    );

    toast.info("Task Updated ✏️");

    closeModal();
  };

  // ==========================
  // Export PDF
  // ==========================

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Task Manager Report", 20, 20);

    let y = 40;

    tasks.forEach((task, index) => {

      doc.setFontSize(14);

      doc.text(`${index + 1}. ${task.text}`, 20, y);

      y += 8;

      doc.text(`Priority : ${task.priority}`, 25, y);

      y += 8;

      doc.text(`Category : ${task.category}`, 25, y);

      y += 8;

      doc.text(
        `Due Date : ${task.dueDate || "No Due Date"}`,
        25,
        y
      );

      y += 8;

      doc.text(
        `Status : ${
          task.completed ? "Completed" : "Pending"
        }`,
        25,
        y
      );

      y += 15;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("Task_Report.pdf");

    toast.success("PDF Downloaded 📄");

  };

  // ==========================
  // Drag & Drop
  // ==========================

  const handleDragEnd = (result) => {

    if (!result.destination) return;

    const items = [...tasks];

    const [reorderedItem] = items.splice(
      result.source.index,
      1
    );

    items.splice(
      result.destination.index,
      0,
      reorderedItem
    );

    setTasks(items);

  };

  // ==========================
  // Search + Filter
  // ==========================

  const filteredTasks = tasks.filter((item) => {

    const matchSearch = item.text
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed")
      return item.completed && matchSearch;

    if (filter === "pending")
      return !item.completed && matchSearch;

    return matchSearch;

  });
    return (
    <div className={darkMode ? "container dark" : "container"}>

      {/* Header */}
      <Header />

      {/* Dark Mode Toggle */}
      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Input */}
      <TaskInput
        task={task}
        setTask={setTask}
        priority={priority}
        setPriority={setPriority}
        category={category}
        setCategory={setCategory}
        dueDate={dueDate}
        setDueDate={setDueDate}
        handleAddTask={handleAddTask}
      />

      {/* Search */}
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {/* Filter */}
      <Filter
        filter={filter}
        setFilter={setFilter}
      />

      {/* Stats */}
      <Stats tasks={tasks} />

      {/* Progress Bar */}
      <ProgressBar tasks={tasks} />

      {/* Export PDF Button */}
      <button className="pdf-btn" onClick={exportPDF}>
        📄 Export PDF
      </button>

      {/* Task List with Drag & Drop */}
      <TaskList
        filteredTasks={filteredTasks}
        completeTask={completeTask}
        deleteTask={deleteTask}
        editTask={editTask}
        handleDragEnd={handleDragEnd}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={closeModal}
        onSave={saveTask}
      />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      />

    </div>
  );
}

export default App;