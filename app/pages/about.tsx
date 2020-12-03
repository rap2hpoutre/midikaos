import React from "react";
import Layout from "app/layouts/Layout";
import { BlitzPage } from "blitz";
import ExternalLink from "app/components/ExternalLink";

const AboutPage: BlitzPage = () => {
  return (
    <div className="m-5">
      <h2 className="text-2xl mt-5 font-bold">About</h2>
      <h3 className="text-purple-600 text-xl font-bold mt-3">Introduction</h3>
      <p className="my-2">
        This website is an archive of MIDI files collected by a music teacher over the years. Back
        in 1998, the CD-ROM was the ideal way to share the data, so he started to burn his
        collection and share it in his music school. The name of the project was Musikaos, it
        contained about 15000 MIDI files and some software to read, modify, and edit scores. The
        CD-ROM has been a small local success and has allowed the teachers of this school to expand
        their repertoire, print unpublished scores, and introduce their students to music from all
        over the world. Musikaos is now forgotten, most of the teachers have retired. I wished to
        pay tribute to this work and publish these files, to allow other amateur musicians to
        benefit from it.
      </p>
      <h3 className="text-purple-600 text-xl font-bold mt-3">Midi files (SMF)</h3>
      <p className="my-2">Quoting wikipedia, about MIDI:</p>
      <div className="ml-3 pl-3 border-l-4">
        MIDI (an acronym for Musical Instrument Digital Interface) is a technical standard that
        describes a communications protocol, digital interface, and electrical connectors that
        connect a wide variety of electronic musical instruments, computers, and related audio
        devices for playing, editing and recording music.
      </div>
      <p className="my-2">About Midi files specifically:</p>
      <div className="ml-3 pl-3 border-l-4">
        The Standard MIDI File is a file format that provides a standardized way for music sequences
        to be saved, transported, and opened in other systems. The standard was developed and is
        maintained by the MMA, and usually uses a <code>.mid</code> extension. The compact size of
        these files led to their widespread use in computers, mobile phone ringtones, webpage
        authoring and musical greeting cards. These files are intended for universal use and include
        such information as note values, timing and track names.
      </div>
      <h3 className="text-purple-600 text-xl font-bold mt-3">Contact</h3>
      <p className="my-2">
        Feel free to contact me: raphaelht@gmail.com or{" "}
        <a href="https://twitter.com/rap2h" className="link-pink">
          @rap2h
        </a>{" "}
        (DM open)
      </p>
      <div className="flex justify-center">
        <p className="mt-5 italic w-full lg:w-1/2 text-center">
          This site is a work in progress, made with{" "}
          <ExternalLink href="https://blitzjs.com/">Blitz.js</ExternalLink> using a PostgreSQL
          database, hosted on <ExternalLink href="https://render.com/">render.com</ExternalLink>.
          Files hosted on <ExternalLink href="https://www.ovh.com/">OVH</ExternalLink>. Logo made by{" "}
          <ExternalLink href="https://www.flaticon.com/authors/becris">Becris</ExternalLink>.
        </p>
      </div>
    </div>
  );
};

AboutPage.getLayout = (page) => <Layout title={"Midifile"}>{page}</Layout>;

export default AboutPage;
