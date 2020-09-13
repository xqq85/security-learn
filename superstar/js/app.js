/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.account.length < 5) {
			return callback('账号最短为 5 个字符');
		}
		if (loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}
		mui.ajax({
			type: "post",
			url: "http://192.168.0.115:8000/userprofile/login-interface/",
			//url: "http://116.62.17.125:8989/ClothesStore/userslogin",
			data:{
				'username':loginInfo.account,
				'password':loginInfo.password
			},
//			headers:{
//				'X-LC-Id':'mNnRtrMEnRCDlvIrl5oPPf0c-gzGzoHsz',
//				'X-LC-Key':'yGu8O62lHAOPjQWYNP99L0gy',
//				'Content-Type': 'application/json'
//			},
			async: true,		//后台传过来的数据类型
			dataType: 'text',
			//	如果校验成功，跳转界面到主页
			success: function(resp){
				//alert("密码校验成功！")
				if(resp == 'error'){
					return callback('用户名或密码错误！');
				}else{
					console.log(resp);
					var category_id = JSON.parse(JSON.parse(resp)).fields.category_id;
					var userId = JSON.parse(JSON.parse(resp)).pk;
					return owner.createState(loginInfo.account, category_id, userId, callback);
				}
				
			},
			//	如果校验失败，提示密码错误
			error: function(error){
				mui.toast('网络未连接或服务器请求失败！');
				//return callback('用户名或密码错误!');
			}
		});

//		var users = JSON.parse(localStorage.getItem('$users') || '[]');
//		var authed = users.some(function(user) {
//			return loginInfo.account == user.account && loginInfo.password == user.password;
//		});
//		if (authed) {
//			return owner.createState(loginInfo.account, callback);
//		} else {
//			return callback('用户名或密码错误');
//		}
	};

	owner.createState = function(account, category_id, userId, callback) {
		var state = owner.getState();
		state.account = account;
		state.category_id = category_id;
		state.userId = userId;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	}

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if (regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		
		mui.ajax({
			type: "post",
			url: "https://leancloud.cn:443/1.1/users",
			data:{
				'username': regInfo.account,
				'password': regInfo.password,
				'email': regInfo.email
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
				//mui.toast("注册成功！");
			},
			//	校验失败
			error: function(error){
				return callback('注册失败！');
			}
		});
//		var users = JSON.parse(localStorage.getItem('$users') || '[]');
//		users.push(regInfo);
//		localStorage.setItem('$users', JSON.stringify(users));
//		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		}
		/**
		 * 获取本地是否安装客户端
		 **/
	owner.isInstalled = function(id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));