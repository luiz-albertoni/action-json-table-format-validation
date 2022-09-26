import * as core from '@actions/core'
import * as fs from 'fs';
import * as path from 'path'
import { Inputs } from "./constants";
import { isArray } from "./utils/utils"

/**
 * Validate if all files under a given folder 
 * have the json 'table' format
 */
async function run(): Promise<void> {
  try {
    const directory: string = core.getInput(Inputs.Directory, { required: true })
    const wd: string = process.env[`GITHUB_WORKSPACE`] || "";
    core.info(`wd Path: ${wd} ...`);
    const directoryPath = path.join(__dirname, '..', directory);
    const fsp = fs.promises;

    core.info(`Directory Path: ${directoryPath} ...`);
    const files = await fsp.readdir(directoryPath);

    if (files.length === 0) {
      core.info(`No files found on ${directoryPath}`);
    }

    files.forEach(function (fileName) {
      const filePath = `${directoryPath}/${fileName}`;
      const fileContent = fs.readFileSync(filePath);

      let jsonArrayObject = JSON.parse(fileContent.toString());
      if (isArray(jsonArrayObject)) {
        const tableHeaders = jsonArrayObject[0];
        if (tableHeaders && jsonArrayObject.length > 2) {
          validateRows(tableHeaders, jsonArrayObject, fileName);
        } else {
          throw Error(`Error: No data on ${fileName}.`);
        }
      } else {
        throw Error(`Error: Line while reading ${fileName}, content is not an Array.`);
      }
    });
    core.info(`All json files are good.`);

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

/**
 * Given the json on the table format
 *   [
 *    [ "Header1", "Header2", "Header3", "Header4", "Header5", "Header6" ],
 *    [ "row1.1",  "row1.2",  "row1.3",   "row1.4",  "row1.5",  "row1.6" ],
 *    [ "row2.1",  "row2.2",  "row2.3",   "row2.4",  "row2.5",  "row2.6" ],
 *    [ "row3.1",  "row3.2",  "row3.3",   "row3.4",  "row3.5",  "row3.6" ]
 *   ]
 * Validate the header array has the same number of items of the others rows
 *
 * @param {Array<string>} tableHeaders
 * @param {Array<any>} jsonArrayObject
 * @param {string} fileName
 */
function validateRows(tableHeaders: Array<string>, jsonArrayObject: Array<any>, fileName: string) {
  const tableHeadersLength = tableHeaders.length;
  for (let index = 1; index < jsonArrayObject.length; index++) {
    if (!isArray(jsonArrayObject[index])) {
      throw Error(`Error: Line ${index}, json file ${fileName} is not an Array.`);
    }

    if (tableHeadersLength !== jsonArrayObject[index].length) {
      throw Error(`Error: Missing one column on line ${index}, json file ${fileName} is not an Array.`);
    }
  }
}

run()

export default run;