import React, { useState } from "react";
import { createTask } from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createTask(task);

      toast.success(res.msg);

      navigate("/dashboard/all-tasks");
    } catch (error) {
      toast.error(
        error.response?.data?.msg ||
          "Task creation failed"
      );
    }
  };

  return (
    <div className="container">

      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <div className="card shadow border-0">

        <div className="card-header bg-primary text-white">
          <h3>Create Task</h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Title</label>

              <input
                type="text"
                className="form-control"
                name="title"
                value={task.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Description</label>

              <textarea
                rows="4"
                className="form-control"
                name="description"
                value={task.description}
                onChange={handleChange}
              />
            </div>

            <div className="row">

              <div className="col-md-6">
                <label>Start Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={task.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>End Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={task.endDate}
                  onChange={handleChange}
                />
              </div>

            </div>

            <button className="btn btn-primary mt-4">
              Create Task
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default CreateTask;