const dotenv = require("dotenv");
const { readFileSync } = require("fs");
const path = require("path");
const _ = require("lodash");

const { resolve } = path;

const LOCAL_FOLDER_NAME = "./dist";
const DEFAULT_SCRIPTS_FOLDER = "Scripts";
const DEFAULT_TEMPLATES_FOLDER = "Templates";
const DEFAULT_FILENAME = "TTP.js";
const DEFAULT_LOCALE = "EN";

const getVaultPath = () => {
  if (!!process.env.IGNORE_ENV) return LOCAL_FOLDER_NAME;

  const VAULT_PATH = process.env.VAULT_PATH;
  if (!VAULT_PATH) throw new Error("VAULT_PATH is not defined");

  return VAULT_PATH;
};

const envOrDefault = (env, def) => {
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

  const vaultPath = getVaultPath();

  const scriptsFolder = process.env.SCRIPTS_FOLDER ?? DEFAULT_SCRIPTS_FOLDER;
  const templatesFolder =
    process.env.TEMPLATES_FOLDER ?? DEFAULT_TEMPLATES_FOLDER;
  const filename = process.env.FILENAME ?? DEFAULT_FILENAME;
  const locale = process.env.LOCALE ?? DEFAULT_LOCALE;

  const filepath = resolve(vaultPath, scriptsFolder, filename);
  const templatesPath = resolve(vaultPath, templatesFolder);
  const templateNamesMapping = getFileMappings();

  const resolveFileName = (filename) => {
    if (!(filename in templateNamesMapping))
      throw new Error(`${filename} is not in TEMPLATE_NAME_MAPPINGS`);

    return templateNamesMapping[filename];
  };

  const mustacheConfig = {};
  mustacheConfig.userScriptCall = `tp.user['${filename.replace(".js", "")}']()`;

  const localeConfig = JSON.parse(
    readFileSync(resolve(__dirname, `../static/locales/${locale}.json`))
  );

  _.merge(mustacheConfig, localeConfig);

  const mdTemplateConfig = {
    include: "static/templates/*.md",
    outputDir: templatesPath,
    resolveFileName,
    mustacheConfig,
  };

  return {
    FILEPATH: filepath,
    mdTemplateConfig,
  };
};

module.exports = {
  getConfig,
};
