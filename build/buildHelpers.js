const dotenv = require("dotenv");
const { includes } = require("lodash");
const path = require("path");

const { resolve } = path;

const LOCAL_FOLDER_NAME = "./dist";
const DEFAULT_SCRIPTS_FOLDER = "Scripts";
const DEFAULT_TEMPLATES_FOLDER = "Templates";
const DEFAULT_FILENAME = "TTP.js";

const getVaultPath = () => {
  if (!!process.env.IGNORE_ENV) return LOCAL_FOLDER_NAME;

  const VAULT_PATH = process.env.VAULT_PATH;
  if (!VAULT_PATH) throw new Error("VAULT_PATH is not defined");

  return VAULT_PATH;
};

const envOrDefault = (env, def) => {
  if (env === "ADD_TAGS_TEMPLATE_NAME")
    console.log("calll", env, process.env[env]);
  return process.env[env] ?? def;
};

const getFileMappings = () => {
  //
  const templateNameToEnvName = {
    addTags: "ADD_TAGS",
    removeTags: "REMOVE_TAGS",
    tagsLikeParent: "TAGS_LIKE_PARENT",
    devideByCompleted: "DEVIDE_BY_COMPLETED",
    devideByHasCategory: "DEVIDE_BY_HAS_CATEGORY",
    counter: "COUNTER",
  };

  const mappings = {};

  for (const [fileName, envName] of Object.entries(templateNameToEnvName)) {
    const templateFileName = `${fileName}.md`;
    const resolvedEnvName = `${envName}_TEMPLATE_NAME`;
    const resolvedFilename = envOrDefault(resolvedEnvName, fileName);
    mappings[templateFileName] = `${resolvedFilename}.md`;
  }

  return mappings;
};

const getConfig = () => {
  dotenv.config();

  const VAULT_PATH = getVaultPath();

  const SCRIPTS_FOLDER = process.env.SCRIPTS_FOLDER ?? DEFAULT_SCRIPTS_FOLDER;
  const TEMPLATES_FOLDER =
    process.env.TEMPLATES_FOLDER ?? DEFAULT_TEMPLATES_FOLDER;
  const FILENAME = process.env.FILENAME ?? DEFAULT_FILENAME;

  const FILEPATH = resolve(VAULT_PATH, SCRIPTS_FOLDER, FILENAME);
  const TEMPLATES_PATH = resolve(VAULT_PATH, TEMPLATES_FOLDER);
  const TEMPLATE_NAME_MAPPINGS = getFileMappings();

  const resolveFileName = (filename) => {
    if (!(filename in TEMPLATE_NAME_MAPPINGS))
      throw new Error(`${filename} is not in TEMPLATE_NAME_MAPPINGS`);

    return TEMPLATE_NAME_MAPPINGS[filename];
  };

  const mustacheConfig = {};
  mustacheConfig.userScriptCall = `tp.user['${FILENAME.replace(".js", "")}']()`;

  const mdTemplateConfig = {
    include: "static/templates/*.md",
    outputDir: TEMPLATES_PATH,
    resolveFileName,
    mustacheConfig,
  };

  return {
    FILEPATH,
    mdTemplateConfig,
  };
};

module.exports = {
  getConfig,
};
