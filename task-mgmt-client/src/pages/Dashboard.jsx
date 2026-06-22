import React, { useEffect, useState } from "react";
import {
  getTotalTasks,
  getTotalPendingTasks,
  getTotalInprogressTasks,
  getTotalCompletedTasks,
  getTotalUsers,
  getUserInfo,
  getAllTasks,
  getTaskByStatus,
} from "../api/api";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inprogress: 0,
    completed: 0,
    users: 0,
  });

  const [tasks, setTasks] = useState([]);

  const [selectedStatus, setSelectedStatus] =
    useState("All Tasks");

  const fetchStats = async () => {
  try {
    const total =
      await getTotalTasks();

    const pending =
      await getTotalPendingTasks();

    const inprogress =
      await getTotalInprogressTasks();

    const completed =
      await getTotalCompletedTasks();

    let totalUsers = 0;

    if (user?.role === "admin") {
      const users =
        await getTotalUsers();

      totalUsers =
        users.totalUsers;
    }

    setStats({
      total: total.totalTasks,
      pending:
        pending.totalPendingTasks,
      inprogress:
        inprogress.totalInprogressTasks,
      completed:
        completed.totalCompletedTasks,
      users: totalUsers,
    });

  } catch (error) {
    console.log(error);
  }
};

  const fetchUser = async () => {
    try {
      const data =
        await getUserInfo();

      setUser(data.loggedUser);
    } catch (error) {
      console.log(error);
    }
  };

  const loadTasks = async (
    status = null
  ) => {
    try {
      if (!status) {
        const data =
          await getAllTasks();

        setTasks(data.tasks);

        setSelectedStatus(
          "All Tasks"
        );
      } else {
        const data =
          await getTaskByStatus(
            status
          );

        setTasks(data.tasks);

        setSelectedStatus(
          `${status} Tasks`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchUser();
    loadTasks();
  }, []);

  return (
    <div className="container-fluid">

      <h2 className="mb-4 fw-bold">
        Dashboard
      </h2>

      {/* Stats Cards */}

      <div className="row g-4">

        {/* Total Tasks */}

        <div className="col-md-3">
          <div
            className="card shadow border-0 dashboard-card bg-primary text-white"
            onClick={() =>
              loadTasks()
            }
          >
            <div className="card-body text-center">
              <h5>Total Tasks</h5>
              <h1>{stats.total}</h1>
            </div>
          </div>
        </div>

        {/* Pending */}

        <div className="col-md-3">
          <div
            className="card shadow border-0 dashboard-card bg-danger text-dark"
            onClick={() =>
              loadTasks("Pending")
            }
          >
            <div className="card-body text-center">
              <h5>Pending</h5>
              <h1>{stats.pending}</h1>
            </div>
          </div>
        </div>

        {/* In Progress */}

        <div className="col-md-3 text-dark">
          <div
            className="card shadow border-0 dashboard-card bg-info text-white"
            onClick={() =>
              loadTasks(
                "InProgress"
              )
            }
          >
            <div className="card-body text-center">
              <h5>In Progress</h5>
              <h1>
                {stats.inprogress}
              </h1>
            </div>
          </div>
        </div>

        {/* Completed */}

        <div className="col-md-3">
          <div
            className="card shadow border-0 dashboard-card bg-warning text-white"
            onClick={() =>
              loadTasks(
                "Completed"
              )
            }
          >
            <div className="card-body text-center">
              <h5>Completed</h5>
              <h1>
                {stats.completed}
              </h1>
            </div>
          </div>
        </div>

        {/* Admin Only */}

        {user?.role ===
          "admin" && (
          <div className="col-md-3">
            <div className="card shadow border-0 dashboard-card bg-dark text-white">
              <div className="card-body text-center">
                <h5>
                  Total Users
                </h5>

                <h1>
                  {stats.users}
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tasks Section */}

      <hr className="my-5" />

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h3>
          {selectedStatus}
        </h3>

      </div>

      <div className="row">

        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="col-md-4 mb-4"
            >
              <div
                className="card shadow task-card"
                style={{
                  cursor:
                    "pointer",
                }}
                onClick={() =>
                  navigate(
                    `/dashboard/task/${task.id}`
                  )
                }
              >
                <div className="card-body">

                  <h5>
                    {task.title}
                  </h5>

                  <p>
                    {task.description}
                  </p>

                  <span
                    className={`badge ${
                      task.status ===
                      "Completed"
                        ? "bg-success"
                        : task.status ===
                          "Pending"
                        ? "bg-warning text-dark"
                        : "bg-info"
                    }`}
                  >
                    {task.status}
                  </span>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-4">
            <h5>
              No Tasks Found
            </h5>
          </div>
        )}

      </div>

    </div>
  );
};

export default Dashboard;