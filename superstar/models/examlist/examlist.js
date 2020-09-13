mui.init();

var html1 = '';
var item = document.getElementById('exam_list');
var examDetailPage = null;
var data = null;
mui.plusReady(function(){
	
	//初始化预考试详情页面
	mui.preload({
		id:'exam',
		url:'../exam/exam.html', 
	});
	//获得考试详情页面
	if(!examDetailPage) {
		examDetailPage = plus.webview.getWebviewById('exam');
	}
});
//添加列表项的点击事件
mui('#exam_list').on('tap', '.mui-table-view-cell', function(e) {
	
	var id = this.getAttribute('id');
	//console.log(id);
	//alert("我被点击了"+id);
		
	//触发考试详情页面的newsId事件
	mui.fire(examDetailPage, 'examDetail', {
		id:id
	});
	//打开考试详情页面          
	mui.openWindow({
		id: 'exam'
	});
}, { passive: false });


//添加组卷按钮点击事件
document.getElementById('menu').addEventListener('tap',function () {
	//打开组卷页面          
	mui.openWindow({
		url:'../paper/paper.html',
		id: 'assemble'
	});
});


