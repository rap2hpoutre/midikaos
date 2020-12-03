import { Midifile } from "@prisma/client";
import { Link } from "blitz";
import FilterLinks from "app/components/FilterLinks";

type MidifileProps = {
  midifile: Midifile;
  handleFilter: Function;
};

type Values = {
  tags: Element | String[] | any;
  duration: String;
  bpm: Number;
  instruments: Element | String[] | any;
};

const removeFalsy = (obj): Values | any =>
  Object.entries(obj).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {});

function fmtMSS(s): string {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

function title(midifile: Midifile) {
  if (midifile.artist) {
    return (
      <a>
        <span className="text-pink-500 font-bold hover:underline">{midifile.name}</span> -{" "}
        <i>By {midifile.artist}</i>
      </a>
    );
  }
  return <a className="text-pink-500 font-bold hover:underline">{midifile.name}</a>;
}

function description({ tags, bpm, duration, instruments }: Midifile, handleFilter) {
  const values: Values = removeFalsy({
    tags,
    duration: fmtMSS(duration),
    bpm,
    instruments,
  });
  if (values.tags)
    values.tags = (
      <FilterLinks values={values.tags} handleClick={(item) => handleFilter("tags", item)} />
    );

  if (values.instruments)
    values.instruments = (
      <FilterLinks
        values={values.instruments}
        handleClick={(item) => handleFilter("instruments", item)}
      />
    );

  return (
    <div className="text-sm">
      {Object.entries(values).map(([key, value]) => (
        <div key={key}>
          <b>{key}</b>: {value}
        </div>
      ))}
    </div>
  );
}

export default function MidifileItem({ midifile, handleFilter }: MidifileProps) {
  return (
    <li key={midifile.id} className="border border-gray-400 shadow-md m-5 p-5 rounded-md">
      <Link href="/midifiles/[midifileId]" as={`/midifiles/${midifile.id}`}>
        {title(midifile)}
      </Link>
      {description(midifile, handleFilter)}
    </li>
  );
}
