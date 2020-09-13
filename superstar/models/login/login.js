//初始化mui框架
mui.init();

//用户输入账号密码
//用户点击登录按钮
//捕获用户点击登录按钮的事件
document.getElementById('login').addEventListener('tap',function () {
	//alert('我被触发了');
	//获取到账号和密码的文本框对象
	var usernameInput=document.querySelector('input[name="username"]');
	var passwordInput=document.querySelector('input[name="password"]');
	//获取到用户输入的账号密码
	var usernameValue=usernameInput.value;
	var passwordValue=passwordInput.value;
	console.info("账号是:",usernameValue,"   密码是：",passwordValue);
	if(!usernameValue||!passwordValue){
		mui.toast('用户名或密码不能为空');
		return;
	}
	
//	if(usernameValue==='admin'&&passwordValue==='123456'){
//		console.info('登录成功,开始跳转页面');
//		mui.openWindow('../main/main.html','main');
//	}else{
//		mui.toast('用户名或密码错误!请重新输入!');
//	};

	mui.ajax({
		type: "post",
		url: "https://leancloud.cn:443/1.1/login",
		//url: "http://116.62.17.125:8989/ClothesStore/userslogin",
		data:{
			'username':usernameValue,//admin
			'password':passwordValue//123456
		},
		headers:{
			'X-LC-Id':'mNnRtrMEnRCDlvIrl5oPPf0c-gzGzoHsz',
			'X-LC-Key':'yGu8O62lHAOPjQWYNP99L0gy',
			'Content-Type': 'application/json'
		},
		async: true,		//后台传过来的数据类型
		dataType: 'text',
		//	如果校验成功，跳转界面到主页
		success: function(resp){
			localStorage.setItem('sessionToken',resp.sessionToken);
			localStorage.setItem('username',resp.username);
			mui.toast("登录成功！");
			mui.later(function(){
				mui.openWindow('../main/main.html','main');
			},1500);
			
		},
		//	如果校验失败，提示密码错误
		error: function(error){
			mui.toast('网络未连接或服务器请求失败！');
		}
	});
});
