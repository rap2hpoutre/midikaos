import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { useQuery, useParam, BlitzPage, dynamic, useRouter } from "blitz";
import getMidifile from "app/queries/getMidifile";
import FilterLinks from "app/components/FilterLinks";
import updateFilter from "utils/update-filter";
const MidiPlayer = dynamic(() => import("../../components/MidiPlayer"), {
  ssr: false,
});

function fmtMSS(s): string {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

const baseUrl = process.env.MIDIFILES_URL;

function Line({ name, value }) {
  if (!value) return null;
  return (
    <>
      <dd className="mt-4 text-purple-600 font-bold">{name}</dd>
      <dt>{value}</dt>
    </>
  );
}

export const Midifile = () => {
  const router = useRouter();
  const midifileId = useParam("midifileId", "number");
  const [midifile] = useQuery(getMidifile, { where: { id: midifileId } });

  return (
    <div className="border border-gray-400 shadow-md m-5 p-5 rounded-md">
      <h2 className="text-xl">
        {midifile.name} <span className="text-gray-500 float-right"> #{midifile.id}</span>
      </h2>
      <div className="grid grid-cols-2">
        <MidiPlayer url={`${baseUrl}/${midifile.path}`} duration={midifile.duration} />
        <div className="flex justify-end my-3">
          <a className="btn-pink" href={`${baseUrl}/${midifile.path}`}>
            Download
          </a>
        </div>
      </div>

      <dl>
        <Line name="artist" value={midifile.artist} />
        <Line name="description" value={midifile.description} />
        <Line
          name="instruments"
          value={
            <FilterLinks
              values={midifile.instruments}
              handleClick={(item) =>
                router.push({
                  pathname: "/",
                  query: { search: updateFilter("", "instruments", item) },
                })
              }
            />
          }
        />
        <Line
          name="tags"
          value={
            <FilterLinks
              values={midifile.tags}
              handleClick={(item) =>
                router.push({
                  pathname: "/",
                  query: { search: updateFilter("", "tags", item) },
                })
              }
            />
          }
        />
        <Line name="bpm" value={midifile.bpm} />
        <Line name="duration" value={fmtMSS(midifile.duration)} />
      </dl>
    </div>
  );
};

const ShowMidifilePage: BlitzPage = () => {
  const router = useRouter();
  return (
    <div>
      <Suspense fallback={<div className="m-5 text-gray-500 animate-pulse">Loading...</div>}>
        <Midifile />
      </Suspense>
      <p>
        <button className="btn-purple m-5" onClick={() => router.back()}>
          Back to list
        </button>
      </p>
    </div>
  );
};

ShowMidifilePage.getLayout = (page) => <Layout title={"Midifile"}>{page}</Layout>;

export default ShowMidifilePage;
