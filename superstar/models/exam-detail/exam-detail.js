mui.init();

var html1 = '';
var item = document.getElementById('exam');
var title = document.getElementById('header-title');
var data = null;
var subject = '';
var scores = 0;

//添加newId自定义事件监听
window.addEventListener('exam-detail', function(event) {
	//获得事件参数
	var id = event.detail.id;
	console.log(id);
	//向服务端请求试卷内容
	mui.ajax({
		type: 'post',
		url: "http://192.168.0.115:8000/exam/startexam_interface/",
		data: {
			"eid": id,
			"sid": 10001,
		},
		async: true,
		dataType: "text",
		timeout: 15000, //15秒超时  
		success: function(data) {
			mui.toast('获取试卷内容成功!');
			console.log(data);
			data = JSON.parse(data);

			for(var i = 0; i < data.length; i++) {
				scores += data[i].fields.score;

				html1 += '<div class="title-body">' +
					'<label class="answer" hidden="hidden">' + data[i].fields.answer + '</label>' +
					'<div class="title-number">' + (i + 1) + '</div>' +
					'<div class="title-message">' +
					'<div class="title-title">' +
					'<h4 class="title-score">(</h4>' +
					'<h4 class="title-score">' + data[i].fields.score + '</h4>' +
					'<h4 class="title-score">分)</h4>' +
					'<h4 class="title-name">' + data[i].fields.title + '</h4>' +
					'</div>' +
					'<hr class="line"/>' +
					'<div class="mui-card">' +
					'<form class="mui-input-group">' +
					'<div class="mui-input-row mui-radio mui-left">' +
					'<label>' +
					'<p style="float: left;color: #000000;">A.</p>' +
					'<p class="" style="float: left;color: #000000;">' + data[i].fields.optionA + '</p>' +
					'</label>' +
					'<input name="radio1" type="radio" value="A">' +
					'</div>' +
					'<div class="mui-input-row mui-radio mui-left">' +
					'<label>' +
					'<p style="float: left;color: #000000;">B.</p>' +
					'<p class="" style="float: left;color: #000000;">' + data[i].fields.optionB + '</p>' +
					'</label>' +
					'<input name="radio1" type="radio" value="B">' +
					'</div>' +
					'<div class="mui-input-row mui-radio mui-left">' +
					'<label>' +
					'<p style="float: left;color: #000000;">C.</p>' +
					'<p class="" style="float: left;color: #000000;">' + data[i].fields.optionC + '</p>' +
					'</label>' +
					'<input name="radio1" type="radio" value="C">' +
					'</div>' +
					'<div class="mui-input-row mui-radio mui-left">' +
					'<label>' +
					'<p style="float: left;color: #000000;">D.</p>' +
					'<p class="" style="float: left;color: #000000;">' + data[i].fields.optionD + '</p>' +
					'</label>' +
					'<input name="radio1" type="radio" value="D">' +
					'</div>' +
					'</form>' +
					'</div>' +
					'</div>' +
					'<hr style="width: 100%;height: 1px;"/>' +
					'</div>';
			}

			//设置标题
			subject = data[0].fields.subject;
			title.querySelector(".mui-title").innerText = data[0].fields.subject;
			//设置总分
			item.querySelector(".massage-detail").innerText = '共' + data.length + '题，合计' + scores + '分';
			//加载课程信息
			item.querySelector(".title").innerHTML = html1;

		},
		error: function(xhr, type, errorThrown) {
			mui.toast('获取试卷内容失败!');
			// 请求失败
			console.log(type + '' + xhr.readyState + '' + xhr.statusText + '' + errorThrown);
			mui.toast(xhr.readyState + '' + xhr.statusText + '**' + errorThrown);
			//TODO 此处可以向服务端告警  
		}
	});

}, {
	passive: false
});

//计算总分数
function scoresAll() {
	var scoreAll = 0;
	var score = 0;
	var answer = '';
	var radioList = [];
	var options = ["A", "B", "C", "D"];
	var lists = document.getElementById("exam").getElementsByClassName("title-body");
	console.log(lists.length);
	for(var i = 0; i < lists.length; i++) {
		answer = lists[i].firstChild.innerText;
		console.log(answer);
		score = lists[i].childNodes[2].firstChild.childNodes[1].innerText;
		console.log(score);
		radioList = lists[i].getElementsByTagName("input");
		//console.log(radioList[0].value);
		for(var j = 0; j < 4; j++) {
			if(radioList[i].checked == true && radioList[i].value == answer) {
				scoreAll += parseInt(score);
			}
		}
	}
	console.log(scoreAll);
	
	var userinfo = JSON.parse(localStorage.getItem('$state'));
	//向服务端提交考试 得分
	mui.ajax({
			type:'post',  
	        url: "http://192.168.0.115:8000/exam/examgrade_interface/",
	        data: {
				"grade": scoreAll,
				"subject": subject,
				'sid': userinfo.userId,
			},
			async: true,
			dataType:"text",  
		success: function(data) {
			console.log(data);
			if(data == 'true'){
				var btnArray = ['确认'];
				mui.confirm('请点击确认！', '考试成绩提交成功!', btnArray, function(e) {
					//关闭考试页面
					plus.webview.getWebviewById("exam-detail").close();
					plus.webview.getWebviewById("exam").close();
					plus.webview.getWebviewById("examlist").reload(true);
					mui.openWindow({
						id: 'examlist'
					});
				})
			}	
			
		},
		error: function(xhr, type, errorThrown) {
			mui.alert('考试成绩提交失败!');
			// 请求失败
			console.log(type + '' + xhr.readyState + '' + xhr.statusText + '' + errorThrown);
			//mui.toast(xhr.readyState + '' + xhr.statusText + '**' + errorThrown);
			//TODO 此处可以向服务端告警  
		}
	});
}

//添加列表项的点击事件
mui('#header-title').on('tap', '.mui-icon.mui-icon-left-nav.mui-pull-left', function(e) {

	//弹出考试结束提示框
	var btnArray = ['否', '是'];
	mui.confirm('点击确认后，您将无法再作答。请检查无误后再点击确认！', '确认交卷', btnArray, function(e) {
		if(e.index == 1) {
			scoresAll();
		}
	})

}, {
	passive: false
});

document.getElementById("exam-button").addEventListener('tap', function() {

	//弹出考试结束提示框
	var btnArray = ['否', '是'];
	mui.confirm('点击确认后，您将无法再作答。请检查无误后再点击确认！', '确认交卷', btnArray, function(e) {
		if(e.index == 1) {
			scoresAll();
		}
	})
});

//var info = document.getElementById("info");
//document.querySelector('.mui-table-view.mui-table-view-radio').addEventListener('selected',function(e){
//	info.innerHTML = "当前选中的为："+e.detail.el.innerText;
//});