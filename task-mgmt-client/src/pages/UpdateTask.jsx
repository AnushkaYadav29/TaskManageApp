import React, {
  useEffect,
  useState,
} from "react";

import {
  getTaskById,
  updateTask,
} from "../api/api";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { toast } from "react-toastify";

const UpdateTask = () => {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [task, setTask] =
    useState({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "",
    });

  const fetchTask =
    async () => {
      try {
        const data =
          await getTaskById(id);

        setTask(data.task);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchTask();
  }, []);

  const handleChange =
    (e) => {
      setTask({
        ...task,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await updateTask(
            id,
            task
          );

        toast.success(
          res.msg
        );

        navigate(
          `/dashboard/task/${id}`
        );
      } catch (error) {
        toast.error(
          error.response
            ?.data?.msg
        );
      }
    };

  return (
    <div className="container">

      <button
        className="btn btn-secondary mb-3"
        onClick={() =>
          navigate(-1)
        }
      >
        Back
      </button>

      <div className="card shadow">

        <div className="card-header bg-warning">
          <h4>
            Update Task
          </h4>
        </div>

        <div className="card-body">

          <form
            onSubmit={
              handleSubmit
            }
          >

            <div className="mb-3">
              <label>
                Title
              </label>

              <input
                className="form-control"
                name="title"
                value={
                  task.title
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div className="mb-3">
              <label>
                Description
              </label>

              <textarea
                className="form-control"
                rows="4"
                name="description"
                value={
                  task.description
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div className="mb-3">

              <label>
                Status
              </label>

              <select
                className="form-control"
                name="status"
                value={
                  task.status
                }
                onChange={
                  handleChange
                }
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

            <div className="row">

              <div className="col-md-6">

                <label>
                  Start Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={
                    task.startDate
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <div className="col-md-6">

                <label>
                  End Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={
                    task.endDate
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

            </div>

            <button className="btn btn-warning mt-4">
              Update Task
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default UpdateTask;