<%* 
const {TaskList} = {{&userScriptCall}};
const taskList  = new TaskList(tp);
const tagString = await tp.system.prompt('Напишите теги которые хотите удалить', '')
taskList.deleteTags(tagString)
const selection = taskList.toString()
%><% selection %>