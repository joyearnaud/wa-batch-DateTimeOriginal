import { expect, jest, test } from "@jest/globals";
const fs = require("fs");
const path = require("path");
const piexif = require("piexifjs");
const dayjs = require("dayjs");
const argv = require("minimist")(process.argv.slice(2));

import { setOriginDate } from "../src/services/bach-rename";

const inputdir = "./tests/input";
const outputdir = "./tests/output";

const expected_inputDirLength = 9;
const expected_outputDirLength = 6;
const expected_dates = [
  "2017:02:16 00:00:00",
  "2016:08:03 15:52:13",
  "2017:04:23 23:55:32",
  "2017:04:23 23:56:19",
  "2017:04:23 23:56:45",
  "2017:05:29 19:05:18",
];

beforeAll(() => {
  expect(fs.readdirSync(inputdir).length).toEqual(expected_inputDirLength);
});

describe("auth", () => {
  jest.mock("fs");
  const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;

  it("should launch setOriginDate", async () => {
    const response = setOriginDate(inputdir, outputdir, "unit test");
    const filenames = fs.readdirSync(outputdir);
    expect(filenames.length).toEqual(expected_outputDirLength);

    filenames.forEach((file, index) => {
      const path = outputdir + "/" + file.toString("binary");
      const img = piexif.load(fs.readFileSync(path).toString("binary"));
      expect(img["Exif"][36867]).toEqual(expected_dates[index]);
    });
  });
});

afterAll(() => {
  // Deletes all files in output dir for next iteration
  fs.readdir(outputdir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(outputdir, file), (err) => {
        if (err) throw err;
      });
    }
  });
});
