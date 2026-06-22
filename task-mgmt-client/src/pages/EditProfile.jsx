import React, {
  useEffect,
  useState
} from "react";

import {
  getUserInfo,
  updateUser
} from "../api/api";

import {
  useNavigate
} from "react-router-dom";

import {
  toast
} from "react-toastify";

const EditProfile = () => {

  const navigate =
    useNavigate();

  const [user, setUser] =
    useState({
      name: "",
      email: "",
      contactNumber: ""
    });

  const fetchUser =
    async () => {
      try {

        const data =
          await getUserInfo();

        setUser({
          name:
            data.loggedUser.name,
          email:
            data.loggedUser.email,
          contactNumber:
            data.loggedUser.contactNumber
        });

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange =
    (e) => {

      setUser({
        ...user,
        [e.target.name]:
          e.target.value
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const userInfo =
          await getUserInfo();

        const res =
          await updateUser(
            userInfo.loggedUser.id,
            user
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

      <div className="card shadow">

        <div className="card-header bg-warning">

          <h3>
            Edit Profile
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
                Name
              </label>

              <input
                type="text"
                name="name"
                value={
                  user.name
                }
                onChange={
                  handleChange
                }
                className="form-control"
              />

            </div>

            <div className="mb-3">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  user.email
                }
                onChange={
                  handleChange
                }
                className="form-control"
              />

            </div>

            <div className="mb-3">

              <label>
                Contact Number
              </label>

              <input
                type="text"
                name="contactNumber"
                value={
                  user.contactNumber
                }
                onChange={
                  handleChange
                }
                className="form-control"
              />

            </div>

            <button className="btn btn-warning">

              Update Profile

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EditProfile;