const {DataTypes, Sequelize, STRING}=require('sequelize')
const{sequelize}=require('../config/db')

const User=sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false  
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    contactNumber:{
        type:STRING,
        allowNull:false
    },
    role:{
        type:STRING,
        defaultValue:"user"
    },
    profileImage: {
    type: DataTypes.STRING,
    allowNull: true
},
},{timestamps:true,tableName:'user'})

module.exports=User