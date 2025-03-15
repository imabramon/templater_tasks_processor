<%* 
	const {TaskList} = {{&userScriptCall}};
	const taskList  = new TaskList(tp);
	const tagString = await tp.system.prompt('Напишите теги которые хотите добавить', '')
	taskList.addTags(tagString)
	const selection = taskList.toString();
%><%selection%>