/*
* @Author: Administrator
* @Date:   2018-06-08 20:18:30
* @Last Modified by:   Administrator
* @Last Modified time: 2018-06-09 00:09:34
*/
(function(){
	window.Game=function(){
		// 初始化DOM table表格
		this.init();
		//砖块， 当作Game的子属性
		this.block=new Block();
			// 实例化map 当作Game类的子属性
		this.map=new Map();
		this.start();
		this.BindEvent();

	}
	// xun
	Game.prototype.init=function(){
		this.dom=document.createElement('table');
		document.querySelector("#app").appendChild(this.dom)
		var tr,td;
		for(var i=0;i<20;i++){
			tr=document.createElement('tr');
			this.dom.appendChild(tr);
			for(var j=0;j<12;j++){
				td=document.createElement('td');
				tr.appendChild(td);
			}
		}
	}
// row 行 col列 给指定行列的格子设定classname
	Game.prototype.setClass=function(row,col,classname){
		document.querySelectorAll('tr')[row].querySelectorAll('td')[col].className=classname;
	}
	// 清屏方法
	Game.prototype.clearClass=function(){
		for(var i=0;i<20;i++){
			for(var j=0;j<12;j++){
				this.setClass(i,j,"")
			}
		}
	}

// 键盘事件监听
	Game.prototype.BindEvent=function(){
		var that=this;
		document.onkeyup=function(e){
			if(e.keyCode==37){
				that.block.left();
			}else if(e.keyCode==38){
				that.block.rotate();
			}else if(e.keyCode==39){
				that.block.right();
			}else if(e.keyCode==40){
				that.block.goDown();
			}
		}
	}


	Game.prototype.start=function(){
		var that=this;
		this.f=0;//帧频
		this.score=0;
		this.timer=setInterval(function(){
			that.f++;
			document.querySelector("#info").innerHTML="帧频"+that.f;
			document.querySelector("#score").innerHTML="分数"+that.score;

			// 清屏
			that.clearClass();
			// 渲染砖块
			that.block.render();
			// 每隔30帧下落
			// that.f%20==0
			that.f % 20 == 0 && that.block.down()
			// 地图渲染
			that.map.render()

		},20)
	}

})()

// console.log(~~3.1)