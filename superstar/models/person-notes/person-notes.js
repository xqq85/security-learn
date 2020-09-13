mui.init();

var notebookPage = null;
mui.plusReady(function () {
	mui(".mui-bar").on('tap','.complete',function(){
		var titleInput=document.querySelector('input[name="title"]').value;
		var textInput=document.querySelector('textarea[name="text"]').value;
		
		//获得笔记页面
		if(!notebookPage){
		    notebookPage = plus.webview.getWebviewById('notebook');
		}
		//触发详情页面的notebook-text事件
		mui.fire(notebookPage,'notebook-text',{
		    titleInput:titleInput,
		    textInput:textInput
		});
	
		plus.webview.close('person-notes','none');
	});
});