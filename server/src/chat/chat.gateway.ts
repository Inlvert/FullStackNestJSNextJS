import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { CONSTANTS } from 'src/config/constants';

@WebSocketGateway({
  cors: {
    origin: CONSTANTS.CLIENT_URL,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('Socket.io server init');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  //Connect to room

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket()
    client: Socket,
    @MessageBody()
    room: string,
  ) {
    client.join(room);
    console.log(`Client ${client.id} connect to room ${room}`);
    client.emit('joinedRoom', `You connect to room ${room}`);
  }

  //Leave room

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket()
    client: Socket,
    @MessageBody()
    room: string,
  ) {
    client.leave(room);
    console.log(`Client ${client.id} leave room ${room}`);
    client.emit('leaveRoom', `You leave room ${room}`);
  }

  //Send a message to particular room
  @SubscribeMessage('sendMessage')
  async hendleMessage(
    @ConnectedSocket()
    client: Socket,
    @MessageBody()
    payload: { room: string; message: string },
  ) {
    const { room, message } = payload;

    console.log(`Message in ${room}: ${message}`);
    this.server.to(room).emit('newMessage', {
      sender: client.id,
      message,
    });
  }
}
