import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Layout from "./pages/Layout";

import Dashboard from "./pages/Dashboard";
import AllTasks from "./pages/AllTasks";
import CreateTask from "./pages/CreateTask";
import UpdateTask from "./pages/UpdateTask";
import TaskDetails from "./pages/TaskDetails";
import TaskByStatus from "./pages/TaskByStatus";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="all-tasks" element={<AllTasks />} />

          <Route path="create-task" element={<CreateTask />} />

          <Route path="update-task/:id" element={<UpdateTask />} />

          <Route path="task/:id" element={<TaskDetails />} />

          <Route path="tasks/status/:status" element={<TaskByStatus />} />

          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<Users />} />

          <Route path="change-password" element={<ChangePassword />} />

          <Route path="edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
