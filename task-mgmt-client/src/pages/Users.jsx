import React,
{
  useEffect,
  useState
} from "react";

import {
  getAllUsers
} from "../api/api";

import { useNavigate }
from "react-router-dom";

const Users = () => {

  const [users, setUsers] =
    useState([]);

  const navigate =
    useNavigate();

  const fetchUsers =
    async () => {

      try {

        const data =
          await getAllUsers();

        setUsers(
          data.users
        );

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between mb-4">

        <h2>
          All Users
        </h2>

        <button
          className="btn btn-secondary"
          onClick={() =>
            navigate(-1)
          }
        >
          Back
        </button>

      </div>

      <div className="card shadow">

        <div className="card-body">

          <table className="table">

            <thead>

              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Role</th>
              </tr>

            </thead>

            <tbody>

              {users.map(
                (user) => (
                  <tr
                    key={
                      user.id
                    }
                  >
                    <td>
                      {user.id}
                    </td>

                    <td>
                      {user.name}
                    </td>

                    <td>
                      {user.email}
                    </td>

                    <td>
                      {
                        user.contactNumber
                      }
                    </td>

                    <td>
                      {user.role}
                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Users;