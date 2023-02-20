const express = require('express')

const routes = express.Router()

const adminController = require('./adminController')

routes.post('/api/v1/signup-admin',adminController.createAdmin)

routes.post('/create/roomtypes/:adminId',adminController.creatRoomType)

routes.get('/admin/roomtypes/:adminId',adminController.getAdminRoomType)

routes.get('/admin/roomtypes/getoneroom/:adminId?',adminController.getOneAdminRoomtype)

routes.patch('/admin/roomtypes/update/:adminId?',adminController.adminUpdateRoomtype)

routes.delete('/admin/roomtypes/delete/:adminId?',adminController.adminDeleteOneRoomtype)








module.exports = routes
