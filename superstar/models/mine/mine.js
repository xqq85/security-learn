mui.init();

mui.plusReady(function () {
	var state = JSON.parse(localStorage.getItem('$state'));
	var item1 = document.getElementById('name');
	var item2 = document.getElementById('sex');
	var item3 = document.getElementById('phone');
	//var item4 = document.getElementById('work');
	var item5 = document.getElementById('account');
	item1.querySelector('.list-name').innerHTML = '张三';
	item2.querySelector('.list-gender').innerHTML = '男';
	item3.querySelector('.list-phone').innerHTML = '11111111111';
	//item4.querySelector('.work-unit').innerHTML = '南京航空航天大学';
	//item4.querySelector('.work-number').innerHTML = '学号/工号：00000000';
	item5.querySelector('.list-account').innerHTML = state.account;
	
//	mui.ajax({
//		type: "post",
//		url: "",
//		data:{
//			'username':usernameValue
//		},
////		headers:{
////			'X-LC-Id':'mNnRtrMEnRCDlvIrl5oPPf0c-gzGzoHsz',
////			'X-LC-Key':'yGu8O62lHAOPjQWYNP99L0gy',
////			'Content-Type': 'application/json'
////		},
//		async: true,		//后台传过来的数据类型
//		dataType: 'text',
//		//	如果校验成功，跳转界面到主页
//		success: function(resp){
//			mui.toast("获取个人信息成功！");
//			var item1 = document.getElementById('name');
//			var item2 = document.getElementById('sex');
//			var item3 = document.getElementById('phone');
//			var item4 = document.getElementById('work');
//			item1.querySelector('.list-name').innerHTML = resp.username;
//			item2.querySelector('.list-gender').innerHTML = resp.gender;
//			item3.querySelector('.llist-phone').innerHTML = resp.phone;
//			item4.querySelector('.work-unit').innerHTML = resp.workunit;
//			item4.querySelector('.work-number').innerHTML = resp.worknumber;
//		},
//		//	如果校验失败，提示密码错误
//		error: function(error){
//			mui.toast('个人信息获取失败！');
//		}
//	});
});


var loginWv;
mui.later(function(){
	//获取到登录界面的Wv
	loginWv=plus.webview.getLaunchWebview();
},1000);

mui('body').on('tap', '.mui-popover-action li>a', function() {
	var a = this,
		parent;
	//根据点击按钮，反推当前是哪个actionsheet
	for (parent = a.parentNode; parent != document.body; parent = parent.parentNode) {
		if (parent.classList.contains('mui-popover-action')) {
			break;
		}
	}
	//关闭actionsheet'#' + parent.id
	mui('#' + parent.id).popover('toggle');
//	alert( "你刚点击了\"" + a.id + "\"按钮");
	if(a.id==='loginout'){
		
		
		//清空一下本地的用户数据
		localStorage.removeItem('$state');
		localStorage.removeItem('$settings');
		
		//退出,显示登录界面
		loginWv.show();
		//关闭主界面，由于mian这个主界面和message，address-book，discover,mine
		//是父子界面关系，所以只要关闭了main，其他4个子界面会跟随关闭
		plus.webview.close('main','none');
		plus.webview.close('account','none');
	}
})