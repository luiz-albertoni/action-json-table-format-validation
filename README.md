
# Overview

This repository contains the source code used to create a GitHub Action,
to validate if all the json files, under a given folder, have the json 'table' format.

## Json 'table' format
```
  [
	  [ "Header1", "Header2", "Header3", "Header4", "Header5", "Header6" ],
	  [ "row1.1",  "row1.2",  "row1.3",   "row1.4",  "row1.5",  "row1.6" ],
	  [ "row2.1",  "row2.2",  "row2.3",   "row2.4",  "row2.5",  "row2.6" ],
	  [ "row3.1",  "row3.2",  "row3.3",   "row3.4",  "row3.5",  "row3.6" ]
  ]
```

## Code in Main

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  __tests__/main.test.ts
  Check Json format has table format
    ✓ Valid file, should not throw exception (7 ms)
    ✓ Invalid file, show throw error for missing column  (7 ms)
    ✓ Invalid file, show throw error for empty array  (1 ms)
    ✓ Invalid file, show throw error for json is not an array  (1 ms)
    ✓ Invalid file, show throw error for one of the rows is not an array  (1 ms)

...
```

## Usage:
```
  on: [push]

  jobs:
    your_job:
      runs-on: ubuntu-latest
      name: Using the json table validation
      steps:
        - name: Json table format validation
          id: hello
          uses: octocat/action-json-table-format-validation@v1.0
          with:
            directory: 'files'
```