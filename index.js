var bonmun=[];
var translation=[];
var num=0;

function go(){
var sec=Number(document.getElementById('sec').value);
fetch(`https://sheets.googleapis.com/v4/spreadsheets/178c5tppoxNq9wAKo3-d8gNWOsQ3N6HH-3Sg-ttpD5sQ/values/${document.getElementById('index').value}!A:B?key=AIzaSyATLeHQh6kM0LWRJjLg8CmzoSdnntFrmFk`)
.then(response=>response.json())
.then(data=>{
    bonmun=data.values[sec-1][0].split('. ');
    translation=data.values[sec-1][1].split('. ');
    next();
});
}
function next(){
    if(num<bonmun.length){
    problem(bonmun[num].split(' '),translation[num].split(' '));
    }
}
function problem(words,pas){
    document.getElementById('pas').textContent=pas;
    document.getElementById('show').textContent='';
    document.getElementById('words').textContent='';
    document.getElementById('next').style.display='none';
    words.forEach(el=>{
        document.getElementById('words').innerHTML+=`<div id="${el}"class="unselected">${el}</div>`;
        document.getElementById(el).addEventListener('click',select);
    });
}
function select(){
    if(this.className=="unselected"){
    this.className="selected";
    document.getElementById('show').textContent+=' '+this.textContent;
    }
    if(!document.getElementById('unselected')){
        if(document.getElementById('show').textContent==bonmun[num]){
            document.getElementById('pas').textContent='맞음';
        }
        else{
            document.getElementById('pas').textContent='틀림';
        }
        num++;
        document.getElementById('next').display='block';
    }
}
