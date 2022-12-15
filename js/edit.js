//TODO:改成可以直接抓key的值
const arr=['object1','object2','lock1','lock2','copy1','copy2','space1','space2'];

//按下更新按鈕
const buttonElement = document.getElementById('btn');
buttonElement.addEventListener('click', function () {
  //現況與建議事項
  for(var i=1; i<15; i++){
    info.suggestion['s'+String(i)] = document.getElementById('i'+String(i)).value;
  }
  //資料庫問題彙總與上一期比較
  arr.forEach(function(item){
    info.comparion[item] = document.querySelector(`#${item}`+'> input').value;
  });
});

//列印之前
window.addEventListener('beforeprint', () => {
  //資料庫問題彙總與上一期比較
  arr.forEach(function(item){
    //舊的元素
    const oldE = document.getElementById(item);
    //新的元素
    const newE = document.createElement('td');
    newE.innerHTML = info.comparion[item];
    //要換元素的地方
    var parent = oldE.parentNode;
    //替換
    parent.replaceChild(newE, oldE);
  });
  
  //現況與建議事項
  for(var i=1; i<15; i++){
    //舊的元素
    const oldE = document.getElementById('s'+String(i));
    //新的元素
    const newE = document.createElement('td');
    newE.innerHTML = info.suggestion['s'+String(i)];
    //要換元素的地方
    var parent = oldE.parentNode;
    //替換
    parent.replaceChild(newE, oldE);
  }
  document.getElementById('btn').css("visibility","hidden");
});

//列印之後
window.addEventListener('afterprint', () => {
  for(var i=1; i<15; i++){
    //舊的元素
    const oldE = document.getElementById('s'+String(i));
    //新的元素
    const newE = document.createElement('td');
    newE.setAttribute("id", 's'+String(i));
    newE.innerHTML = `<input id=\"i${i}\" type=\"text\"/>`;
    //要換元素的地方
    var parent = oldE.parentNode;
    //替換
    parent.replaceChild(newE, oldE);
  }
  document.getElementById('btn').css("visibility","visible");
});