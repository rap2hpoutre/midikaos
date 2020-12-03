import { Ctx } from "blitz";
import db, { MidifileUpdateArgs } from "db";

type UpdateMidifileInput = Pick<MidifileUpdateArgs, "where" | "data">;

export default async function updateMidifile({ where, data }: UpdateMidifileInput, ctx: Ctx) {
  ctx.session.authorize();

  const midifile = await db.midifile.update({ where, data });

  return midifile;
}
