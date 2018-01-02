function roa(arr)    //arr为可能出现的元素集合
{
    var temp=new array();    //temp存放生成的随机数组
　  var count=arr.length;    
    for (i=0;i<count;i++)
    { 
        var num=Math.floor(Math.random()*arr.length); //生成随机数num
        temp.push(arr[num]);    //获取arr[num]并放入temp
        arr.splice(num,1);    
    }
    return temp;
}