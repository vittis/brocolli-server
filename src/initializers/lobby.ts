import { Initializer, chatRoom, log } from "actionhero";

let timer: NodeJS.Timeout;

export class Lobby extends Initializer {
  constructor() {
    super();
    this.name = "rooms";
  }

  async initialize() {
    // ensure a room exists
    const lobbyExists = await chatRoom.exists("lobby");
    if (!lobbyExists) {
      await chatRoom.add("lobby");
    }
  }

  async start() {
    console.log("START LOBBY");
    timer = setInterval(() => {
      this.logLobbyStatus();
    }, 60 * 1000);
  }

  async stop() {
    if (timer) {
      clearInterval(timer);
    }
  }

  async logLobbyStatus() {
    const { membersCount } = await chatRoom.roomStatus("lobby");
    log(`lobby has ${membersCount} members`);
  }
}
