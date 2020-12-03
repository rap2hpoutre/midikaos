import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz";
import getMidifile from "app/queries/getMidifile";
import updateMidifile from "app/mutations/updateMidifile";
import MidifileForm from "app/components/MidifileForm";

export const EditMidifile = () => {
  const router = useRouter();
  const midifileId = useParam("midifileId", "number");
  const [midifile /* { mutate } */] = useQuery(getMidifile, { where: { id: midifileId } });
  const [updateMidifileMutation] = useMutation(updateMidifile);

  return (
    <div>
      <h1>Edit Midifile {midifile.id}</h1>
      <pre>{JSON.stringify(midifile)}</pre>

      <MidifileForm
        initialValues={midifile}
        onSubmit={async () => {
          try {
            const updated = await updateMidifileMutation({
              where: { id: midifile.id },
              data: { name: "MyNewName" },
            });
            /* await mutate(updated) */
            alert("Success!" + JSON.stringify(updated));
            router.push("/midifiles/[midifileId]", `/midifiles/${updated.id}`);
          } catch (error) {
            console.log(error);
            alert("Error creating midifile " + JSON.stringify(error, null, 2));
          }
        }}
      />
    </div>
  );
};

const EditMidifilePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditMidifile />
      </Suspense>

      <p>
        <Link href="/midifiles">
          <a>Midifiles</a>
        </Link>
      </p>
    </div>
  );
};

EditMidifilePage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditMidifilePage;
