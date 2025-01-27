import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Medium",
    status: "Pending",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortPriority, setSortPriority] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const handleCreateOrUpdateTask = async () => {
    if (newTask.title.trim()) {
      if (isEditing) {
        await updateTask(editTaskId, newTask);
        setIsEditing(false);
        setEditTaskId(null);
      } else {
        await createTask(newTask);
      }
      fetchTasks();
      setNewTask({ title: "", priority: "Medium", status: "Pending" });
      setShowModal(false);
    } else {
      alert("Task title is required!");
    }
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setEditTaskId(task.id);
    setNewTask({
      title: task.title,
      priority: task.priority,
      status: task.status,
    });
    setShowModal(true);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleUpdateTaskStatus = async (id, status) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      await updateTask(id, { ...taskToUpdate, status });
      fetchTasks();
    }
  };

  const getStatusStyle = (status) => ({
    color: status === "Completed" ? "blue" : "red",
    fontWeight: "bold",
  });

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "all") return true;
    return task.status === activeFilter;
  });

  const sortedTasks = sortPriority
    ? [...filteredTasks].sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
    : filteredTasks;

  return (
    <div style={styles.body}>
      <h1 style={styles.taskTitle}>Task Manager</h1>

      <div style={styles.topCenterButtons}>
        <button
          onClick={() => setSortPriority(!sortPriority)}
          style={styles.button}
        >
          {sortPriority ? "Remove Priority Sort" : "Sort by Priority"}
        </button>
        <button
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
          }}
          style={styles.button}
        >
          Add Task
        </button>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>{isEditing ? "Edit Task" : "Add New Task"}</h2>
            <div>
              <label style={styles.label}>Title</label>
              <input
                type="text"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                style={styles.input}
              />
            </div>
            <div>
              <label style={styles.label}>Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
                style={styles.select}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <button onClick={handleCreateOrUpdateTask} style={styles.button}>
              {isEditing ? "Update Task" : "Add Task"}
            </button>
            <button
              onClick={() => {
                setShowModal(false);
                setIsEditing(false);
              }}
              style={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <ul>
        {sortedTasks.map((task, index) => (
          <li key={task.id} style={styles.taskItem}>
            <div style={styles.taskContent}>
              <h3 style={{ margin: 0 }}>
                {index + 1}. {task.title}
              </h3>
              <div style={styles.taskDetails}>
                <span style={styles.priority}>{task.priority}</span>
                <span style={getStatusStyle(task.status)}>{task.status}</span>
              </div>
            </div>
            <div style={styles.taskButtonContainer}>
              <FaCheck
                onClick={() => handleUpdateTaskStatus(task.id, "Completed")}
                style={{
                  ...styles.icon,
                  color: task.status === "Completed" ? "gray" : "green",
                  cursor:
                    task.status === "Completed" ? "not-allowed" : "pointer",
                }}
              />
              <FaEdit
                onClick={() => handleEditTask(task)}
                style={{ ...styles.icon, color: "blue" }}
              />
              <FaTrash
                onClick={() => handleDeleteTask(task.id)}
                style={{ ...styles.icon, color: "red" }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div style={styles.filterButtons}>
        <button
          onClick={() => setActiveFilter("all")}
          style={
            activeFilter === "all" ? styles.activeButton : styles.button
          }
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter("Completed")}
          style={
            activeFilter === "Completed"
              ? styles.activeButton
              : styles.button
          }
        >
          Completed
        </button>
        <button
          onClick={() => setActiveFilter("Pending")}
          style={
            activeFilter === "Pending"
              ? styles.activeButton
              : styles.button
          }
        >
          Pending
        </button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    marginTop: "10px",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
  },
  taskTitle: {
    fontSize: "24px",
    color: "#444",
    marginBottom: "20px",
  },
  topCenterButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "20px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    width: "400px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "1rem",
  },
  select: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "0.5rem",
  },
  cancelButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  activeButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  taskItem: {
    backgroundColor: "#fff",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  taskContent: {
    flex: 1,
    width:"500px",
    // height:"100px"

  },
  taskDetails: {
    marginTop: "5px",
    display: "flex",
    gap: "10px",
    fontSize: "12px",

  },
  priority: {
    fontWeight: "bold",
    color: "#555",
  },
  taskButtonContainer: {
    display: "flex",
    gap: "0.5rem",
  },
  icon: {
    fontSize: "15px",
    cursor: "pointer",
  },
  filterButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "2rem",
  },
};

export default TaskManager;
