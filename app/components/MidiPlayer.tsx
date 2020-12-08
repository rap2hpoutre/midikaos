import OriginalMidiPlayer from "web-midi-player";
import React, { useEffect, useState } from "react";

type MidiPlayerProps = {
  url: string;
  duration: Number | null;
};

function fancyTimeFormat(duration) {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

export default function MidiPlayer({ url, duration }: MidiPlayerProps) {
  const [midiPlayer, setMidiPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (!midiPlayer) {
      setMidiPlayer(
        new OriginalMidiPlayer({
          eventLogger: ({ event, time }) => {
            if (event === "MIDI_PLAY") {
              setTime(time);
              setIsLoading(false);
              setIsPlaying(true);
            }
            if (event === "MIDI_STOP") setIsPlaying(false);
          },
        })
      );
    }
    return function unmount() {
      stop(midiPlayer);
    };
  }, [midiPlayer]);
  const play = (midiPlayer) => {
    setIsLoading(true);
    midiPlayer && midiPlayer.play({ url });
  };
  const stop = (midiPlayer) => {
    midiPlayer && midiPlayer.stop();
  };

  return (
    <div className="my-3 flex space-x-2">
      <button
        className={isPlaying || isLoading ? "btn-pink-disabled" : "btn-pink"}
        onClick={() => play(midiPlayer)}
        disabled={isPlaying || isLoading}
      >
        ▶ Play
      </button>
      <button
        className={!isPlaying ? "btn-pink-disabled" : "btn-pink"}
        onClick={() => stop(midiPlayer)}
        disabled={!isPlaying}
      >
        Stop
      </button>
      {isLoading ? <span className="py-1 animate-pulse text-gray-500">Loading…</span> : <></>}
      {isPlaying && !isLoading && time > 0 ? (
        <span className="py-1 text-gray-600">
          {fancyTimeFormat(time)} / {fancyTimeFormat(duration || 999)}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}
