import events from "@mongez/events";
import type { SocketClient } from "app/sockets/client";

const CLIENT_DISCONNECT_EVENT = "socket.client.disconnect";
const CLIENT_CONNECT_EVENT = "socket.client.connect";

export const socketClientEvents = {
  /**
   * Listen when a new client is connected
   */
  onConnect(callback: (client: SocketClient) => any) {
    return events.subscribe(CLIENT_CONNECT_EVENT, callback);
  },
  /**
   * Trigger client connect
   */
  triggerConnect(client: SocketClient) {
    events.trigger(CLIENT_CONNECT_EVENT, client);
  },
  /**
   * Listen to client disconnect
   */
  onDisconnect(callback: (client: SocketClient) => any) {
    return events.subscribe(CLIENT_DISCONNECT_EVENT, callback);
  },

  /**
   * Trigger client disconnect
   */
  triggerDisconnect(client: SocketClient) {
    events.trigger(CLIENT_DISCONNECT_EVENT, client);
  },
};
