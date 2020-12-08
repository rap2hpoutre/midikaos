import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { useRouter } from "blitz";
import getTags from "app/queries/getTags";
import getInstruments from "app/queries/getInstruments";
import { LinkItem } from "app/components/FilterLinks";
import updateFilter from "utils/update-filter";

export const Midifile = () => {};

function Tags({ tags }) {
  const router = useRouter();
  function handleClick(search) {
    router.push({ pathname: "/", query: { search } });
  }
  return (
    <div>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4">
        {tags.map((tag) => (
          <div key={tag.t}>
            <LinkItem
              value={tag.t}
              handleClick={(item) => handleClick(updateFilter("", "tags", item))}
            />
            <span className="ml-2 text-gray-500">({tag.c})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Instruments({ instruments }) {
  const router = useRouter();
  function handleClick(search) {
    router.push({ pathname: "/", query: { search } });
  }
  return (
    <div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
        {instruments.map((tag) => (
          <div key={tag.t}>
            <LinkItem
              value={tag.t}
              handleClick={(item) => handleClick(updateFilter("", "instruments", item))}
            />
            <span className="ml-2 text-gray-500">({tag.c})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const ShowFiltersPage = ({ initialValues }) => {
  const router = useRouter();
  return (
    <div className="m-5">
      <h2 className="text-xl my-5 font-bold">Index of Tags</h2>
      <Suspense fallback={<div className="text-gray-500 animate-pulse">Loading...</div>}>
        <Tags tags={initialValues.tags} />
      </Suspense>
      <h2 className="text-xl my-5 font-bold">Index of Instruments</h2>
      <Suspense fallback={<div className="text-gray-500 animate-pulse">Loading...</div>}>
        <Instruments instruments={initialValues.instruments} />
      </Suspense>
      <p>
        <button className="btn-purple my-10" onClick={() => router.back()}>
          Back to search page
        </button>
      </p>
    </div>
  );
};

ShowFiltersPage.getLayout = (page) => (
  <Layout description="Browse MIDI files index by tags and by instruments">{page}</Layout>
);

export async function getStaticProps() {
  const tags = await getTags({});
  const instruments = await getInstruments({});
  return { props: { initialValues: { tags, instruments } } };
}

export default ShowFiltersPage;
