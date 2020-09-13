mui.init();

mui.ready(function () {
	document.getElementById('account').addEventListener('tap',function () {
		mui.openWindow({
			url:'../account/account.html',
			id:'account'
		});
	});
});