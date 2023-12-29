import { Injectable } from "@angular/core";
import { io } from "socket.io-client";

@Injectable()
export class SocketService {
    private readonly socket = io("http://localhost:3000");

    // Просто для примера работы сокета.
    connect() {
        this.socket.on("connect", () => {
            console.log("connected");
        });
    }
}
