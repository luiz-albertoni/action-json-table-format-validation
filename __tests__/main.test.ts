import * as core from '@actions/core'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import run from "../src/main";
import { Inputs } from "../src/constants";
import * as testUtils from "../src/utils/testUtils"

describe('Check Json format has table format', () => {

  test("Valid file, should not throw exception", async () => {
    testUtils.setInput(Inputs.Directory, "files");
    await run();
  });

  test("Invalid file, show throw error for missing column ", async () => {
    testUtils.setInput(Inputs.Directory, "files_fail/json_format");
    const failedMock = jest.spyOn(core, "setFailed");
    await run();
    expect(failedMock).toHaveBeenCalledWith(
      "Error: Missing one column on line 1, json file test.json is not an Array."
    );
  });

  test("Invalid file, show throw error for empty array ", async () => {
    testUtils.setInput(Inputs.Directory, "files_fail/json_without_content");
    const failedMock = jest.spyOn(core, "setFailed");
    await run();
    expect(failedMock).toHaveBeenCalledWith(
      "Error: No data on test.json."
    );
  });

  test("Invalid file, show throw error for json is not an array ", async () => {
    testUtils.setInput(Inputs.Directory, "files_fail/json_not_an_array");
    const failedMock = jest.spyOn(core, "setFailed");
    await run();
    expect(failedMock).toHaveBeenCalledWith(
      "Error: Line while reading test.json, content is not an Array."
    );
  });

  test("Invalid file, show throw error for one of the rows is not an array ", async () => {
    testUtils.setInput(Inputs.Directory, "files_fail/json_format_row_is_not_array");
    const failedMock = jest.spyOn(core, "setFailed");
    await run();
    expect(failedMock).toHaveBeenCalledWith(
      "Error: Line 2, json file test.json is not an Array."
    );
  });
});

