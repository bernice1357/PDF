$('#export').click(function () {
  window.print();
})


//列印之前
window.addEventListener('beforeprint', () => {
  var len = report.all_report_info.hostname.length;
  
  //每份複製
  for(var item=0; item<len; item++){

    var tdElement = `#page-${(8*(item)+10)} > .border > .comparison > tbody > .content > `;
    //資料庫問題彙總與上一期比較
    for(var col in report.reports[item].comparison){
      if(col!=="event"){
        var data = $(tdElement+'.'+col+' > input').val();
        $(tdElement+'.'+col+' > input').remove();  
        $(tdElement+'.'+col).text(data);
      }else continue;
    }

    //現況與建議事項
    for(var col in report.reports[item].suggestion){
      var tdElement = `#page-${(8*(item)+10)} > .border > .suggestion > tbody > tr > .${col}`;
      var data = $(tdElement+' > input').val();
      $(tdElement+' > input').remove();  
      $(tdElement).text(data);
    }
  }

  // for(var i=1; i<15; i++){
  //   //舊的元素
  //   const oldE = document.getElementById('s'+String(i));
  //   //新的元素
  //   const newE = document.createElement('td');
  //   newE.innerHTML = info.suggestion['s'+String(i)];
  //   //要換元素的地方
  //   var parent = oldE.parentNode;
  //   //替換
  //   parent.replaceChild(newE, oldE);
  // }

  $('#update').css("display","none");
  $('#export').css("display","none");
});


// document.getElementById('body').contentWindow.window.print();

//列印之後
window.addEventListener('afterprint', () => {
  // for(var i=1; i<15; i++){
  //   //舊的元素
  //   const oldE = document.getElementById('s'+String(i));
  //   //新的元素
  //   const newE = document.createElement('td');
  //   newE.setAttribute("id", 's'+String(i));
  //   newE.innerHTML = `<input id=\"i${i}\" type=\"text\"/>`;
  //   //要換元素的地方
  //   var parent = oldE.parentNode;
  //   //替換
  //   parent.replaceChild(newE, oldE);
  // }
  $('#update').css("display","inline");
  $('#export').css("display","inline");
});