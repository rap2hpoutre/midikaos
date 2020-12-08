export default function metaDescription(data) {
  return `Listen to ${
    data.name
  }, a free MIDI file on Midikaos. Play, download, or share this track ${
    data.artist ? `(by ${data.artist}) ` : ""
  } from your web browser`;
}
