mui.init();

mui.plusReady(function() {
	var id;
	var title = document.getElementById('course_title');
	var course = document.getElementById('course');
	var comment = document.body.querySelector('#thumb-up');
	var comment1 = [];
	//添加newId自定义事件监听
	window.addEventListener('chapterDetail', function(event) {
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
				//判断是否有视频URL
				if(data.fields.url != '0') {
					course.querySelector('.video').innerHTML = '<video width="100%" height="250px" controls>' +
						'<source src="' + data.fields.url + '" type="video/mp4"></source>' +
						'</video>';
				} else {
					document.getElementById('course_message_id').classList.add('course_margin_top');
					course.querySelector('.video').innerHTML = null;
				}

				//加载标题/作者/详细内容
				title.querySelector('.mui-title').innerHTML = data.fields.title;
				course.querySelector('.author_name').innerHTML = data.fields.author;
				course.querySelector('.course_message').innerHTML = data.fields.body;
				comment.innerHTML = '';
				//加载评论
				for(var i = 0; i < comment1.length; i++) {
					var li = document.createElement('li');
					li.setAttribute("class", 'mui-table-view-cell mui-media');
					//li.className = 'mui-table-view-cell';
					li.innerHTML = '<a class="thumb ">' +
						'<span class="mui-icon-extra mui-icon-extra-like" style="float: left;position:relative;left: 30px;"></span>' +
						'<h5 style="position: relative;left: 50px;">0</h5>' +
						'</a>' +
						'<img class="mui-media-object mui-pull-left" src="../../images/remind.png">' +
						'<div class="mui-media-body">' +
						'<h4 class="comment-name">' + comment1[i].fields.username + '</h4>' +
						'<h6 class="comment-time">' + comment1[i].fields.created + '</h6>' +
						'</div>' +
						'<p class="comment-message">' + comment1[i].fields.body + '</p>';
					comment.insertBefore(li, comment.firstChild);
				}

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

	//评论提交
	mui('#bottomPopover').on('tap', '#comment-button', function(e) {
		//alert('123');
		var text = document.getElementById('text-input').value;
		var myDate = new Date();
		var time = myDate.toLocaleString();
		var user_info = JSON.parse(localStorage.getItem('$state'));
		var name = user_info.account;
		alert(name);
		if(text == null) {
			alert('评论不能为空！');
			return;
		}

		//alert(id);
		//向服务端发送评论内容
		mui.ajax({
			type: 'post',
			url: "http://192.168.0.115:8000/comment_app/comment_interface/" + id + '/',
			data: {
				"name": name,
				'text': text,
			},
			async: true,
			dataType: "text",
			timeout: 15000, //15秒超时 
			success: function(data) {
				var li = document.createElement('li');
				li.setAttribute("class", 'mui-table-view-cell mui-media');
				//li.className = 'mui-table-view-cell';
				li.innerHTML = '<a class="thumb ">' +
					'<span class="mui-icon-extra mui-icon-extra-like" style="float: left;"></span>' +
					'<h5 style="position: relative;left: 20px;">0</h5>' +
					'</a>' +
					'<img class="mui-media-object mui-pull-left" src="../../images/remind.png">' +
					'<div class="mui-media-body">' +
					'<h4 class="comment-name">' + name + '</h4>' +
					'<h6 class="comment-time">' + time + '</h6>' +
					'</div>' +
					'<p class="comment-message">' + text + '</p>';
				comment.insertBefore(li, comment.firstChild);
				document.getElementById('text-input').value = '';
				mui('#bottomPopover').popover('toggle');
				mui.toast('评论成功!');
				console.log(data);
			},
			error: function(xhr, type, errorThrown) {
				mui.toast('评论失败!');
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

//点赞
mui('#thumb-up').on('tap', '.thumb', function(e) {
	if(this.className.split(' ').indexOf('active') != -1) {
		//alert('移除激活');
		this.classList.remove("active");
	} else {
		//alert('添加激活');
		this.classList.add("active");
	}
});