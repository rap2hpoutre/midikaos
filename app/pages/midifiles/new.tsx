import React from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useMutation, BlitzPage } from "blitz";
import createMidifile from "app/mutations/createMidifile";
import MidifileForm from "app/components/MidifileForm";

const NewMidifilePage: BlitzPage = () => {
  const router = useRouter();
  const [createMidifileMutation] = useMutation(createMidifile);

  return (
    <div>
      <h1>Create New Midifile</h1>

      <MidifileForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const midifile = await createMidifileMutation({ data: { name: "l", path: "" } });
            // const midifile = { message: "fix me raph!", id: 123 };
            alert("Success!" + JSON.stringify(midifile));
            router.push("/midifiles/[midifileId]", `/midifiles/${midifile.id}`);
          } catch (error) {
            alert("Error creating midifile " + JSON.stringify(error, null, 2));
          }
        }}
      />

      <p>
        <Link href="/midifiles">
          <a>Midifiles</a>
        </Link>
      </p>
    </div>
  );
};

NewMidifilePage.getLayout = (page) => <Layout title={"Create New Midifile"}>{page}</Layout>;

export default NewMidifilePage;
