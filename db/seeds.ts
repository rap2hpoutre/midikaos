import db from "./index";
// import faker from "faker";
const data = require(`${process.env.DATA_DIR}/result.json`);
const data2 = require(`${process.env.DATA_DIR}/result-2.json`);

// function getNRandomElement(min: Number, max: Number, fn: CallableFunction): Array<any> {
//  return Array.from({ length: faker.random.number({ min, max }) }, fn())
//}

const seed = async () => {
  await db.midifile.deleteMany({ where: {} });
  await db.$executeRaw` ALTER SEQUENCE "Midifile_id_seq" RESTART WITH 1;`;
  const total = [...data, ...data2];
  for (const item of total) {
    await db.midifile.create({
      data: {
        name: item.name || "",
        path: item.originalFileName,
        description: null, // item.description || null, <todo add it
        artist: item.artist || null,
        instruments: item.instruments || [],
        collection: null,
        tags: item.tags || [],
        bpm: item.bpm || null,
        duration: item.duration || null,
      },
    });
  }
  /*
  for (let i = 0; i < 5; i++) {
    await db.midifilecreate({
      data: {
        name: faker.random.words(3),
        path: faker.system.filePath(),
        description: faker.lorem.sentence(7),
        artists: getNRandomElement(1, 3, () => faker.name.findName),
        instruments: [["piano", "guitar", "bass"][faker.random.number({ min: 0, max: 2 })]],
        collection: faker.random.words(2),
        tags: [
          ["electronic", "classical", "blues", "jazz", "rock", "rap"][
            faker.random.number({ min: 0, max: 2 })
          ],
        ],
        tempo: faker.random.number({ min: 6, max: 22 }) * 10,
        duration: faker.random.number({ min: 50, max: 60 * 8 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    })
  }
  */
};

export default seed;
