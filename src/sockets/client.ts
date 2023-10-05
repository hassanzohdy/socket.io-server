import { socketClientEvents } from "app/sockets/events";
import { Socket } from "socket.io";

export class SocketClient {
  /**
   * User id
   */
  protected userId?: string;

  /**
   * Constructor
   */
  public constructor(protected socket: Socket) {
    const userId = socket.handshake.query.userId;

    if (userId) {
      this.userId = String(userId);
    }

    this.init();
  }

  /**
   * Initialize and prepare the client settings
   */
  protected init() {
    socketClientEvents.triggerConnect(this);

    this.socket.on("disconnect", () => {
      socketClientEvents.triggerDisconnect(this);
    });
  }

  /**
   * Get client socket id
   */
  public get id() {
    return this.socket.id;
  }
}
