//複製 3-10 頁的頁面

//有幾個 hostname (要複製幾次)
var len = report.all_report_info.hostname.length;

//複製 3-10 頁的 html
for(var item=1; item<len; item++){
  for(var i=3; i<=10; i++){
    $("body").append($(`#page-${i}`).clone().attr('id','page-'+(8*item+i)));
  }
}

//多筆資料
function multiple(tableName, page){
  var pageNum = 8*item+page;
  if(data[tableName].length!==0){
    //每列
    for(var row in data[tableName]){
      var newDiv = document.createElement('tr');
      //每欄
      for(var col in data[tableName][row]){
        var htmlObject = document.createElement('td');
        htmlObject.innerHTML = data[tableName][row][col];
        newDiv.appendChild(htmlObject);
      }
      var tdElement = `#page-${pageNum} > .border > .${tableName} > tbody`;
      $(tdElement).append(newDiv);
    }
  }else{
    $(`#page-${pageNum}`).remove();
  }
}

//把 json 值塞進表格
for(var item=0; item<len; item++){
  var data = report.reports[item];

  //第三頁
  var tdElement = `#page-${(8*item+3)} > .border > table > tbody > `;
  $(tdElement+'.tr-1 > td').text(data.reportinfo.company);
  $(tdElement+'.tr-2 > td').text(data.reportinfo.project);
  $(tdElement+'.tr-3 > td').text(data.reportinfo.period);
  $(tdElement+'.tr-4 > td').text(data.reportinfo.hostname);
  $(tdElement+'.tr-5 > td').text(data.reportinfo.db);
  $(tdElement+'.tr-6 > td').text(data.reportinfo.consultant);
  $(tdElement+'.tr-7 > td').text(data.reportinfo.date);

  multiple('system',4);
  multiple('tablespace',5);
  multiple('rman',6);
  multiple('sql',9);

  //物件狀態異常報告
  if(data.exception.length!==0){
    for(var row in data.exception){
      var newDiv = document.createElement('tr');
      //每欄
      for(var col in data.exception[row]){
        var htmlObject = document.createElement('td');
        htmlObject.innerHTML = data.exception[row][col];
        newDiv.appendChild(htmlObject);
      }
      var tdElement = `#page-${8*item+8} > .border > .exception > tbody`;
      $(tdElement).append(newDiv);
    }
  }else{
    $(`#page-${8*item+8}`).remove();
  }
  
  //DataGuard同步機制
  if(data.dataguard.length!==0){
    for(var row in data.dataguard){
      var parent = document.createElement('tr');
      //每欄
      for(var col in data.dataguard[row]){
        var child = document.createElement('td');
        if(col!=='date'){
          child.innerHTML = data.dataguard[row][col];
          parent.appendChild(child);
        }else{
          child.innerHTML = data.dataguard[row].date+' '+data.dataguard[row].time;
          parent.appendChild(child);
          break;
        }
      }
      var tdElement = `#page-${(8*item+7)} > .border > .dataguard > tbody`;
      $(tdElement).append(parent);
    }
  }else{
    $(`#page-${8*item+7}`).remove();
  }

  //第九頁

  //效能分析說明
  if(data.session.length!==0 && data.buffer_hit.length!==0){
    var tdElement = `#page-${(8*(item)+9)} > .border > .effect > tbody`;
    //每列
    for(var row in data.session){
      var parent = document.createElement('tr');

      var child = document.createElement('td');
      child.innerHTML = 'Session連線數';
      parent.appendChild(child);

      var child = document.createElement('td');
      child.innerHTML = data.session[row].min+'-'+data.session[row].max;
      parent.appendChild(child);

      var child = document.createElement('td');
      child.innerHTML = '運作正常';
      parent.appendChild(child);

      $(tdElement).append(parent);
    }
    
    for(var row in data.buffer_hit){
      var parent = document.createElement('tr');

      var child = document.createElement('td');
      child.innerHTML = 'Buffer Hit%';
      parent.appendChild(child);

      var child = document.createElement('td');
      child.innerHTML = data.buffer_hit[row].num;
      parent.appendChild(child);

      var child = document.createElement('td');
      child.innerHTML = '效能良好';
      parent.appendChild(child);

      $(tdElement).append(parent);
    }
  }else{
    $(`#page-${8*item+9}`).remove();
  }

  //第十頁

  //資料庫問題彙總與上一期比較
  //每欄
  var tdElement = `#page-${(8*(item)+10)} > .border > .comparison > tbody`;
    
  var parent = document.querySelector(tdElement+'> .comTitle');
  for(var i=0;i<4;i++){
    var child = document.createElement('th');
    child.innerHTML = data.summarytitle.year1+'<br>'+data.summarytitle.stage1;
    parent.appendChild(child);

    var child = document.createElement('th');
    child.innerHTML = data.summarytitle.year2+'<br>'+data.summarytitle.stage2;
    parent.appendChild(child);
  }
  for(var col in data.comparison){
    if(col!=="event"){
      $(tdElement+' .content > .'+col+' > input').val(data.comparison[col]);
    }else{
      $(tdElement+' .content > .'+col).text(data.comparison[col]);
    }
  }

  //現況與建議事項
  for(var col in data.suggestion){
    var tdElement = `#page-${(8*(item)+10)} > .border > .suggestion > tbody > tr > .${col} > input`;
    $(tdElement).val(data.suggestion[col]);
  }
}