mui.init();


mui.ready(function () {
	mui(".mui-bar").on('tap','#person-notes',function(){
		mui.openWindow({
			url:'../person-notes/person-notes.html',
			id:'person-notes'
		});
	});
	
});

		
