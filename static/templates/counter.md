<%* 
	const {TaskList} = {{&userScriptCall}};
	const taskList  = new TaskList(tp);
	const count = await tp.system.prompt('На сколько сделать счетчик', '');
	
	if(Number.isNaN(+count)) 
		throw new Error("Count should be a number");
	
	taskList.makeCounter(+count);
	const selection = taskList.toString();
%><%selection%>