import React, {
  useEffect,
  useState,
} from "react";

import {
  getTaskById,
  deleteTask,
} from "../api/api";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

const TaskDetails = () => {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [task, setTask] =
    useState(null);

  const fetchTask =
    async () => {
      try {
        const data =
          await getTaskById(
            id
          );

        setTask(
          data.task
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchTask();
  }, []);

  const handleDelete =
    async () => {
      try {
        const res =
          await deleteTask(
            id
          );

        toast.success(
          res.msg
        );

        navigate(
          "/dashboard/all-tasks"
        );
      } catch (error) {
        toast.error(
          error.response
            ?.data?.msg
        );
      }
    };

  if (!task)
    return (
      <h3>
        Loading...
      </h3>
    );

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

      <div className="card shadow">

        <div className="card-body">

          <h2>
            {task.title}
          </h2>

          <hr />

          <p>
            <strong>
              Description:
            </strong>

            <br />

            {
              task.description
            }
          </p>

          <p>
            <strong>
              Status:
            </strong>{" "}
            {task.status}
          </p>

          <p>
            <strong>
              Start Date:
            </strong>{" "}
            {
              task.startDate
            }
          </p>

          <p>
            <strong>
              End Date:
            </strong>{" "}
            {task.endDate}
          </p>

          <button
            className="btn btn-warning me-2"
            onClick={() =>
              navigate(
                `/dashboard/update-task/${task.id}`
              )
            }
          >
            Update
          </button>

          <button
            className="btn btn-danger"
            onClick={
              handleDelete
            }
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default TaskDetails;