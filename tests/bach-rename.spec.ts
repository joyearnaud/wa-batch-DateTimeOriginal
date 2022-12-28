import { expect, jest, test } from "@jest/globals";
const fs = require("fs");
const path = require("path");
const piexif = require("piexifjs");
const dayjs = require("dayjs");
const argv = require("minimist")(process.argv.slice(2));

import { setOriginDate } from "../src/services/bach-rename";

const inputdir = "/Users/arnaudjoye/Project/wa-bach-rename/tests/input";
const outputdir = "/Users/arnaudjoye/Project/wa-bach-rename/tests/output";

beforeAll(() => {
  expect(fs.readdirSync(inputdir).length).toEqual(8);
});

describe("auth", () => {
  jest.mock("fs");
  const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;

  it("should launch setOriginDate", async () => {
    const response = setOriginDate(inputdir, outputdir, "unit test");
  });
});

afterAll(() => {
  fs.readdir(outputdir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(outputdir, file), (err) => {
        if (err) throw err;
      });
    }
  });
});
