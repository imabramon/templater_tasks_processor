<%* 
	const {TaskList} = {{&userScriptCall}};
	const taskList  = new TaskList(tp);
	taskList.devideByHasCategory("{{&category}}");
	const selection = taskList.toString();
%><%selection%>