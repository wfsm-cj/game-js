/*
* @Author: Administrator
* @Date:   2018-06-08 21:39:05
* @Last Modified by:   Administrator
* @Last Modified time: 2018-06-08 22:19:25
*/
(function(){
	window.Map=function(){
		this.code=(function(){
			var arr=[];
			for(var i=0;i<20;i++){
				arr.push([]);
				for(var j=0;j<12;j++){
					arr[i].push(0)
				}
			}
			arr.push(Array(12).fill(1));//ES6 填充数组
			return arr;
		})()
		// console.log(this.code)
	}
	// 地图渲染方法
	Map.prototype.render=function(){
		for(var i=0;i<20;i++){
			for(var j=0;j<12;j++){
				// 如果地图中code码不等于0 ，就渲染方块
				if(this.code[i][j]!=0){
					game.setClass(i,j,this.code[i][j])
				}
			}
		}
	}
})()