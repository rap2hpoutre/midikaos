import { Ctx } from "blitz";
import db, { MidifileDeleteArgs } from "db";

type DeleteMidifileInput = Pick<MidifileDeleteArgs, "where">;

export default async function deleteMidifile({ where }: DeleteMidifileInput, ctx: Ctx) {
  ctx.session.authorize();

  const midifile = await db.midifile.delete({ where });

  return midifile;
}
