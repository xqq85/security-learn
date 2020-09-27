mui.init();

mui.plusReady(function() {
	var id;
	//var title = document.getElementById('course_title');
	var meeting = document.getElementById('meeting');
	var comment1 = [];
	//添加newId自定义事件监听
	window.addEventListener('meeting-management', function(event) {
		//获得事件参数
		id = event.detail.id;
		console.log(id);
		//向服务端请求课程详细内容
		mui.ajax({
			type: 'GET',
			url: "http://192.168.0.115:8000/course/detail-interface/" + id,
			dataType: 'json', //服务器返回json格式数据  
			timeout: 1500, //1.5秒超时  
			success: function(data) {
				mui.toast('获取文章详细内容成功!');
				console.log(data.comment);
				comment1 = JSON.parse(data.comment);
				console.log(data.course);
				data = JSON.parse(data.course);

				//alert(id);
				var chapter_name = event.detail.chapter_name;
				console.log(data.fields.url);

				//加载标题/作者/详细内容
				//title.querySelector('.mui-title').innerHTML = data.fields.title;
				meeting.querySelector('.author_name').innerHTML = data.fields.author;
				meeting.querySelector('.course_message').innerHTML = data.fields.body;

			},
			error: function(xhr, type, errorThrown) {
				mui.toast('获取文章详细内容失败!');
				// 请求失败
				console.log(type + '' + xhr.readyState + '' + xhr.statusText + '' + errorThrown);
				mui.toast(xhr.readyState + '' + xhr.statusText + '**' + errorThrown);
				//TODO 此处可以向服务端告警  
			}
		});

	}, {
		passive: false
	});
});