import { MidifileWhereInput } from "@prisma/client";

export default function whereFromQuery(query) {
  if (!query) return undefined;

  const where: MidifileWhereInput = {};
  const regex = /\w+:(".*"|[^ ]+)/gi;
  const modifiers = query.match(regex);
  const remainingQuery = query.replace(regex, "").trim();

  where.AND = remainingQuery
    .split(" ")
    .map((item) => ({ name: { contains: item, mode: "insensitive" } }));

  if (modifiers?.length) {
    where.AND = where.AND || [];
    modifiers.forEach((modifier) => {
      const [key, value] = modifier.split(":");
      if (Array.isArray(where.AND)) where.AND.push({ [key]: { equals: value.replace(/"/g, "") } });
    });
  }
  return where;
}
