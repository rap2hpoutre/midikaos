import { Link } from "blitz";
import FilterLinks from "app/components/FilterLinks";

type SuggestionProps = {
  handleClick: Function;
  list: string[];
  type: string;
};

export default function Suggestion({ handleClick, list, type }: SuggestionProps) {
  return (
    <div className="my-1 text-sm">
      <b className="text-purple-600">{type}:</b>
      &nbsp;
      <FilterLinks values={list} handleClick={(item) => handleClick(item)} />
      {", "}
      <Link href="/midifiles/filters" as={`/midifiles/filters`}>
        <a>more…</a>
      </Link>
    </div>
  );
}
