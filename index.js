var bonmun = [];
var translation = [];
var num = 0;

function go() {
    var sec = Number(document.getElementById('sec').value);
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/178c5tppoxNq9wAKo3-d8gNWOsQ3N6HH-3Sg-ttpD5sQ/values/${document.getElementById('index').value}!A:B?key=AIzaSyATLeHQh6kM0LWRJjLg8CmzoSdnntFrmFk`)
        .then(response => response.json())
        .then(data => {
            bonmun = data.values[sec - 1][0].split('. ');
            translation = data.values[sec - 1][1].split('. ');
            if (bonmun.length > 0) {
                bonmun[bonmun.length - 1] = bonmun[bonmun.length - 1].replace('.', '');
            }
            next();
        });
}

function next() {
    if (num < bonmun.length) {
        problem(bonmun[num].split(' '), translation[num] + '.');
    }
}

function problem(words, pas) {
    document.getElementById('pas').textContent = pas;
    document.getElementById('show').textContent = '';
    document.getElementById('words').textContent = '';
    document.getElementById('next').style.display = 'none';
    words = shuffle(words);
    words.forEach(el => {
        document.getElementById('words').innerHTML += `<span id="${el}" class="unselected" onClick="select(this);">${el}</span>`;
    });
}

function shuffle(arr) {
    var l = arr.length;
    var newarr = [];
    for (var i = 0; i < l; i++) {
        var r = Math.floor(Math.random() * arr.length);
        newarr.push(arr[r]);
        arr.splice(r, 1);
    }
    return newarr;
}

function select(word) {
    if (word.className == "unselected") {
        word.className = "selected";
        document.getElementById('show').textContent += ' ' + word.textContent;
    }
    if (document.querySelectorAll('.unselected').length == 0) {
        if (document.getElementById('show').textContent.trim() == bonmun[num]) {
            document.getElementById('pas').textContent = '맞음';
        } else {
            document.getElementById('pas').textContent = '틀림';
        }
        document.getElementById('show').textContent += '.';
        num++;
        document.getElementById('next').style.display = 'block';
    }
}