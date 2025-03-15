<%* 
	const {TaskList} = {{&userScriptCall}};
	const taskList  = new TaskList(tp);
	taskList.devideByCompleted();
	const selection = taskList.toString();
%><%selection%>