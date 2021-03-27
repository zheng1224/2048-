var d =new Array(10);
d[1] = 1;
d[2] = 2;
d[3] = 3;
d[4] = 4;
d[5] = 5;
d[6] = 6;
d[7] = 7;
d[8] = 8;
d[9] = 0;
//左边是大div的编号，右边是小的div的编号，0为空
var d_direct = new Array([0], [2,4], [1,3,5], [2,6], [1,5,7],
    [2,4,6,8], [3,5,9], [4,8], [5,7,9],[6,8]);
var d_dir = new Array([0], [0,0], [0,150], [0,300], [150,0], 
    [150,150], [150,300], [300,0], [300,150], [300,300]);

var pause = true;

function move(num) {
    //小的div对应那个大的div，通过遍历所有的找到对应的值
    for(var i = 1; i<d.length; i++){
        if(d[i] == num){
            break;
            //大的div是写死的，此时找到小的div对应的大的div，退出循环
        }
    }
    var resultTo = 0;
    resultTo = moveTo(i);
    //moveTo()函数可以返回那个位置可以去的大div的编号

    if(resultTo != 0){
        d[i] = 0;
        d[resultTo] = num;

        document.getElementById('d' + num).style.top =
        d_dir[resultTo][0] + "px";
        document.getElementById('d' + num).style.left =
        d_dir[resultTo][1] + "px";
    }
    //如果有位置可以走，将原始位置设置为空白的 并且走向下一个位置

    var finishflag = true;
    for(var k = 1; k<9; k++){
        if(d[k] != k){
            finishflag = false;
            break;
        }
    }

    if (finishflag == true) {
        if (!pause) start();
        alert('congratulation');
    }
}

function moveTo(i){

    var move_flag = false;
    for(var j = 0; j<d_direct[i].length; j++){
        if(d[d_direct[i][j]] == 0){
            move_flag = true;
            break;
        }
    }

    if(move_flag){
        return d_direct[i][j];
    }else{
        return 0;
    }
}

var time = 0;
var timer;


function start(){
    if(pause){
        document.getElementById("start").innerHTML = "暂停";
        pause = false;
        timer = setInterval(function(){
            time++;
            var sec = time%60;
            var min = parseInt(time/60);
            document.getElementById("time").innerHTML = min +"分" + sec+"秒";
        }, 1000);
    }else{
        document.getElementById("start").innerHTML = "开始";
        pause = true;
        clearInterval(timer);
    }
}

function reset() { 
    time = 0;
    random_d();
    if(pause){
        start();
    }
 }

 function random_d(){
     for(var j = 9; j>1; j--){
        var cha =  parseInt(Math.random()*(j-1) + 1);
        if(d[j] !=0){
            
            document.getElementById('d' + d[j]).style.top = 
            d_dir[cha][0] + "px";
            document.getElementById('d' + d[j]).style.left = 
            d_dir[cha][1] +"px";
        }
        if(d[cha] != 0){
            document.getElementById('d' + d[cha]).style.top = 
            d_dir[j][0] + "px";
            document.getElementById('d' + d[cha]).style.left = 
            d_dir[j][1] +"px";
        }

        var temp = d[j];
        d[j] = d[cha];
        d[cha] = temp;
     }
 }

 window.onload = function () { 
     reset();
  };
