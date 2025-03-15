<%* 
	const {TaskList} = {{&userScriptCall}};
	const taskList  = new TaskList(tp);
	const tagString = await tp.system.prompt('{{&addTags.prompt}}', '')
	taskList.addTags(tagString)
	const selection = taskList.toString();
%><%selection%>