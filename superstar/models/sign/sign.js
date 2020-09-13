mui.init();

var em=null,map=null,apoint;
var address;
// H5 plus事件处理
function plusReady(){
	// 确保DOM解析完成
	if(!em||!window.plus||map){return};
	map = new plus.maps.Map("map");
//	map.centerAndZoom( new plus.maps.Point(116.3977,39.906016), 12 );
	// 获取用户的当前位置信息
	map.getUserLocation( function ( state, point ){
		if( 0 == state ){
//			alert( JSON.stringify(point) );
			apoint=point;
		}else{
			alert( "Failed!" );
		}
	} );
}
if(window.plus){
	plusReady();
}else{
	document.addEventListener("plusready",plusReady,false);
}
// DOMContentloaded事件处理
document.addEventListener("DOMContentLoaded",function(){
	em=document.getElementById("address");
	plusReady();
},false);

// address事件处理
document.getElementById("address").addEventListener("tap",function(){
	//alert("我被点击了");
	plus.maps.Map.reverseGeocode(apoint,{},function(event){
		address = event.address;  // 转换后的地理位置
		var point = event.coord;  // 转换后的坐标信息
		var coordType = event.coordType;	// 转换后的坐标系类型
//		alert("Address:"+address);
		em.innerHTML=address;
		},function(e){
			alert("Failed:"+JSON.stringify(e));
	});
	
},false);

document.getElementById("sign-in").addEventListener("tap",function(){
	if(address == null){
		alert("签到失败!");
	}
	else
		alert("签到成功！");
	
},false);