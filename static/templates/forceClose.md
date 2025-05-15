<%* 
	const {TaskList} = {{&userScriptCall}};
	const taskList  = new TaskList(tp);
	taskList.forceClose();
	const selection = taskList.toString();
%><%selection%>