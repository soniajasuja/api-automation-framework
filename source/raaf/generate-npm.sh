#!/bin/sh
rm -rf ./npm
mkdir ./npm

cp ./raaf.js ./npm/raaf.js
cp ./raaf-gherkin.js ./npm/raaf-gherkin.js
cp ../package.json ./npm/package.json
cp ../../LICENSE ./npm/LICENSE
cp ../../README.md ./npm/README.md

cd ./npm
npm publish

rm -rf ../npm
