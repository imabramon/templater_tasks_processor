<%*
	const {TaskList} = {{&userScriptCall}};
	const taskList  = new TaskList(tp);
	taskList.tagLikeParent("категория/")
	const selection = taskList.toString();
%><%selection%>