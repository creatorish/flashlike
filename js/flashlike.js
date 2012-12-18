/**
* DD_belatedPNG: Adds IE6 support: PNG images for CSS background-image and HTML <IMG/>.
* Author: Drew Diller
* Email: drew.diller@gmail.com
* URL: http://www.dillerdesign.com/experiment/DD_belatedPNG/
* Version: 0.0.8a
* Licensed under the MIT License: http://dillerdesign.com/experiment/DD_belatedPNG/#license
*
* Example usage:
* DD_belatedPNG.fix('.png_bg'); // argument is a CSS selector
* DD_belatedPNG.fixPng( someNode ); // argument is an HTMLDomElement
**/
if(jQuery.browser.msie && (parseInt(jQuery.browser.version) == 6 || parseInt(jQuery.browser.version) == 7)){
	var DD_belatedPNG={ns:"DD_belatedPNG",imgSize:{},delay:10,nodesFixed:0,createVmlNameSpace:function(){if(document.namespaces&&!document.namespaces[this.ns]){document.namespaces.add(this.ns,"urn:schemas-microsoft-com:vml")}},createVmlStyleSheet:function(){var b,a;b=document.createElement("style");b.setAttribute("media","screen");document.documentElement.firstChild.insertBefore(b,document.documentElement.firstChild.firstChild);if(b.styleSheet){b=b.styleSheet;b.addRule(this.ns+"\\:*","{behavior:url(#default#VML)}");b.addRule(this.ns+"\\:shape","position:absolute;");b.addRule("img."+this.ns+"_sizeFinder","behavior:none; border:none; position:absolute; z-index:-1; top:-10000px; visibility:hidden;");this.screenStyleSheet=b;a=document.createElement("style");a.setAttribute("media","print");document.documentElement.firstChild.insertBefore(a,document.documentElement.firstChild.firstChild);a=a.styleSheet;a.addRule(this.ns+"\\:*","{display: none !important;}");a.addRule("img."+this.ns+"_sizeFinder","{display: none !important;}")}},readPropertyChange:function(){var b,c,a;b=event.srcElement;if(!b.vmlInitiated){return}if(event.propertyName.search("background")!=-1||event.propertyName.search("border")!=-1){DD_belatedPNG.applyVML(b)}if(event.propertyName=="style.display"){c=(b.currentStyle.display=="none")?"none":"block";for(a in b.vml){if(b.vml.hasOwnProperty(a)){b.vml[a].shape.style.display=c}}}if(event.propertyName.search("filter")!=-1){DD_belatedPNG.vmlOpacity(b)}},vmlOpacity:function(b){if(b.currentStyle.filter.search("lpha")!=-1){var a=b.currentStyle.filter;a=parseInt(a.substring(a.lastIndexOf("=")+1,a.lastIndexOf(")")),10)/100;b.vml.color.shape.style.filter=b.currentStyle.filter;b.vml.image.fill.opacity=a}},handlePseudoHover:function(a){setTimeout(function(){DD_belatedPNG.applyVML(a)},1)},fix:function(a){if(this.screenStyleSheet){var c,b;c=a.split(",");for(b=0;b<c.length;b++){this.screenStyleSheet.addRule(c[b],"behavior:expression(DD_belatedPNG.fixPng(this))")}}},applyVML:function(a){a.runtimeStyle.cssText="";this.vmlFill(a);this.vmlOffsets(a);this.vmlOpacity(a);if(a.isImg){this.copyImageBorders(a)}},attachHandlers:function(i){var d,c,g,e,b,f;d=this;c={resize:"vmlOffsets",move:"vmlOffsets"};if(i.nodeName=="A"){e={mouseleave:"handlePseudoHover",mouseenter:"handlePseudoHover",focus:"handlePseudoHover",blur:"handlePseudoHover"};for(b in e){if(e.hasOwnProperty(b)){c[b]=e[b]}}}for(f in c){if(c.hasOwnProperty(f)){g=function(){d[c[f]](i)};i.attachEvent("on"+f,g)}}i.attachEvent("onpropertychange",this.readPropertyChange)},giveLayout:function(a){a.style.zoom=1;if(a.currentStyle.position=="static"){a.style.position="relative"}},copyImageBorders:function(b){var c,a;c={borderStyle:true,borderWidth:true,borderColor:true};for(a in c){if(c.hasOwnProperty(a)){b.vml.color.shape.style[a]=b.currentStyle[a]}}},vmlFill:function(e){if(!e.currentStyle){return}else{var d,f,g,b,a,c;d=e.currentStyle}for(b in e.vml){if(e.vml.hasOwnProperty(b)){e.vml[b].shape.style.zIndex=d.zIndex}}e.runtimeStyle.backgroundColor="";e.runtimeStyle.backgroundImage="";f=true;if(d.backgroundImage!="none"||e.isImg){if(!e.isImg){e.vmlBg=d.backgroundImage;e.vmlBg=e.vmlBg.substr(5,e.vmlBg.lastIndexOf('")')-5)}else{e.vmlBg=e.src}g=this;if(!g.imgSize[e.vmlBg]){a=document.createElement("img");g.imgSize[e.vmlBg]=a;a.className=g.ns+"_sizeFinder";a.runtimeStyle.cssText="behavior:none; position:absolute; left:-10000px; top:-10000px; border:none; margin:0; padding:0;";c=function(){this.width=this.offsetWidth;this.height=this.offsetHeight;g.vmlOffsets(e)};a.attachEvent("onload",c);a.src=e.vmlBg;a.removeAttribute("width");a.removeAttribute("height");document.body.insertBefore(a,document.body.firstChild)}e.vml.image.fill.src=e.vmlBg;f=false}e.vml.image.fill.on=!f;e.vml.image.fill.color="none";e.vml.color.shape.style.backgroundColor=d.backgroundColor;e.runtimeStyle.backgroundImage="none";e.runtimeStyle.backgroundColor="transparent"},vmlOffsets:function(d){var h,n,a,e,g,m,f,l,j,i,k;h=d.currentStyle;n={W:d.clientWidth+1,H:d.clientHeight+1,w:this.imgSize[d.vmlBg].width,h:this.imgSize[d.vmlBg].height,L:d.offsetLeft,T:d.offsetTop,bLW:d.clientLeft,bTW:d.clientTop};a=(n.L+n.bLW==1)?1:0;e=function(b,p,q,c,s,u){b.coordsize=c+","+s;b.coordorigin=u+","+u;b.path="m0,0l"+c+",0l"+c+","+s+"l0,"+s+" xe";b.style.width=c+"px";b.style.height=s+"px";b.style.left=p+"px";b.style.top=q+"px"};e(d.vml.color.shape,(n.L+(d.isImg?0:n.bLW)),(n.T+(d.isImg?0:n.bTW)),(n.W-1),(n.H-1),0);e(d.vml.image.shape,(n.L+n.bLW),(n.T+n.bTW),(n.W),(n.H),1);g={X:0,Y:0};if(d.isImg){g.X=parseInt(h.paddingLeft,10)+1;g.Y=parseInt(h.paddingTop,10)+1}else{for(j in g){if(g.hasOwnProperty(j)){this.figurePercentage(g,n,j,h["backgroundPosition"+j])}}}d.vml.image.fill.position=(g.X/n.W)+","+(g.Y/n.H);m=h.backgroundRepeat;f={T:1,R:n.W+a,B:n.H,L:1+a};l={X:{b1:"L",b2:"R",d:"W"},Y:{b1:"T",b2:"B",d:"H"}};if(m!="repeat"||d.isImg){i={T:(g.Y),R:(g.X+n.w),B:(g.Y+n.h),L:(g.X)};if(m.search("repeat-")!=-1){k=m.split("repeat-")[1].toUpperCase();i[l[k].b1]=1;i[l[k].b2]=n[l[k].d]}if(i.B>n.H){i.B=n.H}d.vml.image.shape.style.clip="rect("+i.T+"px "+(i.R+a)+"px "+i.B+"px "+(i.L+a)+"px)"}else{d.vml.image.shape.style.clip="rect("+f.T+"px "+f.R+"px "+f.B+"px "+f.L+"px)"}},figurePercentage:function(d,c,f,a){var b,e;e=true;b=(f=="X");switch(a){case"left":case"top":d[f]=0;break;case"center":d[f]=0.5;break;case"right":case"bottom":d[f]=1;break;default:if(a.search("%")!=-1){d[f]=parseInt(a,10)/100}else{e=false}}d[f]=Math.ceil(e?((c[b?"W":"H"]*d[f])-(c[b?"w":"h"]*d[f])):parseInt(a,10));if(d[f]%2===0){d[f]++}return d[f]},fixPng:function(c){c.style.behavior="none";var g,b,f,a,d;if(c.nodeName=="BODY"||c.nodeName=="TD"||c.nodeName=="TR"){return}c.isImg=false;if(c.nodeName=="IMG"){if(c.src.toLowerCase().search(/\.png$/)!=-1){c.isImg=true;c.style.visibility="hidden"}else{return}}else{if(c.currentStyle.backgroundImage.toLowerCase().search(".png")==-1){return}}g=DD_belatedPNG;c.vml={color:{},image:{}};b={shape:{},fill:{}};for(a in c.vml){if(c.vml.hasOwnProperty(a)){for(d in b){if(b.hasOwnProperty(d)){f=g.ns+":"+d;c.vml[a][d]=document.createElement(f)}}c.vml[a].shape.stroked=false;c.vml[a].shape.appendChild(c.vml[a].fill);c.parentNode.insertBefore(c.vml[a].shape,c)}}c.vml.image.shape.fillcolor="none";c.vml.image.fill.type="tile";c.vml.color.fill.on=false;g.attachHandlers(c);g.giveLayout(c);g.giveLayout(c.offsetParent);c.vmlInitiated=true;g.applyVML(c)}};try{document.execCommand("BackgroundImageCache",false,true)}catch(r){}DD_belatedPNG.createVmlNameSpace();DD_belatedPNG.createVmlStyleSheet();
}
/************************************************
 *
 * Flash Like JS
 *
 * version: 1.3
 * required: jQuery
 * lastupdate: 2012.12.11
 * author: y.hayashi
 * website: http://creatorish.com
 * pluginURL: http://creatorish.com/flashlike-js
 * license: GPL
 *
 ************************************************/

var FlashLikeEvent = {
	INIT: "flInit",
	START: "flStart",
	FINISH: "flFinish",
	CHANGE: "flChange"
};

var FlashLikeReserver = function() {
	this.reserve = {};
	this.length = 0;
};
FlashLikeReserver.prototype = {
	addReserve: function(id,val) {
		if (this.hasReserve(id) === false) {
			this.reserve[id] = [];
		}
		this.reserve[id].push(val);
		this.length++;
	},
	getReserve: function(id) {
		return this.reserve[id];
	},
	getAllReserve: function() {
		return this.reserve;
	},
	removeReserve: function(id) {
		if (this.reserve[id]) {
			this.reserve[id] = null;
			delete this.reserve[id];
		}
	},
	removeAllReserve: function() {
		for (var key in this.reserve) {
			this.reserve[key] = null;
			delete this.reserve[key];
		}
		this.reserve = {};
	},
	hasReserve: function(id) {
		if (this.reserve[id]) {
			return true;
		}
		return false;
	}
};

var FlashLike = function(scene,setting) {
	this.setting = {
		id: "flashlike",
		width: 960,
		height: 320,
		loader: "images/ajax-loader.gif",
		loaderWidth: 35,
		loaderHeight: 35,
		scene: 0,
		debug: false,
		loop: false
	};
	this.option = {
		top: 0,
		left: 0,
		zIndex: null,
		link: null,
		target: null,
		onclick: null,
		id: null
	};
	
	jQuery.extend(this.setting,setting);
	
	this.scene = scene;
	this.loadedCount = 0;
	this.images = [];
	this.index = this.setting.scene-1;
	this.timer = null;
	this.isPlay = false;
	this.isFinish = false;
	this.reserver = new FlashLikeReserver();
	
	this.container = jQuery("#"+this.setting.id);
	this.loader = jQuery("<img />");
	
	var self = this;
	
	this.loadedHandler = function(e) {
		var img = this;
		//IE overflow対策
		window.setTimeout(function() {
			self.loaded(img);
		},0);
	};
	this.nextHandler = function(e) {
		self.next();
	};
	this.timeoutHandler = function(e) {
		self.change();
	};
	
	this.init();
};
FlashLike.prototype = {
	init: function() {
		if (this.container.length === 0) {
			alert("Not Found:[" + this.setting.id + "] element.");
		}
		
		this.container.css({
			position: "relative",
			overflow: "hidden",
			width: this.setting.width,
			height: this.setting.height
		});
		this.loader.attr("src",this.setting.loader);
		this.loader.css({
			position: "absolute",
			top: "50%",
			left: "50%",
			marginTop: -this.setting.loaderHeight/2,
			marginLeft: -this.setting.loaderWidth/2
		});
		
		this.container.html(this.loader);
		
		this.console("fl init");
		jQuery(this).trigger(FlashLikeEvent.INIT);
		
		this.preload();
	},
	preload: function() {
		var s = this.scene[this.loadedCount];
		if (s.url) {
			var img = new Image();
			jQuery(img).load(this.loadedHandler).error(function () {
				alert("load error:" + jQuery(this).attr("src"));
			}).attr('src', s.url);
		} else {
			s.data = this.createSceneData(this.loadedCount,s.html,{
				top: s.top,
				left: s.left,
				zIndex: s.zIndex,
				id: s.id,
				link: s.link,
				target: s.target,
				onclick: s.onclick
			});
			this.loadedCount++;
			this.preload();
		}
	},
	loaded: function(img) {
		this.images[this.loadedCount] = img;
		
		var scene = this.getScene(this.loadedCount);
		scene.src = img.src;
		scene.data = this.createSceneData(this.loadedCount,img,{
			top: scene.top,
			left: scene.left,
			zIndex: scene.zIndex,
			id: scene.id,
			link: scene.link,
			target: scene.target,
			onclick: scene.onclick
		});
		
		++this.loadedCount;
		if (this.loadedCount === this.scene.length) {
			this.start();
		} else {
			this.preload();
		}
	},
	start: function() {
		this.console("fl start");
		this.isPlay = true;
		jQuery(this).trigger(FlashLikeEvent.START);
		this.container.html("");
		
		this.next();
	},
	getCurrentScene: function() {
		return this.scene[this.index];
	},
	getCurrentImage: function() {
		return this.images[this.index];
	},
	getScene: function(index) {
		return this.scene[index];
	},
	getImage: function(index) {
		return this.images[index];
	},
	createSceneData: function(index,image,option) {
		var op = {};
		jQuery.extend(op,this.option,option);
		
		if (!op.zIndex) {
			op.zIndex = index;
		}
		var img;
		if (op.link) {
			img = jQuery("<a>");
			img.attr("href",op.link);
			if (op.target) {
				img.attr("target",op.target);
			}
			if (op.id) {
				img.attr("id",op.id);
			}
			if (op.onclick) {
				img.attr("onclick",op.onclick);
			}
		} else {
			img = jQuery("<div>");
		}
		img.css({
			position: "absolute",
			top: op.top,
			left: op.left,
			display: "none",
			zIndex: op.zIndex
		});
		if (image.tagName && image.tagName === "IMG") {
			img.css({
				width: image.width,
				height: image.height,
				backgroundImage: "url("+image.src+")",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "0 0"
			});
		} else {
			img.append(image);
		}
		return img;
	},
	next: function() {
		if (this.index >= this.images.length-1) {
			this.finish();
			return;
		}
		
		this.console("fl next");
		++this.index;
		
		var currentScene = this.getCurrentScene();
		var data = currentScene.data;
		this.container.append(data);
		
		if(data.css('backgroundImage').indexOf('.png') != -1) {
			if(jQuery.browser.msie && (parseInt(jQuery.browser.version) == 6 || parseInt(jQuery.browser.version) == 7)){
				if (typeof(DD_belatedPNG) === "object") {
					DD_belatedPNG.fixPng(data.get(0));
				}
			} else if(jQuery.browser.msie){
				data.css({
					'backgroundImage': 'none',
					'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+currentScene.src+'", sizingMethod="image");'
				});
			}
		}
		
		var time = currentScene.fadeIn;
		if (time) {
			data.fadeIn(time);
		} else {
			time = 0;
			data.show();
		}
		
		var life = this.index+1;
		if (currentScene.live) {
			life += currentScene.live;
		}
		
		if (life > this.scene.length) {
			life = 1;
		}
		
		this.reserver.addReserve(life,this.index);
		
		if (currentScene.top) {
			data.css("top",currentScene.top);
		}
		if (currentScene.left) {
			data.css("left",currentScene.left);
		}
		
		if (currentScene.animate) {
			var easing = "swing";
			var delay = 0;
			if (currentScene.animate.easing) {
				easing = currentScene.animate.easing;
			}
			var callback = null;
			if (currentScene.animate.callback) {
				callback = currentScene.animate.callback;
			}
			
			if (currentScene.animate.delay > 0) {
				delay = currentScene.animate.delay;
			}
			currentScene.animate.param.opacity = 1;
			
			window.setTimeout(function() {
				data.stop().animate(currentScene.animate.param,currentScene.animate.time,easing,callback);
			},delay);
		}
		this.checkLiveImage();
		this.change();
	},
	change: function() {
		this.console("fl change");
		
		var currentScene = this.getCurrentScene();
		
		if (currentScene.callback) {
			currentScene.callback(currentScene.data);
		}
		
		jQuery(this).trigger(FlashLikeEvent.CHANGE);
		this.isFinish = false;
		if (currentScene.wait >= 0) {
			this.timer = window.setTimeout(this.nextHandler, currentScene.wait);
		} else {
			this.isPlay = false;
		}
	},
	checkLiveImage: function() {
		var target = this.reserver.getReserve(this.index);
		if (target) {
			for (var i = 0 ; i < target.length; i++) {
				var scene = this.getScene(target[i]);
				var id = target[i];
				if (scene.fadeOut) {
					var self = this;
					scene.data.fadeOut(scene.fadeOut,function() {
						jQuery(this).remove();
						self.resetScene(id);
					});
				} else {
					scene.data.remove();
					this.resetScene(target[i]);
				}
				this.console("remove:"+target[i]);
			}
		}
		this.reserver.removeReserve[this.index];
		
		jQuery(this.container).find("div:hidden").remove();
	},
	finish: function() {
		this.console("fl finish");
		var currentScene = this.getCurrentScene();
		this.checkLiveImage();
		if (this.setting.loop === true) {
			jQuery(this.container).find("div:visible").css("zIndex",0);
			this.reserver.addReserve(1,this.index);
			this.index = -1;
			this.next();
		} else {
			this.isFinish = true;
			jQuery(this).trigger(FlashLikeEvent.FINISH);
		}
	},
	resetScene: function(index) {
		var scene = this.getScene(index);
		var top = 0;
		var left = 0;
		var zIndex= index;
		
		if (scene.top) {
			top = scene.top;
		}
		if (scene.left) {
			left = scene.left;
		}
		if (scene.zIndex) {
			zIndex += scene.zIndex;
		}
		
		scene.data.css({
			position: "absolute",
			top: top,
			left: left,
			display: "none",
			zIndex: zIndex
		});
	},
	clear: function() {
		clearTimeout(this.timer);
		
		var rs = this.reserver.getAllReserve();
		for (var key in rs) {
			if (key >= this.scene.length-2) {
				continue;
			}
			var target = rs[key];
			for (var i = 0 ; i < target.length; i++) {
				if (target[i] < this.scene.length-2) {
					var scene = this.getScene(target[i]);
					scene.data.remove();
					this.resetScene(target[i]);
				}
			}
			this.reserver.removeReserve(key);
		}
	},
	replay: function() {
		this.index = this.setting.scene-1;
		this.clear();
		this.container.html("");
		this.next();
	},
	skip: function() {
		this.index = this.scene.length-2;
		this.clear();
		this.next();
	},
	goTo: function(index) {
		this.clear();
		this.container.html("");
		this.index = index-1;
		this.next();
	},
	console: function(message) {
		if (this.setting.debug === true) {
			window.console.log(message);
		}
	}
};