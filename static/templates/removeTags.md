<%* 
const {TaskList} = {{&userScriptCall}};
const taskList  = new TaskList(tp);
const tagString = await tp.system.prompt('{{&removeTags.prompt}}', '')
taskList.deleteTags(tagString)
const selection = taskList.toString()
%><% selection %>