<%* 
	const {TaskList} = {{&userScriptCall}};
	const taskList  = new TaskList(tp);
	taskList.devideByHasCategory("категория");
	const selection = taskList.toString();
%><%selection%>