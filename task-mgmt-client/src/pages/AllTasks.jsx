import React, { useEffect, useState } from "react";
import {
  getAllTasks,
  getAllUsers,
  deleteTask,
  assignTask,
  updateTask,
} from "../api/api";

import { useNavigate } from "react-router-dom";

import {
  FaTrash,
  FaUserPlus,
  FaEdit,
} from "react-icons/fa";

import { toast } from "react-toastify";

const AllTasks = () => {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editTask, setEditTask] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const openAssignModal = (task) => {
    setSelectedTask(task);
    setSelectedUsers([]);
    setShowAssignModal(true);
  };

  const openDeleteModal = (id) => {
    setDeleteTaskId(id);
    setShowDeleteModal(true);
  };

  const openEditModal = (task) => {
    setEditTask({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      startDate: task.startDate,
      endDate: task.endDate,
    });

    setShowEditModal(true);
  };

  const handleCheckbox = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(
        selectedUsers.filter((item) => item !== id)
      );
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleEditChange = (e) => {
    setEditTask({
      ...editTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleAssign = async () => {
    try {

      if (selectedUsers.length === 0) {
        return toast.error("Please select at least one user");
      }

      const res = await assignTask(
        selectedTask.id,
        selectedUsers
      );

      toast.success(res.msg);

      setShowAssignModal(false);

    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Assignment Failed"
      );
    }
  };

  const handleUpdate = async () => {
    try {

      const res = await updateTask(
        editTask.id,
        editTask
      );

      toast.success(res.msg);

      setShowEditModal(false);

      fetchTasks();

    } catch (error) {

      toast.error(
        error.response?.data?.msg || "Update Failed"
      );

    }
  };

  const confirmDelete = async () => {

    try {

      const res = await deleteTask(deleteTaskId);

      toast.success(res.msg);

      fetchTasks();

      setShowDeleteModal(false);

    } catch (error) {

      toast.error(
        error.response?.data?.msg || "Delete Failed"
      );

    }

  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        All Tasks
      </h2>

      <table className="table table-bordered table-hover align-middle">

        <thead className="table-dark">

          <tr>

            <th>#</th>

            <th>Title</th>

            <th>Description</th>

            <th>Status</th>

            <th>Start Date</th>

            <th>End Date</th>

            <th width="180">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {tasks.map((task, index) => (

            <tr
              key={task.id}
              style={{
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`/dashboard/task/${task.id}`)
              }
            >

              <td>{index + 1}</td>

              <td>
                <strong>{task.title}</strong>
              </td>

              <td>{task.description}</td>

              <td>

                <span
                  className={`badge ${
                    task.status === "Completed"
                      ? "bg-success"
                      : task.status === "Pending"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {task.status}
                </span>

              </td>

              <td>{task.startDate}</td>

              <td>{task.endDate}</td>

              <td>

                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    openAssignModal(task);
                  }}
                >
                  <FaUserPlus />
                </button>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(task);
                  }}
                >
                  <FaEdit />
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteModal(task.id);
                  }}
                >
                  <FaTrash />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
            {/* ================= Assign Task Modal ================= */}

      {showAssignModal && (
        <div
          className="modal d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content">

              <div className="modal-header">

                <h5 className="modal-title">
                  Assign Task
                </h5>

                <button
                  className="btn-close"
                  onClick={() =>
                    setShowAssignModal(false)
                  }
                ></button>

              </div>

              <div className="modal-body">

                <h6 className="mb-3">
                  Task :
                  <span className="text-primary ms-2">
                    {selectedTask?.title}
                  </span>
                </h6>

                <hr />

                {
                  users.length === 0 ?

                    (
                      <p>No Users Found</p>
                    )

                    :

                    (
                      users.map((user) => (

                        <div
                          key={user.id}
                          className="form-check mb-3"
                        >

                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`user-${user.id}`}
                            checked={selectedUsers.includes(user.id)}
                            onChange={() =>
                              handleCheckbox(user.id)
                            }
                          />

                          <label
                            htmlFor={`user-${user.id}`}
                            className="form-check-label"
                          >

                            <strong>
                              {user.name}
                            </strong>

                            <br />

                            <small className="text-muted">
                              {user.email}
                            </small>

                          </label>

                        </div>

                      ))
                    )

                }

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setShowAssignModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  onClick={handleAssign}
                >
                  Assign Task
                </button>

              </div>

            </div>

          </div>
        </div>
      )}
      {/* ================= Edit Task Modal ================= */}

{showEditModal && (
  <div
    className="modal d-block"
    style={{
      backgroundColor: "rgba(0,0,0,0.5)",
    }}
  >
    <div className="modal-dialog modal-lg modal-dialog-centered">

      <div className="modal-content">

        <div className="modal-header bg-warning">

          <h5 className="modal-title">
            Edit Task
          </h5>

          <button
            type="button"
            className="btn-close"
            onClick={() => setShowEditModal(false)}
          ></button>

        </div>

        <div className="modal-body">

          {/* Title */}

          <div className="mb-3">

            <label className="form-label">
              Title
            </label>

            <input
              type="text"
              className="form-control"
              name="title"
              value={editTask.title}
              onChange={handleEditChange}
            />

          </div>

          {/* Description */}

          <div className="mb-3">

            <label className="form-label">
              Description
            </label>

            <textarea
              rows="4"
              className="form-control"
              name="description"
              value={editTask.description}
              onChange={handleEditChange}
            />

          </div>

          <div className="row">

            {/* Status */}

            <div className="col-md-4">

              <label className="form-label">
                Status
              </label>

              <select
                className="form-select"
                name="status"
                value={editTask.status}
                onChange={handleEditChange}
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="InProgress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>

            {/* Start Date */}

            <div className="col-md-4">

              <label className="form-label">
                Start Date
              </label>

              <input
                type="date"
                className="form-control"
                name="startDate"
                value={editTask.startDate}
                onChange={handleEditChange}
              />

            </div>

            {/* End Date */}

            <div className="col-md-4">

              <label className="form-label">
                End Date
              </label>

              <input
                type="date"
                className="form-control"
                name="endDate"
                value={editTask.endDate}
                onChange={handleEditChange}
              />

            </div>

          </div>

        </div>

        <div className="modal-footer">

          <button
            className="btn btn-secondary"
            onClick={() => setShowEditModal(false)}
          >
            Cancel
          </button>

          <button
            className="btn btn-warning"
            onClick={handleUpdate}
          >
            Update Task
          </button>

        </div>

      </div>

    </div>
  </div>
)}
      {/* ================= Delete Modal ================= */}

      {showDeleteModal && (
        <div
          className="modal d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content">

              <div className="modal-header bg-danger text-white">

                <h5 className="modal-title">
                  Delete Task
                </h5>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDeleteModal(false)}
                ></button>

              </div>

              <div className="modal-body">

                <h5 className="text-center mb-3">
                  Are you sure?
                </h5>

                <p className="text-center text-muted">
                  This task will be permanently deleted.
                </p>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AllTasks;