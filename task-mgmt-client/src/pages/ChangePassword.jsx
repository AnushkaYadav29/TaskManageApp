import React, {
  useState,
} from "react";

import {
  changePassword,
} from "../api/api";

import {
  toast,
} from "react-toastify";

import {
  useNavigate,
} from "react-router-dom";

const ChangePassword = () => {
  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      oldPassword: "",
      newPassword: "",
    });

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await changePassword(
            formData
          );

        toast.success(
          res.msg
        );

        navigate(
          "/dashboard/profile"
        );
      } catch (error) {
        toast.error(
          error.response
            ?.data?.msg
        );
      }
    };

  return (
    <div className="container mt-4">

      <button
        className="btn btn-secondary mb-3"
        onClick={() =>
          navigate(-1)
        }
      >
         Back
      </button>

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-header bg-danger text-white">

              <h3>
                Change Password
              </h3>

            </div>

            <div className="card-body">

              <form
                onSubmit={
                  handleSubmit
                }
              >

                <div className="mb-3">

                  <label>
                    Old Password
                  </label>

                  <input
                    type="password"
                    name="oldPassword"
                    className="form-control"
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>

                <div className="mb-3">

                  <label>
                    New Password
                  </label>

                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>

                <button
                  className="btn btn-danger w-100"
                >
                  Update Password
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ChangePassword;