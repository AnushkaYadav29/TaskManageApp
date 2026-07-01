import React, { useEffect, useState } from "react";
import {
  getTaskById,
  deleteTask,
} from "../api/api";

import { useParams, useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaUser
} from "react-icons/fa";

import { toast } from "react-toastify";

const TaskDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [task, setTask] = useState(null);

  const [users, setUsers] = useState([]);

  const fetchTask = async () => {

    try {

      const data = await getTaskById(id);

setTask(data.task);

// No assigned users API yet
setUsers([]);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchTask();

  }, []);

  const handleDelete = async () => {

    try {

      const res =
        await deleteTask(id);

      toast.success(res.msg);

      navigate("/dashboard/all-tasks");

    } catch (error) {

      toast.error(
        error.response?.data?.msg
      );

    }

  };

  if (!task) {

    return (
      <div className="container mt-5">

        <h3>Loading...</h3>

      </div>
    );

  }

  return (

    <div className="container mt-4">

      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="me-2" />
        Back
      </button>

      <div className="card shadow">

        <div className="card-header bg-primary text-white">

          <h3>{task.title}</h3>

        </div>

        <div className="card-body">

          <div className="mb-3">

            <h5>Description</h5>

            <p>{task.description}</p>

          </div>

          <div className="row">

            <div className="col-md-4">

              <strong>Status</strong>

              <br />

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

            </div>

            <div className="col-md-4">

              <strong>Start Date</strong>

              <br />

              {task.startDate}

            </div>

            <div className="col-md-4">

              <strong>End Date</strong>

              <br />

              {task.endDate}

            </div>

          </div>

          <hr />

          <h5 className="mb-3">
            Assigned Users
          </h5>

          {

            users.length === 0 ?

              (

                <div className="alert alert-warning">

                  No users assigned.

                </div>

              )

              :

              (

                <div className="row">

                  {

                    users.map((user) => (

                      <div
                        key={user.id}
                        className="col-md-4 mb-3"
                      >

                        <div className="card border-primary">

                          <div className="card-body">

                            <FaUser
                              size={25}
                              className="text-primary mb-2"
                            />

                            <h6>{user.name}</h6>

                            <small>

                              {user.email}

                            </small>

                          </div>

                        </div>

                      </div>

                    ))

                  }

                </div>

              )

          }

          <hr />

          <button
            className="btn btn-warning me-2"
            onClick={() =>
              navigate(`/dashboard/update-task/${task.id}`)
            }
          >
            <FaEdit className="me-2" />
            Update
          </button>

          <button
            className="btn btn-danger"
            onClick={handleDelete}
          >
            <FaTrash className="me-2" />
            Delete
          </button>

        </div>

      </div>

    </div>

  );

};

export default TaskDetails;