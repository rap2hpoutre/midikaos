import { Ctx, NotFoundError } from "blitz";
import db, { FindFirstMidifileArgs } from "db";

type GetMidifileInput = Pick<FindFirstMidifileArgs, "where">;

export default async function getMidifile({ where }: GetMidifileInput, ctx: Ctx) {
  const midifile = await db.midifile.findFirst({ where });

  if (!midifile) throw new NotFoundError();

  return midifile;
}
