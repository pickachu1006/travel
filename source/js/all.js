var place = document.getElementById('zone');
var hotplace = document.querySelector('.hotplace');
var title = document.querySelector('.place-name');
var detail = document.querySelector('.place-detail');
var str="";

//selector資料
var zoneData=["","內門區","大樹區","小港區","六龜區","仁武區","左營區","田寮區","永安區","甲仙區","鼓山區","杉林區","那瑪夏","岡山區","高雄市","前鎮區","茂林區","茄萣區","梓官區","旗津區","桃源區","楠梓區","前金區","鳳山區","美濃區","苓雅區","新興區"];
var zoneStr="";
var zoneLen=zoneData.length;
    zoneData.sort();
    for(let i = 0;i<zoneLen;i++){
        if(i==0){
            zoneStr='<option value="'+zoneData[i]+'" disabled selected>- - 請選擇行政區- -</option>' 
        }
        zoneStr+='<option value="'+zoneData[i]+'">'+zoneData[i]+'</option>';
    }
        place.innerHTML=zoneStr;


//監聽selector跟熱門景點按鈕
place.addEventListener('change',filter,false);
hotplace.addEventListener('click',hotfilter,false);

//selector事件
function filter(e){
    e.preventDefault();
    str = place.value;
    title.textContent=str;
    detail.innerHTML="";
    getData();
    
}

//熱門景點-按鈕事件
function hotfilter(e){
    e.preventDefault();
    if(e.target.nodeName=='LI'){
        str = e.target.textContent;
        title.textContent=str;
        detail.innerHTML="";
        getData();
       
    }   
}

//向伺服器要資料、readyState=4後顯示在網頁上
function getData(){
        var xhr =  new XMLHttpRequest();
        xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
        xhr.send(null);
        xhr.onload=function(){   //readyState=4後觸發
            var a=JSON.parse(xhr.responseText);
            a = a.result.records;//旅遊資訊包在層層物件裡面
            var len = a.length;
            for(let i = 0;i<len;i++){
                if(a[i].Zone==str){
                detail.innerHTML+='<li><img class="top" src="'+a[i].Picture1+'"><div class="top-text"><div class="big">'+a[i].Name+'</div><div class="small">'+a[i].Zone+'</div></div></div><div class="bottom"><div class="icon"> <img src="images/clock.png" alt=""><span>'+a[i].Opentime+'</span></div><div class="icon"><img src="images/pin.png" alt=""><span>'+a[i].Add+'</span></div><div class="icon"><div class="phone"><img src="images/phone.png" alt=""><span>'+a[i].Tel+'</span></div><div class="tag"><img src="images/tag.png" alt=""><span>'+a[i].Ticketinfo+'</span></div></div></div></li>';
            } 
        }
    }
}
