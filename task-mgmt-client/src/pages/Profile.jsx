import React, {
  useEffect,
  useState,
} from "react";

import {
  getUserInfo,
} from "../api/api";

import {
  useNavigate,
} from "react-router-dom";

const Profile = () => {
  const navigate =
    useNavigate();

  const [user, setUser] =
    useState(null);

  const fetchUser =
    async () => {
      try {
        const data =
          await getUserInfo();

        setUser(
          data.loggedUser
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container mt-4">

      {/* Back Button */}

      <button
        className="btn btn-secondary mb-4"
        onClick={() =>
          navigate(-1)
        }
      >
        ← Back
      </button>

      <div className="row justify-content-center">

        <div className="col-md-8">

          <div className="card shadow-lg border-0">

            <div className="card-header bg-primary text-white text-center">

              <h2>
                My Profile
              </h2>

            </div>

            <div className="card-body p-4">

              <div className="text-center mb-4">

                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="profile"
                  width="100"
                />

                <h3 className="mt-3">
                  {user?.name}
                </h3>

                <span
                  className={`badge ${
                    user?.role ===
                    "admin"
                      ? "bg-danger"
                      : "bg-success"
                  }`}
                >
                  {user?.role}
                </span>

              </div>

              <hr />

              <div className="row">

                <div className="col-md-6 mb-3">
                  <strong>
                    Name
                  </strong>

                  <p>
                    {user?.name}
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <strong>
                    Email
                  </strong>

                  <p>
                    {user?.email}
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <strong>
                    Contact Number
                  </strong>

                  <p>
                    {
                      user?.contactNumber
                    }
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <strong>
                    Role
                  </strong>

                  <p>
                    {user?.role}
                  </p>
                </div>

              </div>

              <hr />

              <div className="d-flex gap-3 justify-content-center">

                <button
                  className="btn btn-warning"
                  onClick={() =>
                    navigate(
                      "/dashboard/edit-profile"
                    )
                  }
                >
                  Edit Profile
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    navigate(
                      "/dashboard/change-password"
                    )
                  }
                >
                  Change Password
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;