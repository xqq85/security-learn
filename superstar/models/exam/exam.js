mui.init();

var exam = document.getElementById('examId');
var examDetailPage = null;
var id = 0;
var data = null;
mui.plusReady(function(){
			
	//添加newId自定义事件监听
	window.addEventListener('examDetail',function(event){
		//获得事件参数
		var id = event.detail.id;
		console.log(id);
		//向服务端请求考试信息
	    mui.ajax({ 
	        type:'post',  
	        url: "http://192.168.0.115:8000/exam/index_interface/",
	        data: {
				"eid": id,
			},
			async: true,
			dataType:"text",  
	        success: function(data) {
	        	mui.toast('获取考试信息成功!'); 
	        	console.log(data);
	        	data = JSON.parse(data);
				
				//加载工号/姓名/考试题目/考试时间
				exam.querySelector('.work-number').innerHTML = JSON.parse(localStorage.getItem('$state')).account;
				exam.querySelector('.work-name').innerHTML = '张三';
				exam.querySelector('.exam-name').innerHTML = data[0].fields.subject;
				exam.querySelector('.exam-name').setAttribute("id", data[0].pk);
				exam.querySelector('.exam-time').innerHTML = data[0].fields.examtime;
				
				
				//判断是否有分数
				if(true){
					exam.querySelector('.exam-scores').innerHTML = '<img class="image" src="../../images/learn.png"/>'+
					'<div class="exam-detail-message">'+
						'<h5 class="name">考试成绩/SCORES</h5>'+
						'<h5 class="number">99</h5>'+
						'<hr class="line" />'+
					'</div>';
				}else{
					exam.querySelector('.exam-scores').innerHTML = null;
				}
			  	
	        },  
	        error: function(xhr, type, errorThrown) {  
	            mui.toast('获取考试信息失败!');  
	            // 请求失败
				console.log(type + '' + xhr.readyState + '' + xhr.statusText + '' + errorThrown);
				mui.toast(xhr.readyState + '' + xhr.statusText + '**' + errorThrown);
	            //TODO 此处可以向服务端告警  
	        }  
	    }); 
    	
	}, { passive: false });
	
	   
	//初始化试卷详情页面
	mui.preload({
		id:'exam-detail',
		url:'../exam-detail/exam-detail.html', 
	});
	//获得试卷详情页面
	if(!examDetailPage) {
		examDetailPage = plus.webview.getWebviewById('exam-detail');
	}
	    
});

document.getElementById('exam-button').addEventListener('tap',function () {
	
	var id = exam.querySelector('.exam-name').getAttribute("id");
	//alert(id);
	//触发试卷页面的newsId事件
	mui.fire(examDetailPage, 'exam-detail', {
		id:id
	});
	//打开试卷页面          
	mui.openWindow({
		id: 'exam-detail'
	});
});