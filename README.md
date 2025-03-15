# Summary

This project is designed to conveniently work with tasks in custom Templater scripts.

# Manual build guide

`npm run build:local` - building to dist folder <br>
`npm run build:vault` - building by .env variables

# ENV Variables

## System

| Variable         | Required | Description                    | Default value |
| ---------------- | -------- | ------------------------------ | ------------- |
| VAULT_PATH       | Yes      | The path to the Obsidian Vault | -             |
| SCRIPTS_FOLDER   | No       | Template scripts folder        | Scripts       |
| TEMPLATES_FOLDER | No       | Templater templates folder     | Templates     |
| FILENAME         | No       | Script name with extension     | TTP.js        |

## Templates customization

| Variable                             | Description                                      | Default value          |
| ------------------------------------ | ------------------------------------------------ | ---------------------- |
| LOCALE                               | Localization<br><br>EN - English<br>RU - Russian | EN                     |
| ADD_TAGS_TEMPLATE_NAME               | Add tags template name                           | addTags.md             |
| REMOVE_TAGS_TEMPLATE_NAME            | Remove tags template name                        | removeTags.md          |
| TAGS_LIKE_PARENT_TEMPLATE_NAME       | Tags like parent template name                   | tagsLikeParent.md      |
| DEVIDE_BY_COMPLETED_TEMPLATE_NAME    | Devide by completed template name                | devideByCompleted.md   |
| DEVIDE_BY_HAS_CATEGORY_TEMPLATE_NAME | Devide by has task category template name        | devideByHasCategory.md |
| COUNTER_TEMPLATE_NAME                | Counter template name                            | counter.md             |

# Templates

To make most of the templates work, you need to select the entire line, from beginning to end<br>
To execute the template, you don't need to separate the entire task list from the root task.

![Selection example](files/Selection.png)

## Add tags
Enter the tags you want to add in the promt separated by a space. You can specify them with or without a hashtag.<br>
<br>
<b>Example<b><br>
Origin selection
```
- [ ] task 1
    - [ ] task 2
    - [ ] task 3
```
promt: `tag1 #tag2`
```
- [ ] task 1 #tag1 #tag2
    - [ ] task 2 #tag1 #tag2
    - [ ] task 3 #tag1 #tag2
```

## Remove tags

## Tags like parent

## Devide by category

## Devide by has tags

## Counter
