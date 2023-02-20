const express = require('express')

const routes = express.Router()

const roomController = require('./controller')

// routes.post('/api/v1/rooms-types',roomController.postRoomType)



routes.post('/api/v1/create/user',roomController.creatUser)

routes.get('/fetch/roomtype/:userId',roomController.fetchRoomTypes)

routes.post('/user/create/room/:userId',roomController.userCreateRoom)


routes.get('/user/fetch/room/:userId',roomController.fetchRoom)

// routes.patch('/api/v1/rooms/:roomId',roomController.updateRoom)

routes.get('/fetch/single/rooms/:userId',roomController.getOneRoom)

routes.delete('/user/delete/room/:userId',roomController.deleteOneRoom)


module.exports = routes