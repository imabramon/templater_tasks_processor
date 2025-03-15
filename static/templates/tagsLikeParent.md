<%*
	const {TaskList} = {{&userScriptCall}};
	const taskList  = new TaskList(tp);
	taskList.tagLikeParent("{{&category}}")
	const selection = taskList.toString();
%><%selection%>