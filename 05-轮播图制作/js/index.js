window.addEventListener('load',function(){
	var arrow_l=document.querySelector('.arrow-l')
	var arrow_r=document.querySelector('.arrow-r')
	var focus=document.querySelector('.focus')
	var focusWidth=focus.offsetWidth;
	// 鼠标经过 显示左右按钮
	focus.addEventListener('mouseenter',function(){
		arrow_l.style.display='block';
		arrow_r.style.display='block';
		clearInterval(timer);
		timer=null;//清空定时器变量
	})
	focus.addEventListener('mouseleave',function(){
		arrow_l.style.display='none';
		arrow_r.style.display='none';
		timer=setInterval(function(){
			// 手动调用点击事件
			arrow_r.click();
		},2000)
		
	})
	// 动态生成小圆圈
	var ul=focus.querySelector('ul');
	var ol=focus.querySelector('ol');
	for(var i=0;i<ul.children.length;i++){
		// 创建一个小li
		var li=document.createElement('li');
		// 记录当前小圆圈的索引号 通过自定义属性来做
		li.setAttribute ('index',i);
		// 把小li插入到ol里面
		ol.appendChild(li);
		// 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
		li.addEventListener('click',function(){
			for (var i = 0; i < ol.children.length; i++) {
				ol.children[i].className='';
			}
			this.className='current';
			// 点击小圆圈，移动图片 ul
			// ul的移动距离，小圆圈的索引号乘以图片的宽度 注意是负值
			// 当我点了某个小li就拿到当前小li的索引号
			var index=this.getAttribute('index');
			// 当我们点击小li就要把这个li的索引号给num
			num=index;
			// 当我们点击小li就要把这个li的索引号给cicle
			circle=index;
			animate(ul,-index*focusWidth)
		})
	}
	// 第一个小圆圈需要添加 current类
	ol.children[0].className='current';
	// 克隆第一张图片(li)放到ul中最后面
	var first=ul.children[0].cloneNode(true);
	ul.appendChild(first);   
	// 点击右侧按钮，图片滚动一张
	var num =0;
	// 这个是控制小圆圈的播放
	var circle=0;
	// falg就是节流阀
	var falg=true;
	arrow_r.addEventListener('click',function(){
		if(falg){
			falg=false;//关闭节流阀
			// 如果走到了最后一张复制图片，此时快速把ul的left改为0
			if(num==ul.children.length-1){
				ul.style.left=0;
				num=0;
			}
			num++;
			animate(ul,-num*focusWidth,function(){
				falg=true;//打开节流阀
			})
			circle++;
			// 如果circle==4说明走到最后我们克隆的这张图片了 我们就复原
			if(circle==ol.children.length){
				circle=0;
			}
			// 先清除其余小圆圈的current类名
			circleChange();
		}
	})
	// 左侧按钮做法
	arrow_l.addEventListener('click',function(){
		if(falg){
			falg=false;
			// 如果走到了最后一张复制图片，此时快速把ul的left改为0
			if(num==0){
				num=ul.children.length-1;
				ul.style.left=-num *focusWidth+'px';
				// 就是第一张到最后一张
				
			}
			num--;
			animate(ul,-num*focusWidth,function(){
				falg=true;
			})
			circle--;
			// 如果circle<0说明第一张图片，则小圆圈要改为第4个小圆圈（3）
			// if(circle<0){
			// 	circle=ol.children.length-1;
			// }
			circle=circle<0 ? ol.children.length-1 : circle;
			// 太重复，写成函数
			circleChange();
		}
		
	})
	function circleChange(){
		// 先清除其余小圆圈的current类名
		for (var i = 0; i < ol.children.length; i++) {
			ol.children[i].className='';
		}
		// 留下当前的小圆圈的current的类型
		ol.children[circle].className='current'
	}
	
	// 自动播放轮播图
	var timer=setInterval(function(){
		// 手动调用点击事件
		arrow_r.click();
	},2000)
})