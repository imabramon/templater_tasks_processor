<%* 
	const {TaskList} = {{&userScriptCall}};
	const taskList  = new TaskList(tp);
	taskList.devideByCompleted(true);
	const selection = taskList.toString();
%><%selection%>