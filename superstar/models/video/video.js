mui.init();

var videourl;
var video = null;
		
//添加newId自定义事件监听
window.addEventListener('videoDetailId',function(event){
	//获得事件参数
	videourl = event.detail.url_address;
	var video_name = event.detail.video_name;
	//alert(video_name);
	var title = document.getElementById('video_name');
	title.querySelector('.mui-title').innerHTML = video_name;
	//alert(videourl);
}, { passive: false });
		
mui.plusReady(function(){
//			// 获得传过来的视频地址参数
//			var videourl = plus.webview.currentwebview().videourl;
//			// 动态渲染整个video标签
//			document.getElementById("video").innerHTML = '<video controls="" autoplay="" name="media" width="100%"><source src="'+videourl+'" type="video/mp4"></video>';
			
			
//			var Intent = plus.android.importClass("android.content.Intent");  
//			var Uri = plus.android.importClass("android.net.Uri");  
//			var main = plus.android.runtimeMainActivity();  
//			var intent=new Intent(Intent.ACTION_VIEW);  
//			var uri=Uri.parse("http://vfx.mtime.cn/Video/2019/03/19/mp4/190319212559089721.mp4");//视频地址
//			intent.setDataAndType(uri,"video/* ");  
//			main.startActivity(intent);
			 //创建视频播放控件
//			if(!video){
//				video = plus.video.VideoPlayer('video', {
//					src:videourl,
//					position: 'static'
//				});
//			}
			if(!video){
				video = plus.video.createVideoPlayer('videoplayer', {
					src:videourl,
					top:'44px',
					left:'0px',
					width: '100%',
					height: '250px',
					position: 'static'
				});
				plus.webview.currentWebview().append(video);
			}
});

//关闭视频点击事件
document.getElementById('video_back').addEventListener('tap', function(e) {
	//alert("我被点击了");
	video.close();
});