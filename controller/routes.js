const express = require('express')

const routes = express.Router()

const roomController = require('./controller')

routes.post('/api/v1/rooms-types',roomController.postRoomType)

routes.get('/api/v1/rooms-types',roomController.getRoomType)

routes.post('/api/v1/rooms',roomController.postRoom)

routes.get('/api/v1/rooms',roomController.getRoom)

routes.patch('/api/v1/rooms/:roomId',roomController.updateRoom)

routes.get('/api/v1/rooms/:roomId',roomController.getOneRoom)

routes.delete('/api/v1/rooms/:roomId',roomController.deleteOneRoom)


module.exports = routes