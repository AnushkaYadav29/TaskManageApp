const express=require("express")

const {
    createTask,
    getAllTask,
    getTaskById,
    updateStatus,
    updateTask,
    deleteTask,
    getTaskByStatus,
    getTaskBySelectedMonth,

    getTotalTasks,
    getTotalPendingTask,
    getTotalInprogressTask,
    getTotalCompletedTask

} = require("../controllers/taskController");

const{auth,admin}=require('../middleware/auth')


const router=express.Router()

router.post('/create',auth,admin,createTask)
router.get('/getAll',auth,getAllTask)
router.get("/getTaskById/:ID", auth,getTaskById)
router.patch('/updateStatus/:ID',updateStatus)
router.put('/updateTask/:ID',auth,admin,updateTask)
router.delete('/deleteTask/:ID',auth,admin,deleteTask)

router.get('/getTaskBySelectedMonth',auth, getTaskBySelectedMonth);

router.get("/totalTasks",auth,getTotalTasks);

router.get("/totalPendingTasks",auth,getTotalPendingTask);

router.get("/totalInprogressTasks",auth,getTotalInprogressTask
);

router.get("/totalCompletedTasks",auth,getTotalCompletedTask
);

router.get(
  "/getTaskByStatus",
  auth,
  getTaskByStatus
);

//getTaskByStatus->using query selector
//getTaskBySelectedMonth

//New=>
//getTotalTasks
//gettotalCompletedTask
//getTotalIncompleteTask


module.exports=router

// http://localhost:5003:/task/create