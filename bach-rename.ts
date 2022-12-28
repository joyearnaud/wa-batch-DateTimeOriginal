// Import the filesystem module
const fs = require('fs');
const path = require('path');
const piexif = require('piexifjs');
const dayjs = require('dayjs');

var argv = require('minimist')(process.argv.slice(2));
console.log(argv);

const dir = argv.input;

// Function to get current filenames
// in directory
const filenames = fs.readdirSync(dir);

console.log("\nCurrent directory filenames filtered to .jpg:");
filenames.forEach(file => {
  if (path.extname(file) == ".jpg") {    
    const filename = path.parse(file).name;
    const splited = filename.split('_');
    const dateString = splited[1];
    const timeString = splited[2];
    
    if(dateString) {
      // var date = printDateTime(dateString, timeString);
      var date = printDateTimeByDayjs(dateString, timeString);
      const newLocal = dir + '/' + file.toString('binary');
      console.log(newLocal);

      var zeroth = {};
      var exif = {};
      var gps = {};
      zeroth[piexif.ImageIFD.Make] = "Make";
      zeroth[piexif.ImageIFD.Software] = "Piexifjs";
      // exif[piexif.ExifIFD.DateTimeOriginal] = "2010:10:10 10:10:10";
      exif[piexif.ExifIFD.DateTimeOriginal] = date;
      exif[piexif.ExifIFD.LensMake] = "LensMake";
      var exifObj = {"0th":zeroth, "Exif":exif, "GPS":gps};
      var exifbytes = piexif.dump(exifObj);

      // piexif.load(newLocal);
      var jpeg = fs.readFileSync(newLocal);
      var data = jpeg.toString("binary");
      var newData = piexif.insert(exifbytes, data);
      var newJpeg = Buffer.from(newData, "binary");
      fs.writeFileSync(argv.output + '/' + path.parse(file).name + '_dto' + path.parse(file).ext, newJpeg);

    }
  }

  function printDateTimeByDayjs(dateString: string, timeString: string) {
    const year = +dateString.substring(0, 4);
    const month = +dateString.substring(4, 6);
    const day = +dateString.substring(6, 8);
    const hour = +timeString.substring(0, 2);
    const min = +timeString.substring(2, 4);
    const sec = +timeString.substring(4, 6);
    const d = dayjs(dateString + timeString);

    const dateFormated = d.format('YYYY:MM:DD HH:mm:ss');
    console.log(dateFormated)

    return dateFormated;
  }
});