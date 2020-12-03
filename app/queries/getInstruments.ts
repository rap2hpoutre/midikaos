import { NotFoundError } from "blitz";
import db from "db";

export default async function getTags(params: any) {
  const tags = await db.$queryRaw`select unnest(instruments) t, count(*) as c from "Midifile" group by t order by t;`;

  if (!tags) throw new NotFoundError();

  return tags;
}
