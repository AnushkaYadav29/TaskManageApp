import React, {
  useEffect,
  useState,
} from "react";

import {
  getAllTasks,
} from "../api/api";

import {
  useNavigate,
} from "react-router-dom";

const AllTasks = () => {
  const [tasks, setTasks] =
    useState([]);

  const navigate =
    useNavigate();

  const fetchTasks =
    async () => {
      try {
        const data =
          await getAllTasks();

        setTasks(
          data.tasks
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>

      <h2 className="mb-4">
        All Tasks
      </h2>

      <div className="row">

        {tasks.map(
          (task) => (
            <div
              key={task.id}
              className="col-md-4 mb-4"
            >
              <div
                className="card task-card shadow"

                onClick={() =>
                  navigate(
                    `/dashboard/task/${task.id}`
                  )
                }

                style={{
                  cursor:
                    "pointer",
                }}
              >
                <div className="card-body">

                  <h5>
                    {task.title}
                  </h5>

                  <p>
                    {task.description.substring(
                      0,
                      80
                    )}
                    ...
                  </p>

                  <span
                    className={`badge ${
                      task.status ===
                      "Completed"
                        ? "bg-success"
                        : task.status ===
                          "Pending"
                        ? "bg-warning"
                        : "bg-primary"
                    }`}
                  >
                    {
                      task.status
                    }
                  </span>

                </div>
              </div>
            </div>
          )
        )}

      </div>

    </div>
  );
};

export default AllTasks;