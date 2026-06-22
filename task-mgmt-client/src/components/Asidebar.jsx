import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  FaHome,
  FaTasks,
  FaUser,
  FaPlusCircle,
  FaUsers,
} from "react-icons/fa";

import {
  getUserInfo,
} from "../api/api";

const Asidebar = () => {
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

  const userMenus = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FaHome />,
  },
  {
    title: "My Tasks",
    path: "/dashboard/all-tasks",
    icon: <FaTasks />,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <FaUser />,
  },
];

const adminMenus = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FaHome />,
  },
  {
    title: "Create Task",
    path: "/dashboard/create-task",
    icon: <FaPlusCircle />,
  },
  {
    title: "All Tasks",
    path: "/dashboard/all-tasks",
    icon: <FaTasks />,
  },
  {
    title: "Users",
    path: "/dashboard/users",
    icon: <FaUsers />,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <FaUser />,
  },
];

  const menus =
    user?.role === "admin"
      ? adminMenus
      : userMenus;

  return (
  <aside className="sidebar">

    <div className="sidebar-header">
      <h4>TaskMGMT</h4>
    </div>

    <div className="menu-container">

      {menus.map((menu, index) => (
        <Link
          key={index}
          to={menu.path}
          className="sidebar-link"
        >
          {menu.icon}
          <span>{menu.title}</span>
        </Link>
      ))}

    </div>

  </aside>
);
};

export default Asidebar;
