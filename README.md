# Summary

This project is designed to conveniently work with tasks in custom Templater scripts.

# Manual build guide

`npm run build:local` - building to dist folder
`npm run build:vault` - building by .env variables

## ENV Variables

| Variable       | Required | Description                    | Default value |
| -------------- | -------- | ------------------------------ | ------------- |
| VAULT_PATH     | Yes      | The path to the Obsidian Vault | -             |
| SCRIPTS_FOLDER | No       | Template scripts folder        | Scripts       |
| FILENAME       | No       | Script name with extension     | TTP.js        |