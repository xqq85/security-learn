mui.init();

html1 = '';
var data = null;
var assemble = document.getElementById("assemble");
var examMessage = document.getElementById("exam-message");
mui.plusReady(function(){
		//向服务端请求组卷信息
	    mui.ajax({ 
	        type:'post',  
	        url: "http://192.168.0.115:8000/exam/questiontable_interface/",
			async: true,
			dataType:"text",  
	        success: function(data) {
	        	//mui.toast('获取组卷信息成功!'); 
	        	console.log(data);
	        	data = JSON.parse(data);
				for(var i = 0; i < data.length; i++) {
					var div = document.createElement("div");
					div.setAttribute("class", "subject mui-input-row mui-checkbox mui-left");
					div.setAttribute('id', data[i].pk);
					div.innerHTML = '<label class="theme">'+data[i].fields.subject+'</label>'+
									'<label class="theme">'+data[i].fields.title+'</label>'+
									'<input name="checkbox" value="Item2" type="checkbox">';
					assemble.appendChild(div);
				}
			  	
	        },  
	        error: function(xhr, type, errorThrown) {  
	            mui.toast('获取组卷信息失败!');  
	            // 请求失败
				console.log(type + '' + xhr.readyState + '' + xhr.statusText + '' + errorThrown);
				//mui.toast(xhr.readyState + '' + xhr.statusText + '**' + errorThrown);
	            //TODO 此处可以向服务端告警  
	        }  
	    }); 
});


//添加组卷按钮点击事件
document.getElementById('button1').addEventListener('tap',function () {
	var time = examMessage.querySelector('.time').value;
	console.log(time);
	var title = examMessage.querySelector('.title').value;
	console.log(title);
	if(time == '' || title == ''){
		alert('试卷主题或考试时间不能为空！');
		return;
	}
	
	var lists = document.getElementsByClassName('subject');
	console.log(lists.length);
	var id = -1;
	var idList = [];
	for(var i = 0; i < lists.length; i++) {
		if(lists[i].lastChild.checked){
			//alert("11");
			id = lists[i].id;
			console.log(id);
			idList.push(id);
		}
	}
	
	console.log(idList);
	if(idList.length <= 0){
		alert('请至少选择10道题！');
		return;
	}
	
	//向服务端请求组卷信息
	mui.ajax({ 
	    type:'post',  
	    url: "http://192.168.0.115:8000/exam/combinepaper_interface/",
	    data:{
	    	'exam_time':time,
	    	'subject':title,
	    	'question_list':idList,
	    	'account': JSON.parse(localStorage.getItem('$state')).account,
	    },
		async: true,
		dataType:"text",  
	    success: function(data) {
	        if(data == 'true'){
	        	var btnArray = ['确认'];
	        	mui.confirm('请点击确认！', '组卷提交成功!', btnArray, function(e) {
					//重新加载组卷页面
					plus.webview.getWebviewById("assemble").reload(true);
				})
	        }
	    },  
	    error: function(xhr, type, errorThrown) {  
	        mui.toast('组卷失败!');  
	        // 请求失败
			console.log(type + '' + xhr.readyState + '' + xhr.statusText + '' + errorThrown);
			//mui.toast(xhr.readyState + '' + xhr.statusText + '**' + errorThrown);
	        //TODO 此处可以向服务端告警  
	    }  
	}); 
	    
});

