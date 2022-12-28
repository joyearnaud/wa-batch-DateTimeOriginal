# wa-batch-DateTimeOriginal

Sometime when using Whatsapp image restoration, images can lose useful informations, such as EXIF DateTimeOriginal. The result is that these files are displayed by their creation/modification date in viewing tools (often the restoration date). 

This batch try to solve this problem by injecting the dates contained in the filename into EXIF as DateTimeOriginal.

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