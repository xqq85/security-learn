window.ptLogin=function(){document.domain="qq.com";var ifram_src_param="",ptlogin_iframe=null,ptlogin_shadow=null,queueObj={login:{arrKeys:[],queue:{}},logout:{arrKeys:[],queue:{}}},callbackObj={},isLoadedLogoutJs=false,ajaxDataMsg={login:{},logout:-1},isLogin=false,T={getTopHeight:function(){return document.body.scrollTop+(window.innerHeight>270?(window.innerHeight-270)/2:0)},showLoginBox:function(){ptlogin_shadow.style.cssText+="display:block;width:100%;height:100%;";ptlogin_iframe.style.cssText+="transition: 0;";ptlogin_iframe.style.cssText+="top:"+T.getTopHeight()+"px;";ptlogin_iframe.style.cssText+="display:block; visibility:hidden;opacity: 0;transition: opacity 200ms;";setTimeout(function(){ptlogin_iframe.style.cssText+="opacity:1;visibility:visible;"},200)},closeLoginBox:function(){ptlogin_shadow.style.display="none";ptlogin_iframe.style.display="none"},addQueueFunc:function(e,t){var n,r,i=t.toString();if(!(e=="login"||e=="logout")){return}n=queueObj[e].queue;r=queueObj[e].arrKeys;if(!n[i]||this.getIndexInArray(i,r)==-1){r.push(i);n[i]=t}},removeQueueFunc:function(e,t){var n,r,i=t.toString();if(!(e=="login"||e=="logout")){return}n=queueObj[e].queue;r=queueObj[e].arrKeys;r.splice(this.getIndexInArray(i,r),1);delete n[i]},doQueueFunc:function(e,t,n){var r,i;if(!(e=="login"||e=="logout")){return}isLogin=e=="login"?true:false;ajaxDataMsg[e]=t;r=queueObj[e].queue;i=queueObj[e].arrKeys;for(var s=0,o=i.length;s<o;s++){r[i[s]](t)}var u=callbackObj[n];n&&u&&u(t)},getAjaxData:function(e){if(!(e=="login"||e=="logout")){return""}return ajaxDataMsg[e]},getIndexInArray:function(e,t){if(t.indexOf){return t.indexOf(e)}for(var n=0,r=t.length;n<r;n++){if(t[n]===e){return n}}return-1},objToStr:function(e,t){var n="",r,i;for(r in e){if(typeof e[r]==="undefined"){continue}i=t?encodeURIComponent(e[r]):e[r];n+=r+"="+i+"&"}return n.slice(0,n.length-1)},getScript:function(e,t,n){var r=document.createElement("script");r.language="javascript";r.type="text/javascript";n&&(r.charset=n);r.onload=r.onreadystatechange=function(){if(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"){t&&t();r.onload=r.onreadystatechange=null;r.parentNode.removeChild(r)}};r.src=e;document.getElementsByTagName("head")[0].appendChild(r)},randomString:function(e){var t="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");if(!e){e=Math.floor(Math.random()*t.length)}var n="";for(var r=0;r<e;r++){n+=t[Math.floor(Math.random()*t.length)]}return n},set_iframe_src:function(e){var t=encodeURIComponent(e);var n="http://ui.ptlogin2.qq.com";var r=n+"/cgi-bin/login?"+"style=38&"+"appid=728041403&"+"s_url="+t+"&"+"target=self&"+"low_login=1&"+"low_login_hour=4321&"+"daid="+(location.host.indexOf("3g.qq.com")>-1?261:287)+ifram_src_param;ptlogin_iframe.setAttribute("src",r)}};document.body.appendChild(function(proxy_url){var fragment=document.createDocumentFragment();var hidden_iframe=document.createElement("iframe");hidden_iframe.id="ptlogin_iframe";hidden_iframe.setAttribute("frameborder","0");hidden_iframe.setAttribute("scrolling","no");hidden_iframe.style.cssText="display:none;z-index:9999;position:absolute;left:50%;top:50%;margin:0px 0 0 -140px;height:270px;width:280px;background:transparent;";var shadow_div=document.createElement("div");shadow_div.id="ptlogin_shadow";shadow_div.style.cssText+="display:none;z-index:9998;position:fixed;top:0;left:0;width:100%;height:100%;background:#000;opacity:0.7;";fragment.appendChild(hidden_iframe);fragment.appendChild(shadow_div);ptlogin_iframe=hidden_iframe;ptlogin_shadow=shadow_div;window.addEventListener("message",function(event){if(event.data=="jqm-asap"){return}if(event.origin.indexOf("3g.qq.com")>-1){var data=eval("("+event.data+")"),args=data.JSP||{},callback=data.callback||"";if(data.action=="login"){T.closeLoginBox();T.doQueueFunc("login",args,callback)}}else if(event.origin.indexOf("ui.ptlogin2.qq.com")>-1){var data=eval("("+event.data+")");if(data.action=="close"){T.closeLoginBox()}}},true);window.addEventListener("orientationchange",function(){if(ptlogin_iframe.style.display=="none"){return}ptlogin_iframe.style.cssText+="top:"+T.getTopHeight()+"px;";setTimeout(function(){ptlogin_iframe.style.cssText+="top:"+T.getTopHeight()+"px;"},500)},false);return fragment}());return{init:function(e){var t=T.objToStr(e);ifram_src_param=!t?"":"&"+t;e&&e.isLogin&&(isLogin=true)},getData:function(e){return T.getAjaxData(e)},isLogin:function(){return isLogin},bind:function(e,t){T.addQueueFunc(e,t)},login:function(e){var e=typeof e=="function"?e:function(){},t=T.randomString(10)+Date.now();callbackObj[t]=e;T.set_iframe_src("http://infoapp.3g.qq.com/g/login/proxy.jsp?sourceUrl="+encodeURIComponent(location.href)+"&callback="+t);T.showLoginBox()},logout:function(e){var t=function(){pt_logout.logout(function(t){T.doQueueFunc("logout",t);e&&e(t)})};if(isLoadedLogoutJs){t()}else{T.getScript("http://imgcache.qq.com/ptlogin/ac/v9/js/ptloginout.js",function(){isLoadedLogoutJs=true;t()},"utf-8")}}}}();typeof window.define=="function"&&window.define("ptLogin",[],function(){return ptLogin});