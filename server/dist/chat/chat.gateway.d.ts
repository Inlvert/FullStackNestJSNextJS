import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(client: Socket, room: string): Promise<void>;
    handleLeaveRoom(client: Socket, room: string): Promise<void>;
    hendleMessage(client: Socket, payload: {
        room: string;
        message: string;
    }): Promise<void>;
}
