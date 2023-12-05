import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIo } from "@/app/types";

/* 
  Pages is the other older router next uses and can host node servers
  move to src/ to use, to test connection wrap root layout with socket provider and
  implment the socket-indicator component
  This is for node socket server local to the app
  Pusher is more robust and can be used for production
*/


const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      // @ts-ignore
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on('connection', (socket) => {
    socket.on('announcement', () => {
      console.log('update-calendar')
      socket.emit('update-calendar')
    })});
  }


  res.end();
}

export default ioHandler;