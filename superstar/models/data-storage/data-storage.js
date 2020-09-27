mui.init();
mui.plusReady(function() {
	//提交数据存储
	var editornameBox = JSON.parse(localStorage.getItem("$state")).account;
	var textareaBox = document.getElementById('textarea');
	var newgather_submitButton = document.getElementById("newgather_submit");
	var newgather_cancelButton = document.getElementById('newgather_cancel');
	document.getElementById("cancel_file").addEventListener('tap', function(e) {
		var obj = document.getElementById("file_up");
		obj.outerHTML = obj.outerHTML
	})
	document.getElementById("cancel_image").addEventListener('tap', function(e) {
		var obj = document.getElementById("image_up");
		obj.outerHTML = obj.outerHTML
	})

	newgather_submitButton.addEventListener('tap', function(event) {
		if(textareaBox.value == "") {
			plus.nativeUI.toast("请填写正文")
		} else if(editornameBox.value == "") {
			plus.nativeUI.toast("请登录后编辑")
		} else {
			//必须把下面两行代码放在这儿 如果放在刚开始不行
			var file = document.getElementById("file_up").files[0];
			var image = document.getElementById("image_up").files[0];
			var fileForm = new FormData($("#uploadFile")[0]);
			var imageForm = new FormData($("#uploadImage")[0]);

			$.ajax({
				type: "post",
				//				url: "http://192.168.0.115:8000/course/create-interface/",
				data: {
					"author": editornameBox,
					"body": textareaBox.value,
					"file": fileForm,
					"image": imageForm
				},
				async: true,
				dataType: "text",
				success: function(data) {
					//							plus.nativeUI.toast("服务器传回来的消息为:" +data);
					if(data == "ok") {
						//									wt.close("新建文章成功");
						plus.nativeUI.toast("新建文章成功");
						mui.back();

					} else {
						plus.nativeUI.toast("新建文章失败");
					}
				},
				error: function() {
					plus.nativeUI.toast("请求服务器出现失败!");
				}
			});

		}
	});

	newgather_cancelButton.addEventListener('tap', function(event) {
		mui.back();
	})

});