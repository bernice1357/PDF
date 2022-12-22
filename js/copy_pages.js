//複製 3-10 頁的頁面

//有幾個 hostname (要複製幾次)
var len = report.all_report_info.hostname.length;

//複製 3-10 頁的 html
for(var item=1; item<len; item++){
  for(var i=3; i<=10; i++){
    $("body").append($(`#page-${i}`).clone().attr('id','page-'+(8*item+i)));
  }
}

//把 json 值塞進表格
for(var item=0; item<len; item++){
  var data = report.reports[item];

  //第三頁
  var tdElement = `#page-${(8*item+3)} > .border > table > tbody > `;
  $(tdElement+'.tr-1').append('<td>'+data.reportinfo.company+'</td>');
  $(tdElement+'.tr-2').append('<td>'+data.reportinfo.project+'</td>');
  $(tdElement+'.tr-3').append('<td>'+data.reportinfo.period+'</td>');
  $(tdElement+'.tr-4').append('<td>'+data.reportinfo.hostname+'</td>');
  $(tdElement+'.tr-5').append('<td>'+data.reportinfo.db+'</td>');
  $(tdElement+'.tr-6').append('<td>'+data.reportinfo.consultant+'</td>');
  $(tdElement+'.tr-7').append('<td colspan="2">'+data.reportinfo.date+'</td>');

  //多筆資料
  function multiple(tableName, page){
    //每列
    for(var row in data[tableName]){
      var newDiv = document.createElement('tr');
      //每欄
      for(var col in data[tableName][row]){
        var htmlObject = document.createElement('td');
        htmlObject.innerHTML = data[tableName][row][col];
        newDiv.appendChild(htmlObject);
      }
      var pageNum = 8*item+page
      var tdElement = `#page-${pageNum} > .border > .${tableName} > tbody`;
      $(tdElement).append(newDiv);
    }
  }

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
    document.querySelector(`#page-${8*item+8} > .border > .message`).innerHTML = '無效物件與上期相比並無增加。';
  }
  
  //DataGuard同步機制
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

  //第九頁

  //效能分析說明
  //TODO:等後端確定格式
  // var tdElement = `#page-${(8*(item)+9)} > .border > .effect > tbody`;
  // for(var row in data.session){
  //   var newDiv = document.createElement('tr');
  //   //每欄
  //   for(var col in data.session[row]){
  //     var htmlObject = document.createElement('td');
  //     htmlObject.innerHTML = data.session[row][col];
  //     newDiv.appendChild(htmlObject);
  //   }
  //   $(tdElement).append(newDiv);
  // }

  //第十頁

  //資料庫問題彙總與上一期比較
  //每欄
  var tdElement = `#page-${(8*(item)+10)} > .border > .comparison > tbody > .content > `;
  for(var col in data.comparison){
    if(col!=="event"){
      $(tdElement+'.'+col+' > input').val(data.comparison[col]);
    }else{
      $(tdElement+'.'+col).text(data.comparison[col]);
    }
  }

  //現況與建議事項
  for(var col in data.suggestion){
    var tdElement = `#page-${(8*(item)+10)} > .border > .suggestion > tbody > tr > .${col} > input`;
    $(tdElement).val(data.suggestion[col]);
  }
}