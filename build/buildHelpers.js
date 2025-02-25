const dotenv = require("dotenv");
const path = require("path");

const { resolve } = path;

const LOCAL_FOLDER_NAME="./dist"
const DEFAULT_SCRIPTS_FOLDER = "Scripts";
const DEFAULT_FILENAME = "TTP.js";

const getVaultPath = () => {
    if(!!process.env.IGNORE_ENV) return LOCAL_FOLDER_NAME;

    const VAULT_PATH = process.env.VAULT_PATH;
    if (!VAULT_PATH) throw new Error("VAULT_PATH is not defined");

    return VAULT_PATH;
}

const getConfig = () => {
  dotenv.config();

  const VAULT_PATH = getVaultPath();

  const SCRIPTS_FOLDER = process.env.SCRIPTS_FOLDER ?? DEFAULT_SCRIPTS_FOLDER;
  const FILENAME = process.env.FILENAME ?? DEFAULT_FILENAME;

  const FILEPATH = resolve(VAULT_PATH, SCRIPTS_FOLDER, FILENAME);

  return {
    FILEPATH,
  };
};

module.exports = {
  getConfig,
};
