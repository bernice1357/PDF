//多筆資料
let mul = ['system','tablespace','rman','sql','exception'];
for(var i in mul){
  for(var row in info[mul[i]]){//每列
    var newDiv = document.createElement('tr');
    for(var col in info[mul[i]][row]){//每欄
      var htmlObject = document.createElement('td');
      htmlObject.innerHTML = info[mul[i]][row][col];
      newDiv.appendChild(htmlObject);
    }
    document.getElementById(mul[i]).appendChild(newDiv);
  }
}

//DataGuard同步機制
for(var row in info.dataguard){
  var parent = document.createElement('tr');
  //每欄
  for(var col in info.dataguard[row]){
    var child = document.createElement('td');
    if(col!=='date'){
      child.innerHTML = info.dataguard[row][col];
      parent.appendChild(child);
    }else{
      child.innerHTML = info.dataguard[row].date+' '+info.dataguard[row].time;
      parent.appendChild(child);
      break;
    }
  }
  document.getElementById('dataguard').appendChild(parent);
}

//單筆資料

//資料庫問題彙總與上一期比較
for(var item in info.comparion){
  if(i!="event"){
    $('#'+item+'> input').val(info.comparion[item]);
  }else{
    $('#'+item).text(info.comparion[item]);
  }
}

//現況與建議事項
for(var item in info.suggestion){
  $('#'+item+'> input').val(info.suggestion[item]);
}

// //第三頁表格二
// for(var item in info.two){
//   $('#'+item).text(info.two[item]);
// }

// //第三頁表格一
// for(var item in info.reportinfo){
//   $('#'+item).text(info.reportinfo[item]);
// }