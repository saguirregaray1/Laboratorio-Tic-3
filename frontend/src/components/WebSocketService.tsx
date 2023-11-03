import { Socket, io } from "socket.io-client";

class WebSocketService {
    private static instance: WebSocketService;
    private socket: Socket | null = null;
  
    private constructor() { }
  
    public static getInstance(): WebSocketService {
      if (!WebSocketService.instance) {
        WebSocketService.instance = new WebSocketService();
      }
  
      return WebSocketService.instance;
    }
  
    public connect(token: string): void {
      if (!this.socket) {
        this.socket = io('http://localhost:8000', {
          auth: { token: token },
        });
      }
    }
  
    public getSocket(): Socket | null {
      return this.socket;
    }
  }
  
  export default WebSocketService;