import { chatRoom, Connection, Initializer } from "actionhero";

export class ChatMiddlewareInitializer extends Initializer {
  constructor() {
    super();
    this.name = "chat-middleware";
  }

  async start() {
    const chatMiddleware: chatRoom.ChatMiddleware = {
      name: "chat middleware",
      priority: 1000,

      // announce all connections entering a room
      join: async (connection: Connection, room: string) => {
        console.log("join");
        await chatRoom.broadcast(
          {},
          room,
          "I have joined the room: " + connection.id
        );
      },

      // announce all connections leaving a room
      leave: async (connection: Connection, room: string) => {
        console.log("leave");
        await chatRoom.broadcast(
          {},
          room,
          "I have left the room: " + connection.id
        );
      },

      // Will be executed once per client connection before delivering the message.
      say: (connection: Connection, room: string, messagePayload: any) => {
        //console.log("SAY", { messagePayload });
        messagePayload.cool = true;
        return messagePayload;
      },

      // Will be executed only once, when the message is sent to the server.
      onSayReceive: function (
        connection: Connection,
        room: string,
        messagePayload: any
      ) {
        console.log("onSayReceive", messagePayload.message);
        messagePayload.receivedAt = new Date().getTime();
        return messagePayload;
      },
    };

    //chatRoom.addMiddleware(chatMiddleware);
  }
}
