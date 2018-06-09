/*
* @Author: Administrator
* @Date:   2018-06-08 21:15:50
* @Last Modified by:   Administrator
* @Last Modified time: 2018-06-09 00:12:43
*/
(function(){
	window.Block=function(){
		// 随机一个形状
		this.allType=["I","L","J","S","Z","O","T","A"][~~(Math.random()*8)];
		// 先得到所有形状的长度， 在随机一个形状中的方向
		this.allDirectionNumber=block_json[this.allType].length;
		// 随机一个方向
		this.direction=~~(Math.random()*this.allDirectionNumber)
		// 随机得到的二进制code码
		this.code=block_json[this.allType][this.direction];

		// 小方块4*4 的初始位置
		this.row=0;
		// 为了保证方块在水平居中
		this.col=4;

		console.log(this.code)

	}

	// 砖块渲染
	Block.prototype.render=function(){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(this.code[i][j]==1){
					game.setClass(this.row+i,this.col+j,this.allType);
				}
			}

		}
	}

	// 砖块下落
	Block.prototype.down=function(){
		// var that=this;
		// 判断数组第0行 ，有没有不等于0的项，如果有，游戏结束
		game.map.code[0].forEach(function(item){
			if(item!=0){
				clearInterval(game.timer);
				alert('game over');
			}
		})

			// 调用check方法，如果为真就就继续row++
			if(this.check(this.row+1,this.col)){
				this.row++;
			}else{
				// 如果为假，表示碰到非0的砖块了。将自己添加到map地图类中
				this.addDie();
				// 同时new一个新的砖块出来
				game.block=new Block();
				// 每碰到一次检测是否需要消行
				this.remove();
			}
	}

	// 向左
	Block.prototype.left=function(){
		if(this.check(this.row,this.col-1)){
			this.col--;
			document.querySelector('#move').play();
		}
	}
	// 向右
	Block.prototype.right=function(){
		if(this.check(this.row,this.col+1)){
			this.col++;
			document.querySelector('#move').play();
		}
	}
	// 一键到底
	Block.prototype.goDown=function(){
		while(this.check(this.row+1,this.col)){
			this.row++;
		}
		document.querySelector('#goDown').play();
	}
	// 旋转
	Block.prototype.rotate=function(){
		var oldDirection=this.direction;
		// 如果旋转的值已经到最大值就回到0
		if(this.direction==this.allDirectionNumber-1){
			this.direction=0;
		}else{
			// 否则可以继续加
			this.direction++
			document.querySelector('#rotate').play();
		}
		
		if(!this.check(this.row,this.col)){
			// 已经碰到了
			// 撤回来
			this.direction=oldDirection;
		}

		// 得到旋转后的code码    或者不旋转
		this.code=block_json[this.allType][this.direction];

	}

// 检测碰撞，提供check方法 返回true或false
	Block.prototype.check=function(row,col){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(this.code[i][j]!=0 && game.map.code[row+i][col+j]!=0){
					return false;//不能进 返回false
				}
			}
		}
		return true;//能进返回true
	}
	// 消行判断
	Block.prototype.remove=function(){
		// 判断map地图类中的code 某一行是不是没有0， 如果没有0，就消行
		for(var i=0;i<20;i++){
			// 判断一个数组是否包含一个值 ，包含true 
			if(!game.map.code[i].includes(0)){
				// 没有0
				game.map.code.splice(i,1);
				// 删除行之后，重新在头部填充一行全0的
				game.map.code.unshift(new Array(12).fill(0));
				game.score++;
				// 播放音乐
				document.querySelector("#goDie").play();
			}
		}
	}

	Block.prototype.addDie=function(){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(this.code[i][j]!=0){
					game.map.code[this.row+i][this.col+j]=this.allType;
				}
			}
		}
	}
})()