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
    const admin = socket.handshake.query.admin === 'true'
    if (admin) socket.join('admin')
    else socket.join('client')

    socket.on('connect_error', (err) => {
      console.log('Connection error:', err.message)
    })

    socket.on('disconnect', (reason) => {
      if (admin) socket.leave('admin')
      else socket.leave('client')
      console.log(`User disconnected: ${reason}`)
    })
  })
}
