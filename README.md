# wa-batch-DateTimeOriginal

Sometime when using Whatsapp image restoration, images can lose useful informations, such as EXIF DateTimeOriginal. The result is that these files are displayed by their creation/modification date in viewing tools (often the restoration date). 

This batch try to solve this problem by injecting the dates contained in the filename into EXIF as DateTimeOriginal.

Filenames as to be:
- IMG_20170821_003927.jpg
- IMG_20170821_003927_processed.jpg
- IMG-20170821-WA0002.jpg

where 20170821 is a date YYYYmmdd (2017:08/21), 003927 is a time hhmmss (00:39:27), WA0002 is an date incrementated ID when Whatsapp choose not to include time.

Files have to be `.jpg`. Parameter `input` give the .jpg directory and parameter `output` give the result file directory. Files in output directory are anoted with `_dto`.

## Get dependencies

```bash
yarn
```

## Build

```bash
npx tsc
```

## Launch
```bash
node ./dist/launch.js --input=./dist/input --output=./dist/output
```

## Launch test
```bash
yarn test
```