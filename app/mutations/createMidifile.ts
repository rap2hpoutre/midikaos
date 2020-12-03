import { Ctx } from "blitz";
import db, { MidifileCreateArgs } from "db";

type CreateMidifileInput = Pick<MidifileCreateArgs, "data">;
export default async function createMidifile({ data }: CreateMidifileInput, ctx: Ctx) {
  ctx.session.authorize();

  const midifile = await db.midifile.create({ data });

  return midifile;
}
