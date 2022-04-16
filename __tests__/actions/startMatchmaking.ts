import { Process, specHelper } from "actionhero";

describe("Action: startMatchmaking", () => {
  const actionhero = new Process();

  beforeAll(async () => await actionhero.start());
  afterAll(async () => await actionhero.stop());

  test("returns OK", async () => {
    const { ok } = await specHelper.runAction("startMatchmaking");
    expect(ok).toEqual(true);
  });
});
