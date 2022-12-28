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
  $('#update').css("display","none");
  $('#export').css("display","none");
  $('#upload').css("display","none");
});

//列印之後
window.addEventListener('afterprint', () => {

  //每份複製
  for(var item=0; item<len; item++){

    var tdElement = `#page-${(8*(item)+10)} > .border > .comparison > tbody > .content > `;
    //資料庫問題彙總與上一期比較
    for(var col in report.reports[item].comparison){
      if(col!=="event"){
        var data = $(tdElement+'.'+col).text();
        $(tdElement+'.'+col).text('');
        //新的元素
        const newE = document.createElement('input');
        newE.setAttribute('class','cinput');
        //加回去
        $(tdElement+'.'+col).append(newE);
        $(tdElement+'.'+col+' > input').val(data);
      }else continue;
    }

    //現況與建議事項
    for(var col in report.reports[item].suggestion){
      var tdElement = `#page-${(8*(item)+10)} > .border > .suggestion > tbody > tr > .${col}`;
      var data = $(tdElement).text();
      $(tdElement).text('');
      //新的元素
      const newE = document.createElement('input');
      newE.setAttribute('class','sinput');
      //加回去
      $(tdElement+'.'+col).append(newE);
      $(tdElement+' > input').val(data);
    }
  }
  $('#update').css("display","inline");
  $('#export').css("display","inline");
  $('#upload').css("display","inline");
});