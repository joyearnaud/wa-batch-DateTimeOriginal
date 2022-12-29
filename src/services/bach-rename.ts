const fs = require("fs");
const path = require("path");
const piexif = require("piexifjs");
const dayjs = require("dayjs");

export function setOriginDate(inputdir: string, outputdir: string, env) {
  console.log({ inputdir, outputdir }, env);
  const filenames = fs.readdirSync(inputdir);

  filenames.forEach((file) => {
    if (path.extname(file) == ".jpg" || path.extname(file) == ".jpeg") {
      const filename: string = path.parse(file).name;
      let splited: string[];
      const regexA = "^IMG_+[0-9]*";
      const regexB = "^IMG-+[0-9]*";
      if (filename.match(regexA)) {
        splited = filename.split("_");
      } else if (filename.match(regexB)) {
        splited = filename.split("-");
      } else {
        console.log("error", file);
        splited = [];
      }
      const dateString = splited[1];
      const timeString = splited[2];

      if (dateString && dateString.match("^[0-9]{8}")) {
        // var date = printDateTime(dateString, timeString);
        var date = printDateTimeByDayjs(dateString, timeString);
        const filePath = inputdir + "/" + file.toString("binary");

        var zeroth = {};
        var exif = {};
        var gps = {};
        zeroth[piexif.ImageIFD.Make] = "Make";
        zeroth[piexif.ImageIFD.Software] = "Piexifjs";
        exif[piexif.ExifIFD.DateTimeOriginal] = date;
        exif[piexif.ExifIFD.LensMake] = "LensMake";
        var exifObj = { "0th": zeroth, Exif: exif, GPS: gps };
        var exifbytes = piexif.dump(exifObj);

        var jpeg = fs.readFileSync(filePath);
        var data = jpeg.toString("binary");
        var newData = piexif.insert(exifbytes, data);
        var newJpeg = Buffer.from(newData, "binary");

        fs.writeFileSync(
          outputdir +
            "/" +
            path.parse(file).name +
            "_dto" +
            path.parse(file).ext,
          newJpeg
        );
      } else {
        console.log("error", file);
      }
    }

    function printDateTimeByDayjs(dateString: string, timeString: string) {
      let d;
      if (timeString.match("^[0-9]{6}")) {
        d = dayjs(dateString + timeString);
      } else {
        d = dayjs(dateString);
      }

      return d.format("YYYY:MM:DD HH:mm:ss");
    }
  });
}
