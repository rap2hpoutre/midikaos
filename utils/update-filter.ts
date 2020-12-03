export default function updateFilter(search, type: string, value: string): string {
  return `${type}:${value.match(" ") ? `"${value}"` : value} ${search.replace(
    new RegExp(`${type}:(".*"|[^ ]+)`, "gm"),
    ""
  )}`
    .trim()
    .replace(/\s\s+/g, " ");
}
