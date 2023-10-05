import { SocketClient } from "app/sockets/client";
import { Socket } from "socket.io";
import { socketClientEvents } from "./events";

export class SocketClients {
  /**
   * List of connected clients
   */
  protected clients = new Map<string, SocketClient>();

  /**
   * Constructor
   */
  public constructor() {
    // listen for client disconnection
    // if so then remove it from the list
    this.listenForClientDisconnect();
  }

  /**
   * Listen for client disconnection
   */
  protected listenForClientDisconnect() {
    socketClientEvents.onDisconnect(this.remove.bind(this));
  }

  /**
   * Add a client to the list
   */
  public add(client: Socket) {
    this.clients.set(client.id, new SocketClient(client));

    return this;
  }

  /**
   * Remove client from the list
   */
  public remove(client: SocketClient) {
    this.clients.delete(client.id);

    console.log("Client disconnected", client.id);

    return this;
  }
}
