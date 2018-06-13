//指定DOM元素
var bmiRecord = document.querySelector('.bmiRecord');
var resultBtn = document.querySelector(".result");
var dataAry = JSON.parse(localStorage.getItem('BMIlist'))||[];

//監聽與更新
resultBtn.addEventListener('click',addData,false);
updateData(dataAry);

//點擊"看結果"按鈕
function addData(e){
    e.preventDefault();
    var weight = parseInt(document.getElementById('weight').value);
    var height = parseInt(document.getElementById('height').value);
    var BMInumber= Math.round(weight/Math.pow((height/100),2));
    var level ="";
    var addClass="";
   
    if(BMInumber<=18.5){
        level="過輕";
        addClass="blue";
        resultBtn.setAttribute('class','result btn-blue');
        resultBtn.textContent="過輕";
    }
    else if(18.5 <= BMInumber && BMInumber<=25.5){
        level="理想";
        addClass="green";
        resultBtn.setAttribute('class','result btn-green');
    }
    else if(25 <= BMInumber){
        level="過重";
        addClass="orange-fat"
        resultBtn.setAttribute('class','result btn-orange-fat')
    }else if(level==""){
        alert('請重新輸入')
        return;
    };
    var BMIdetail= {
        wei:weight,
        hei:height,
        color:addClass,
        bmi:BMInumber,
        lev:level
    };
    dataAry.push(BMIdetail);
    updateData(dataAry);
    localStorage.setItem('BMIlist',JSON.stringify(dataAry)); 
}

//更新網頁內容
function updateData(dataAry){
    str='';
    var d = new Date();
    var time =(d.getMonth()+1)+'-'+d.getDate()+'-'+d.getFullYear();
    var len = dataAry.length;
    for(var i=0;i<len;i++){
        str+='<li data-level="'+i+'" class="'+dataAry[i].color+'"><span>'+dataAry[i].lev+'</span><span>BMI '+dataAry[i].bmi+'</span><span>weight '+dataAry[i].wei+'</span><span>height '+dataAry[i].hei+'</span><span>'+time+'</span></li>';  
    }
    bmiRecord.innerHTML=str;   
    
}


