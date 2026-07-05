import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-4jtw.onrender.com/api/tasks",
});

export default API;