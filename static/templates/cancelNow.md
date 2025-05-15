<%* 
	const {TaskList} = {{&userScriptCall}};
	const taskList  = new TaskList(tp);
	taskList.cancel();
	const selection = taskList.toString();
%><%selection%>