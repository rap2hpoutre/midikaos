import { Ctx } from "blitz";
import db, { FindManyMidifileArgs, Midifile } from "db";

type GetMidifilesInput = Pick<FindManyMidifileArgs, "where" | "orderBy" | "skip" | "take">;

export default async function getMidifiles(
  { where, orderBy, skip = 0, take }: GetMidifilesInput,
  ctx: Ctx
) {
  const midifiles = await db.$queryRaw<Midifile[]>(
    `select * from "Midifile" tablesample system (10) limit 3;`
  );

  return {
    midifiles,
  };
}
