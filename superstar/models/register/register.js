mui.init();

mui.ready(function(){
	document.getElementById('register').addEventListener('tap', function(){
		//获取到姓名、手机号、密码和邮箱的文本框对象
		var usernameInput = document.querySelector('input[name="username"]');
		var phoneInput = document.querySelector('input[name="phone"]');
		var passwordInput = document.querySelector('input[name="password"]');
		var emailInput = document.querySelector('input[name="email"]'); 
		//获取到用户输入的账号密码
		var usernameValue = usernameInput.value;
		var phoneValue = phoneInput.value;
		var passwordValue = passwordInput.value;
		var emailValue = emailInput.value;
		//alert(usernameValue+phoneValue+passwordValue+emailValue);
		if(!usernameValue || !passwordValue || !usernameValue) {
			mui.toast('用户名、手机号或密码不能为空');
			return;
		}

		mui.ajax({
			type: "post",
			url: "https://leancloud.cn:443/1.1/users",
			data:{
				'username': usernameValue,
				'password': passwordValue,
				'phone': phoneValue,
				'email': emailValue
			},
			headers:{
				'X-LC-Id': 'mNnRtrMEnRCDlvIrl5oPPf0c-gzGzoHsz',
				'X-LC-Key': 'yGu8O62lHAOPjQWYNP99L0gy',
				'Content-Type': 'application/json'
			},
			async: true, //后台传过来的数据类型
			dataType: 'text',
			//	校验成功
			success: function(resp){
				//localStorage.setItem('sessionToken', resp.sessionToken);
				mui.toast("注册成功！");
				mui.openWindow('../login/login.html', 'login');
			},
			//	校验失败
			error: function(error){
				mui.toast('注册失败！');
			}
		});
	});
});