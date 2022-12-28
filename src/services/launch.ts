import { setOriginDate } from "./bach-rename";

const argv = require("minimist")(process.argv.slice(2));

const inputdir = argv.input;
const outputdir = argv.output;
setOriginDate(inputdir, outputdir, "prod");
