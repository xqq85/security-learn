mui.init({
	swipeBack: false
});
var chapterDetailPage = null;
var videoDetailPage = null;
var id;
var html1 = '<ul class="mui-table-view mui-table-view-chevron"><li class="mui-table-view-cell mui-media"><a class="mui-navigate-right"><img class="mui-media-object mui-pull-left" src="../../img/learn.png"><div class="mui-media-body">CBD<p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p></div></a></li></ul>';
var html3 = '<ul class="mui-table-view mui-table-view-chevron"><li class="mui-table-view-cell mui-media"><a class="mui-navigate-right"><img class="mui-media-object mui-pull-left" src="../../img/book.png"><div class="mui-media-body">幸福<p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p></div></a></li></ul>';
	
mui.plusReady(function(){
	//初始化章节详情页面
	mui.preload(
		{
			id:'chapter-detail',
			url:'../chapter-detail/chapter-detail.html'
		}
	);
	//获得详情页面
	if(!chapterDetailPage) {
		chapterDetailPage = plus.webview.getWebviewById('chapter-detail');
	}
});

//添加newId自定义事件监听
window.addEventListener('courseDetailId',function(event){
	//获得事件参数
	id = event.detail.id;
	var course_name = event.detail.course_name;
	//alert("详情页:"+course_name);
	//document.getElementById("course-name").innerHTML = id;
	var title = document.getElementById('course_name');
	title.querySelector('.mui-title').innerHTML = course_name;
	
//	var html2 = '<ul class="mui-table-view"><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li><li class="mui-table-view-cell">第一个选项卡子项</li></ul>';
//	var item2 = document.getElementById('item2mobile');
//	item2.querySelector('.mui-scroll').innerHTML = html2;

			
//	//向服务端请求课程详情内容  
//  mui.ajax('' + id, {  
//      type:'GET',  
//      dataType: 'json', //服务器返回json格式数据  
//      timeout: 15000, //15秒超时  
//      success: function(rsp) {  
//          vm.content = rsp.content;  
//          var html1 = '<ul class="mui-table-view mui-table-view-chevron"><li class="mui-table-view-cell mui-media"><a class="mui-navigate-right"><img class="mui-media-object mui-pull-left" src="../../img/learn.png"><div class="mui-media-body">CBD<p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p></div></a></li></ul>';
//			var html3 = '<ul class="mui-table-view mui-table-view-chevron"><li class="mui-table-view-cell mui-media"><a class="mui-navigate-right"><img class="mui-media-object mui-pull-left" src="../../img/book.png"><div class="mui-media-body">幸福<p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p></div></a></li></ul>';
//
//      },  
//      error: function(xhr, type, errorThrown) {  
//          mui.toast('获取文章内容失败');  
//          //TODO 此处可以向服务端告警  
//      }  
//  });  


}, { passive: false });


(function($) {
		$('.mui-scroll-wrapper').scroll({
			indicators: true //是否显示滚动条
		});
		var item1 = document.getElementById('item1mobile');
		var item3 = document.getElementById('item3mobile');
		document.getElementById('slider').addEventListener('slide', function(e) {
			if (e.detail.slideNumber === 1) {
				if (item1.querySelector('.mui-loading')) {
					setTimeout(function() {
						item1.querySelector('.mui-scroll').innerHTML = html1;
					}, 500);
				}
			} else if (e.detail.slideNumber === 2) {
				if (item3.querySelector('.mui-loading')) {
					setTimeout(function() {
						item3.querySelector('.mui-scroll').innerHTML = html3;
					}, 500);
				}
			}
		});
		var sliderSegmentedControl = document.getElementById('sliderSegmentedControl');
		$('.mui-input-group').on('change', 'input', function() {
			if (this.checked) {
				sliderSegmentedControl.className = 'mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-segmented-control-' + this.value;
				//force repaint
				sliderProgressBar.setAttribute('style', sliderProgressBar.getAttribute('style'));
			}
		});
})(mui);


//添加章节内容的点击事件
mui('.chapter-detail').on('tap', '.mui-table-view-cell', function(e) {
	
	var chapter_name = this.innerHTML;
	var id = this.getAttribute('id');
	
	if(id == 1){
		
		var styles = {hardwareAccelerated:true}; // true表示开启Webview的硬件加速，false表示关闭Webview的邮件加速  
		var webview = plus.webview.create( "../video/video.html", "video-detail", styles );    
		//获得video页面
		videoDetailPage = plus.webview.getWebviewById('video-detail');
		//触发video页面的newsId事件
		mui.fire(videoDetailPage, 'videoDetailId', {
			video_name:chapter_name,
			url_address:'http://vfx.mtime.cn/Video/2019/03/19/mp4/190319212559089721.mp4'
		});
		plus.webview.show(webview); // 显示窗口
		}
	else{
		//触发详情页面的newsId事件
		mui.fire(chapterDetailPage, 'chapterDetailId', {
			id:id,	
			chapter_name:chapter_name
		});
		//打开详情页面          
		mui.openWindow({
			id: 'chapter-detail'
		});
	}

}, { passive: false });

