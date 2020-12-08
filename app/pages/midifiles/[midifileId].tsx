import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { dynamic, useRouter } from "blitz";
import getMidifile from "app/queries/getMidifile";
import FilterLinks from "app/components/FilterLinks";
import updateFilter from "utils/update-filter";
import metaDescription from "utils/meta-description";
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

export const Midifile = ({ midifile }) => {
  const router = useRouter();
  return (
    <div className="border border-gray-400 shadow-md m-5 p-5 rounded-md">
      <h2 className="text-xl">
        {midifile.name} <span className="text-gray-500 float-right"> #{midifile.id}</span>
      </h2>
      <div className="grid grid-cols-2">
        <div>
          <MidiPlayer url={`${baseUrl}/${midifile.path}`} duration={midifile.duration} />
        </div>
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

const ShowMidifilePage = ({ midifile }) => {
  const router = useRouter();
  return (
    <div>
      <Suspense fallback={<div className="m-5 text-gray-500 animate-pulse">Loading...</div>}>
        <Midifile midifile={midifile} />
      </Suspense>
      <p>
        <button className="btn-purple m-5" onClick={() => router.back()}>
          Back to list
        </button>
      </p>
    </div>
  );
};

ShowMidifilePage.getLayout = (page) => {
  return (
    <Layout description={metaDescription(page.props.midifile)} title={page.props.midifile.name}>
      {page}
    </Layout>
  );
};

export async function getStaticProps(context) {
  const midifile = await getMidifile(
    { where: { id: Number(context.params?.midifileId) } },
    context
  );
  const { createdAt, updatedAt, ...rest } = midifile;
  return { props: { midifile: rest } };
}

type Path = {
  params: {
    midifileId: String;
  };
};

export async function getStaticPaths() {
  const paths: Path[] = [];
  for (let i = 1; i < 2958; i++) {
    paths.push({ params: { midifileId: String(i) } });
  }
  return {
    paths: paths,
    fallback: false,
  };
}

export default ShowMidifilePage;
