window.addEventListener('load',function(){
	var preview_img=document.querySelector('.preview_img');
	var mask=document.querySelector(".mask");
	var big=document.querySelector('.big');
	// 1.当我们鼠标经过preview_img 就是显示和隐藏mask 遮挡层和big大盒子
	preview_img.addEventListener('mouseover',function(){
		mask.style.display='block';
		big.style.display='block';
	})
	preview_img.addEventListener('mouseout',function(){
		mask.style.display='none';
		big.style.display='none';
	})
	// 2鼠标移动的时候，让黄色盒子跟着鼠标来走
	preview_img.addEventListener('mousemove',function(e){
		var x=e.pageX-this.offsetLeft;
		var y=e.pageY-this.offsetTop;
		//2 盒子高度的一半 让鼠标居中
		var maskX=x-mask.offsetWidth/2;
		var maskY=y-mask.offsetHeight/2;
		// 遮挡层的最大移动距离
		var maskMax=preview_img.offsetWidth-mask.offsetWidth;
		if(maskX<=0){
			maskX=0;
		}else if(maskX>=maskMax){
			maskX=maskMax;
		}
		if(maskY<=0){
			maskY=0;
		}else if(maskY>=maskMax){
			maskY=maskMax;
		}
		mask.style.left=maskX+'px';
		mask.style.top=maskY+'px';
		var bigIMg=document.querySelector('.bigImg');
		// 大图片最大移动距离
		var bigMax=bigIMg.offsetWidth-big.offsetWidth;
		// 大图片的移动距离
		var bigX=maskX*bigMax/maskMax;
		var bigY=maskY*bigMax/maskMax;
		bigIMg.style.left=-bigX+'px';
		bigIMg.style.top=-bigY+'px';
	})
})