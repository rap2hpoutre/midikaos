import React, { Suspense, useEffect, useState } from "react";
import Layout from "app/layouts/Layout";
import MidifileItem from "app/components/MidifileItem";
import { useQuery, usePaginatedQuery, useRouter, BlitzPage, Link } from "blitz";
import getMidifiles from "app/queries/getMidifiles";
import getRandomMidifiles from "app/queries/getRandomMidifiles";
import whereFromQuery from "utils/where-from-query";
import updateFilter from "utils/update-filter";
import Suggestion from "app/components/Suggestion";

const ITEMS_PER_PAGE = 10;

function NoResults({ setSearch }) {
  const [{ midifiles }] = useQuery(getRandomMidifiles, {});
  return (
    <div className="m-5">
      <h2 className="text-purple-600 font-bold text-xl">Oops, no result.</h2>
      <p>Hopefully, there may be some data that could be worthy of interest! You could try:</p>
      <ul className="list-disc p-5">
        <li>
          <button className="link-pink" onClick={() => setSearch("dance")}>
            Dance
          </button>{" "}
          while listening a{" "}
          <button className="link-pink" onClick={() => setSearch("samba")}>
            samba
          </button>
          , a{" "}
          <button className="link-pink" onClick={() => setSearch("tags:choro")}>
            choro
          </button>{" "}
          or a{" "}
          <button className="link-pink" onClick={() => setSearch("tags:klezmer")}>
            klezmer
          </button>{" "}
          track
        </li>
        <li>
          Explore the world by listening to music from{" "}
          <button className="link-pink" onClick={() => setSearch("tags:asia")}>
            Asia
          </button>
          ,{" "}
          <button className="link-pink" onClick={() => setSearch('tags:"north america"')}>
            North America
          </button>{" "}
          or{" "}
          <button className="link-pink" onClick={() => setSearch('tags:"central europe"')}>
            Central Europe
          </button>
        </li>
        <li>
          Download{" "}
          <button className="link-pink" onClick={() => setSearch('tags:"celtic music"')}>
            celtic
          </button>
          ,{" "}
          <button className="link-pink" onClick={() => setSearch("tags:arabic")}>
            arabic
          </button>{" "}
          or{" "}
          <button className="link-pink" onClick={() => setSearch("tags:medieval")}>
            medieval
          </button>{" "}
          music
        </li>
        <li>
          Try one of these random tracks:
          <ul className="list-disc pl-5">
            {midifiles.map((midifile) => (
              <li>
                <Link href="/midifiles/[midifileId]" as={`/midifiles/${midifile.id}`}>
                  <a className="link-pink">{midifile.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

function Documents({
  midifiles,
  count,
  handleFilter,
  page,
  goToPreviousPage,
  hasMore,
  goToNextPage,
}) {
  return (
    <>
      <div className="flex justify-end mr-5 text-sm text-gray-700">{count} results</div>
      <ul>
        {midifiles.map((midifile) => (
          <MidifileItem
            key={midifile.id}
            midifile={midifile}
            handleFilter={(type, value) => handleFilter(type, value)}
          />
        ))}
      </ul>
      <div className="flex justify-end mr-5">
        <button
          disabled={page === 0}
          onClick={goToPreviousPage}
          className={`btn-purple${page === 0 ? "-disabled" : ""}`}
        >
          ⇦ Previous
        </button>
        <button
          disabled={!hasMore}
          onClick={goToNextPage}
          className={`ml-4 btn-purple${!hasMore ? "-disabled" : ""}`}
        >
          Next ⇨
        </button>
      </div>
    </>
  );
}

export const MidifilesList = () => {
  const router = useRouter();
  const [page, setPage] = useState(Number(router.query.page) || 0);
  const [search, setSearch] = useState(router.query.search || "");
  useEffect(() => {
    setPage(Number(router.query.page) || 0);
    setSearch(router.query.search || "");
  }, [router]);
  useEffect(() => {
    router.push({ query: { page, search } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);
  const [{ midifiles, hasMore, count }] = usePaginatedQuery(getMidifiles, {
    where: whereFromQuery(search),
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => setPage(page - 1);
  const goToNextPage = () => setPage(page + 1);
  const handleChange = (event) => {
    setPage(0);
    setSearch(event.target.value);
  };
  const handleFilter = (type, value) => {
    setPage(0);
    setSearch(updateFilter(search, type, value));
  };

  return (
    <div>
      <div className="flex flex-col">
        <input
          onChange={handleChange}
          value={search}
          className="m-5 border p-3 rounded"
          placeholder="Search for midi files by track name or artist: carmina, jobim, matteo, etc."
        />
      </div>

      <div className="mx-5">
        <Suggestion
          type="tags"
          handleClick={(item) => handleFilter("tags", item)}
          list={["folk music", "classical", "flamenco", "bluegrass"]}
        />
        <Suggestion
          type="instruments"
          handleClick={(item) => handleFilter("instruments", item)}
          list={["piano", "shanai", "trumpet", "banjo", "acoustic guitar (steel)", "vibraphone"]}
        />
        <Suggestion
          type="countries"
          handleClick={(item) => handleFilter("tags", item)}
          list={["greece", "japan", "iran", "venezuela", "algeria", "bulgaria", "peru"]}
        />
      </div>
      {count ? (
        <Documents
          midifiles={midifiles}
          count={count}
          handleFilter={handleFilter}
          page={page}
          goToPreviousPage={goToPreviousPage}
          hasMore={hasMore}
          goToNextPage={goToNextPage}
        />
      ) : (
        <Suspense fallback={<div className="m-5 text-gray-500 animate-pulse">Loading...</div>}>
          <NoResults setSearch={setSearch} />
        </Suspense>
      )}
    </div>
  );
};

const MidifilesPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div className="m-5 text-gray-500 animate-pulse">Loading...</div>}>
        <MidifilesList />
      </Suspense>
    </div>
  );
};

MidifilesPage.getLayout = (page) => <Layout>{page}</Layout>;

export default MidifilesPage;
