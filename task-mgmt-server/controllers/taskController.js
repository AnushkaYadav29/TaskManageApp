const {sequelize}=require('../config/db')
const Task=require('../models/taskModel')



async function createTask(req,res){
   
        console.log(req.body)
        const{title,description,startDate,endDate}=req.body
        try{
            if(!title || !description || !startDate || !endDate){
                return res.status(400).send({msg:"All fields are required,",success:false})
            }

            if(new Date (endDate)<new Date(startDate) ){
                return res.status(400).send({msg:"End date should be greater than start date",success:false})
            
            }

            const newTask=await Task.create({title,description,startDate,endDate})
            console.log(newTask)
            res.status(200).send({msg:"Task created successfully",success:true})
        
    }
    catch(error){
        console.log(error)
        res.status(500).send({msg:"Server Error",success:false})
    }

}

async function getAllTask(req,res){
    try{
        const tasks=await Task.findAll()
        res.status(200).send({tasks:tasks})
    }catch(error){
        console.log(error)
        res.status(500).send({msg:"Server Error"})
    }
}

async function getTaskById(req, res) {
    try {

        const ID = req.params.ID;

        const task = await Task.findByPk(ID);

        if (!task) {
            return res.status(404).send({
                success: false,
                msg: "Task not found"
            });
        }

        return res.status(200).send({
            success: true,
            task
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            msg: "Server Error"
        });
    }
}

async function getTaskByStatus(req, res) {
    try {

        const { status } = req.query;

        const tasks = await Task.findAll({
            where: {
                status: status
            }
        });

        return res.status(200).send({
            success: true,
            tasks
        });

    } catch (error) {

        console.log(error);

        return res.status(500).send({
            success: false,
            msg: "Server Error"
        });

    }
}

async function updateStatus(req, res) {
    try {
        const ID = req.params.ID;
        const status = req.body.status;

        const validStatus = ["Pending", "InProgress", "Completed"];

        if (!validStatus.includes(status)) {
            return res.status(400).send({
                msg: "Invalid Status",
                success: false
            });
        }

        const taskForUpdate = await Task.findByPk(ID);

        if (!taskForUpdate) {
            return res.status(404).send({
                msg: "Task not found",
                success: false
            });
        }

        await taskForUpdate.update({ status });

        return res.status(200).send({
            msg: "Task status updated successfully",
            success: true,
            task: taskForUpdate
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "Server Error",
            success: false
        });
    }
}

    
async function updateTask(req, res) {
    try {
        const ID = req.params.ID;

        const {
            title,
            description,
            startDate,
            endDate,
            status
        } = req.body;

        const taskForUpdate = await Task.findByPk(ID);

        if (!taskForUpdate) {
            return res.status(404).send({
                msg: "Task not found",
                success: false
            });
        }

        const newStartDate =
            startDate || taskForUpdate.startDate;

        const newEndDate =
            endDate || taskForUpdate.endDate;

        if (
            new Date(newEndDate) <
            new Date(newStartDate)
        ) {
            return res.status(400).send({
                msg: "End date should be greater than start date",
                success: false
            });
        }

        await taskForUpdate.update({
            title:
                title || taskForUpdate.title,

            description:
                description ||
                taskForUpdate.description,

            startDate: newStartDate,

            endDate: newEndDate,

            status:
                status ||
                taskForUpdate.status
        });

        return res.status(200).send({
            msg: "Task updated successfully",
            success: true,
            task: taskForUpdate
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
            msg: "Server Error",
            success: false
        });
    }
}

async function deleteTask(req,res){
     const ID=req.params.ID
    try{
       const taskForDelete=await Task.findByPk(ID)
       if(!taskForDelete){
        return res.status(400).send({msg:"Task not found",success:false})
       }
       await taskForDelete.destroy()
       return res.status(200).send({msg:"Task Deleted Successfully",success:true})
    }catch(error){
        console.log(error)
        res.status(500).send({msg:"Server Error"})
    }
}



async function getTaskBySelectedMonth(req, res) {
    try {
        const { month } = req.query;

        const tasks = await Task.findAll();

        const filteredTasks = tasks.filter(task =>
            new Date(task.startDate).getMonth() + 1 === Number(month)
        );

        res.status(200).send({
            success: true,
            tasks: filteredTasks
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server Error" });
    }
}

async function getTotalTasks(req, res) {
    try {

        const totalTasks = await Task.count();

        res.status(200).send({
            success: true,
            totalTasks
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            msg: "Server Error"
        });
    }
}

async function getTotalPendingTask(req, res) {
    try {

        const totalPendingTasks = await Task.count({
            where: {
                status: "Pending"
            }
        });

        res.status(200).send({
            success: true,
            totalPendingTasks
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            msg: "Server Error"
        });
    }
}

async function getTotalInprogressTask(req, res) {
    try {

        const totalInprogressTasks = await Task.count({
            where: {
                status: "InProgress"
            }
        });

        res.status(200).send({
            success: true,
            totalInprogressTasks
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            msg: "Server Error"
        });
    }
}

async function getTotalCompletedTask(req, res) {
    try {

        const totalCompletedTasks = await Task.count({
            where: {
                status: "Completed"
            }
        });

        res.status(200).send({
            success: true,
            totalCompletedTasks
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            msg: "Server Error"
        });
    }
}



module.exports={
    createTask,
    getAllTask,
    getTaskByStatus,
    getTaskById,
    updateStatus,
    updateTask,
    deleteTask,
  
    getTaskBySelectedMonth,
    getTotalTasks,
    getTotalPendingTask,
    getTotalInprogressTask,
    getTotalCompletedTask
   
}