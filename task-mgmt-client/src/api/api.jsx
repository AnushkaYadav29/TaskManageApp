import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const res = await axiosInstance.post("/user/register", userData);
  return res.data;
};

export const loginUser = async (loginData) => {
  const res = await axiosInstance.post("/user/login", loginData);
  return res.data;
};

export const getUserInfo = async()=>{
    const res = await axiosInstance.get("/user/getUserInfo")
    return res.data
}


export const getAllTasks = async () => {
    const res = await axiosInstance.get("/task/getAll");
    return res.data;
};

export const getTotalTasks = async () => {
    const res = await axiosInstance.get("/task/totalTasks"
);
    return res.data;
};

export const getTotalPendingTasks = async () => {
    const res = await axiosInstance.get("/task/totalPendingTasks");
    return res.data;
};

export const getTotalInprogressTasks = async () => {
    const res = await axiosInstance.get("/task/totalInprogressTasks");
    return res.data;
};

export const getTotalCompletedTasks = async () => {
    const res = await axiosInstance.get("/task/totalCompletedTasks");
    return res.data;
};



export const createTask = async (taskData) => {
  const res = await axiosInstance.post("/task/create",taskData);
  return res.data;
};

export const updateTask = async (id, taskData) => {
  const res = await axiosInstance.put(
    `/task/updateTask/${id}`,
    taskData
  );
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axiosInstance.delete(
    `/task/deleteTask/${id}`
  );
  return res.data;
};


export const getTaskById = async (id) => {
  const res = await axiosInstance.get(
    `/task/getTaskById/${id}`
  );

  return res.data;
};

export const updateUser =
  async (id, userData) => {
    const res =
      await axiosInstance.put(
        `/user/update/${id}`,
        userData
      );

    return res.data;
  };

export const getTaskByStatus = async (status) => {
    const res =
      await axiosInstance.get(
        `/task/getTaskByStatus?status=${status}`
      );

    return res.data;
};

export const getTotalUsers = async () => {
    const res =
      await axiosInstance.get(
        "/user/totalUsers"
      );

    return res.data;
};

export const getAllUsers =
  async () => {

  const res =
    await axiosInstance.get(
      "/user/getAllUsers"
    );

  return res.data;
};

export const changePassword =
  async (passwordData) => {

  const res =
    await axiosInstance.put(
      "/user/changePassword",
      passwordData
    );

  return res.data;
};