import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import axiosInstance from "../api/axiosInstance";

const TaskByStatus = () => {
  const { status } =
    useParams();

  const navigate =
    useNavigate();

  const [tasks, setTasks] =
    useState([]);

  const fetchTasks =
    async () => {
      try {
        const res =
          await axiosInstance.get(
            `/task/getTaskByStatus?status=${status}`
          );

        setTasks(
          res.data.tasks
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchTasks();
  }, [status]);

  return (
    <div>

      <button
        className="btn btn-secondary mb-3"
        onClick={() =>
          navigate(-1)
        }
      >
        Back
      </button>

      <h2>
        {status} Tasks
      </h2>

      <div className="row mt-3">

        {tasks.map(
          (task) => (
            <div
              key={task.id}
              className="col-md-4 mb-3"
            >
              <div
                className="card shadow"

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
                    {
                      task.description
                    }
                  </p>

                </div>
              </div>
            </div>
          )
        )}

      </div>

    </div>
  );
};

export default TaskByStatus;