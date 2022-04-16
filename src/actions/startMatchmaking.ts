import { Action, ActionProcessor, chatRoom } from "actionhero";

export class StartMatchmaking extends Action {
  constructor() {
    super();
    this.name = "startMatchmaking";
    this.description = "an actionhero action";
    this.outputExample = {};
  }

  async run(data: ActionProcessor<StartMatchmaking>) {
    if (!(await chatRoom.exists("matchmaking"))) {
      console.log("CREATED MATCHMAKING ROOM");
      await chatRoom.add("matchmaking");
    }
    await chatRoom.addMember(data.connection.id, "matchmaking");

    console.log("ADDED ", data.connection.id);

    let gameHasStarted = false;

    if ((await chatRoom.roomStatus("matchmaking")).membersCount >= 2) {
      gameHasStarted = true;
      console.log("START");
      console.log(
        "members, ",
        (await chatRoom.roomStatus("matchmaking")).members
      );
      const members = (await chatRoom.roomStatus("matchmaking")).members;

      await chatRoom.add(`game:${data.connection.id}`);

      Object.keys(members).forEach(async (member) => {
        await chatRoom.addMember(member, `game:${data.connection.id}`);
      });
      console.log("ADDED TO GAME");

      await chatRoom.broadcast({}, `game:${data.connection.id}`, "INICIA JOGO");

      await chatRoom.destroy("matchmaking");
    }
    // your logic here
    return { ok: true, gameHasStarted };
  }
}
