import React, { useState } from "react";
import { registerUser } from "../api/api";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaImage,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      setFormData({
        ...formData,
        profileImage: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("contactNumber", formData.contactNumber);

    if (formData.profileImage) {
      data.append("profileImage", formData.profileImage);
    }

    try {
      const res = await registerUser(data);

      toast.success(res.msg || "Registration Successful");

      navigate("/");

    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Registration Failed"
      );
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-header bg-primary text-white text-center">
              <h3>Register</h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                {/* Name */}

                <div className="mb-3">
                  <label>Name</label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaUser />
                    </span>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      required
                    />

                  </div>

                </div>

                {/* Email */}

                <div className="mb-3">
                  <label>Email</label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      required
                    />

                  </div>

                </div>

                {/* Password */}

                <div className="mb-3">

                  <label>Password</label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaLock />
                    </span>

                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      required
                    />

                  </div>

                </div>

                {/* Contact */}

                <div className="mb-3">

                  <label>Contact Number</label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaPhone />
                    </span>

                    <input
                      type="text"
                      name="contactNumber"
                      className="form-control"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="Enter Contact Number"
                      required
                    />

                  </div>

                </div>

                {/* Profile Photo */}

                <div className="mb-3">

                  <label>Profile Photo</label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaImage />
                    </span>

                    <input
                      type="file"
                      name="profileImage"
                      className="form-control"
                      accept="image/*"
                      onChange={handleChange}
                    />

                  </div>

                </div>

                {/* Preview */}

                {formData.profileImage && (
                  <div className="text-center mb-3">
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Preview"
                      width="120"
                      height="120"
                      className="rounded-circle border"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Register
                </button>

              </form>

              <p className="text-center mt-3">

                Already have an account?

                <Link to="/" className="ms-2">
                  Login
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;