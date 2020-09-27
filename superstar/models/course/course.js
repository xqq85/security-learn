mui.init();

var courseDetailPage = null;
mui.plusReady(function() {

	//初始化预加载详情页面
	mui.preload({
		id: 'chapter-detail',
		url: '../chapter-detail/chapter-detail.html',
	});
	//获得详情页面
	if(!courseDetailPage) {
		courseDetailPage = plus.webview.getWebviewById('chapter-detail');
	}
});
//添加列表项的点击事件
mui('#course_list').on('tap', '.mui-table-view-cell', function(e) {

	var id = this.getAttribute('id');
	//console.log(id);
	//alert("我被点击了"+id);

	//触发详情页面的newsId事件
	mui.fire(courseDetailPage, 'chapterDetail', {
		id: id
	});
	//打开详情页面          
	mui.openWindow({
		id: 'chapter-detail'
	});
}, {
	passive: false
});

//添加弹出框的点击事件
mui('#topPopover').on('tap', 'a', function(e) {
	var id = this.getAttribute('id');
	//alert("我被点击了"+id);

	//关闭顶部弹出框
	mui('#topPopover').popover('toggle');
	
	if(id == "001") {
		//打开数据存储页面  
		mui.openWindow({
			url: '../data-storage/data-storage.html',
			id: 'data-storage'
		});
	} else if(id == "002") {
		//打开写文章页面  
		mui.openWindow({
			url: '../post-course/post-course.html',
			id: 'post-course'
		});
	} else if(id == "003") {
		//打开签到页面  
		mui.openWindow({
			url: '../sign/sign.html',
			id: 'sign'
		});
	}

}, {
	passive: false
});

mui('.mui-scroll-wrapper').scroll();
mui('body').on('shown', '.mui-popover', function(e) {
	//console.log('shown', e.detail.id);//detail为当前popover元素
});
mui('body').on('hidden', '.mui-popover', function(e) {
	//console.log('hidden', e.detail.id);//detail为当前popover元素
});