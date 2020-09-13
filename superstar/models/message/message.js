mui.init();
			
mui('body').on('shown', '.mui-popover', function(e) {
	//alert(e.detail.id);//detail为当前popover元素
});
mui('body').on('hidden', '.mui-popover', function(e) {
	//alert(e.detail.id);//detail为当前popover元素
});