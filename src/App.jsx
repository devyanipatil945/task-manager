import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import TaskList from "./components/TaskList";
import Stats from "./components/Stats";
import ProgressBar from "./components/ProgressBar";
import EditModal from "./components/EditModal";

import API from "./api/taskApi";

import jsPDF from "jspdf";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Work");
  const [dueDate, setDueDate] = useState("");

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [darkMode, setDarkMode] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {

      const res = await API.get("/");

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleAddTask = async () => {

    if (!task.trim()) return;

    try {

      const res = await API.post("/", {
        text: task,
        priority,
        category,
        dueDate,
      });

      setTasks([res.data, ...tasks]);

      toast.success("Task Added Successfully 🎉");

      setTask("");
      setPriority("Medium");
      setCategory("Work");
      setDueDate("");

    } catch (error) {

      console.log(error);

    }

  };

  const deleteTask = async (id) => {

    try {

      await API.delete(`/${id}`);

      fetchTasks();

      toast.error("Task Deleted 🗑️");

    } catch (error) {

      console.log(error);

    }

  };

  const completeTask = async (id) => {

    try {

      const task = tasks.find((item) => item._id === id);

      await API.put(`/${id}`, {
        ...task,
        completed: !task.completed,
      });

      fetchTasks();

      toast.success("Task Completed ✔️");

    } catch (error) {

      console.log(error);

    }

  };

  const editTask = (id) => {

    const task = tasks.find(
      (item) => item._id === id
    );

    if (!task) return;

    setSelectedTask(task);

    setIsModalOpen(true);

  };

  const closeModal = () => {

    setSelectedTask(null);

    setIsModalOpen(false);

  };

  const saveTask = async (updatedTask) => {

    try {

      await API.put(
        `/${updatedTask._id}`,
        updatedTask
      );

      fetchTasks();

      toast.info("Task Updated ✏️");

      closeModal();

    } catch (error) {

      console.log(error);

    }

  };

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
          task.completed
            ? "Completed"
            : "Pending"
        }`,
        25,
        y
      );

      y += 18;

      if (y > 270) {

        doc.addPage();

        y = 20;

      }

    });

    doc.save("Task_Report.pdf");

    toast.success("PDF Downloaded 📄");

  };

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

  const filteredTasks = tasks.filter((item) => {

    const matchSearch = item.text
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed") {
      return item.completed && matchSearch;
    }

    if (filter === "pending") {
      return !item.completed && matchSearch;
    }

    return matchSearch;

  });
  return (
    <div className={darkMode ? "container dark" : "container"}>

      <Header />

      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

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

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <Filter
        filter={filter}
        setFilter={setFilter}
      />

      <Stats tasks={tasks} />

      <ProgressBar tasks={tasks} />

      <button
        className="pdf-btn"
        onClick={exportPDF}
      >
        📄 Export PDF
      </button>

      <TaskList
        filteredTasks={filteredTasks}
        completeTask={completeTask}
        deleteTask={deleteTask}
        editTask={editTask}
        handleDragEnd={handleDragEnd}
      />

      <EditModal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={closeModal}
        onSave={saveTask}
      />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

    </div>
  );
}

export default App;