import React, { useEffect, useState } from "react";
import { getUserInfo } from "../api/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {

      const data = await getUserInfo();

      setUser(data.loggedUser);

    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {

    return (
      <div className="text-center mt-5">
        <h4>Loading...</h4>
      </div>
    );

  }

  return (

    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">

          <h3>My Profile</h3>

        </div>

        <div className="card-body text-center">

          <img

            src={
              user.profileImage
                ? `http://localhost:5003/uploads/profile/${user.profileImage}`
                : "https://via.placeholder.com/180"
            }

            alt="Profile"

            className="rounded-circle border shadow"

            width="180"

            height="180"

          />

          <hr />

          <h4>{user.name}</h4>

          <p>

            <strong>Email :</strong>

            {user.email}

          </p>

          <p>

            <strong>Contact :</strong>

            {user.contactNumber}

          </p>

          <p>

            <strong>Role :</strong>

            {user.role}

          </p>

          <button

            className="btn btn-warning me-2"

            onClick={() =>
              navigate("/dashboard/edit-profile")
            }

          >

            Edit Profile

          </button>

          <button

            className="btn btn-primary"

            onClick={() =>
              navigate("/dashboard/change-password")
            }

          >

            Change Password

          </button>

        </div>

      </div>

    </div>

  );

};

export default Profile;