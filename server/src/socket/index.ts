import { Server as HttpServer } from 'http'

import { Server } from 'socket.io'

export const initSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true
    },
    transports: ['websocket', 'polling'],
    allowEIO3: true
  })

  io.on('connection', async (socket) => {
    console.log('New connection: ', socket.id)

    socket.on('connect_error', (err) => {
      console.log('Connection error:', err.message)
    })

    socket.on('disconnect', (reason) => {
      console.log(`User disconnected: ${reason}`)
    })
  })
}
