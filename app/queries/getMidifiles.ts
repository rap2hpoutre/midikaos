import { Ctx } from "blitz";
import db, { FindManyMidifileArgs, Midifile } from "db";

type GetMidifilesInput = Pick<FindManyMidifileArgs, "where" | "orderBy" | "skip" | "take">;

export default async function getMidifiles(
  { where, orderBy, skip = 0, take }: GetMidifilesInput,
  ctx: Ctx
) {
  function getFromWhere(name: string, operator: string = "AND") {
    const items =
      where &&
      where[operator] &&
      Array.isArray(where[operator]) &&
      where[operator].filter((item) => item[name]);
    return items && items.map((item) => item[name].equals || item[name].contains);
  }

  const names = getFromWhere("name") || [];
  const tags = getFromWhere("tags") || [];
  const instruments = getFromWhere("instruments") || [];

  let i = 0;
  const whereParts = names.map(() => `AND (name ILIKE $${++i} or artist ILIKE $${i})`);
  const params = names.map((name) => `%${name}%`);
  if (tags.length) {
    whereParts.push(`AND tags @> $${++i}::text[]`);
    params.push(tags);
  }
  if (instruments.length) {
    whereParts.push(`AND instruments @> $${++i}::text[]`);
    params.push(instruments);
  }
  const limit = `limit $${++i} offset $${++i}`;

  console.log([...names.map((name) => `%${name}%`), ...tags, ...instruments, take, skip]);
  const midifiles = await db.$queryRaw<Midifile[]>(
    `select * from "Midifile" where 1=1 ${whereParts.join("\n")} order by id desc ${limit}`,
    ...params,
    take,
    skip
  );

  const countRawQueryResult = await db.$queryRaw(
    `select count(*) from "Midifile" where 1=1 ${whereParts.join("\n")}`,
    ...params
  );

  /*
  const midifiles = await db.$queryRaw<Midifile[]>`
    select * from "Midifile" 
    where name ~* ${name ? `.*(${name.join("|")}).*` : ".*"}
    and tags @> ${tags ? tags : []}::text[]
    and instruments @> ${instruments ? instruments : []}::text[]
    order by id asc
    limit ${take} offset ${skip}
  `;
*/

  /*
  const countRawQueryResult = await db.$queryRaw`
    select count(*) from "Midifile" 
    where name ~* ${name ? `.*(${name.join("|")}).*` : ".*"}
    and tags @> ${tags ? tags : []}::text[]
    and instruments @> ${instruments ? instruments : []}::text[]
  `;
*/
  const count = countRawQueryResult[0].count;

  // Can not use findMany now :/
  /*
  const midifiles = await db.midifile.findMany({
    where,
    orderBy,
    take,
    skip,
  });

  const count = await db.midifile.count({ where });
  */
  const hasMore = typeof take === "number" ? skip + take < count : false;
  const nextPage = hasMore ? { take, skip: skip + take! } : null;

  return {
    midifiles,
    nextPage,
    hasMore,
    count,
  };
}
