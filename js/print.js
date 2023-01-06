//列印前後畫面會有一點改變

$('#export_pdf').click(function () {
  update();
  window.print();
})

//列印之前
window.addEventListener('beforeprint', () => {
  var len = report.all_report_info.hostname.length;
  var tdElement = $('.comparison > tbody > .content > td').children().css('display', 'none');

  //判斷有沒上傳檔案
  if(!input.files.length){
    $('.upload-border').append('<p>未上傳任何檔案</p>');
  }

  //每份複製
  for(var item=0; item<len; item++){

    var tdElement = `#page-${(8*(item)+10)} > .normal-border > fieldset > .comparison > tbody > .content > td`;

    //資料庫問題彙總與上一期比較
    for(var col in report.reports[item].comparison){
      if(col!=="event"){
        var data = $(tdElement+'> .'+col).val();
        $(tdElement+'> input').css('display', 'none');
        $(tdElement+'> .'+col).parent().append('<p>'+data+'</p>');
      }else continue;
    }

    var tdElement = `#page-${(8*(item)+10)} > .normal-border > fieldset > .suggestion > tbody > tr > td`;
    //現況與建議事項
    for(var col in report.reports[item].suggestion){
      var data = $(tdElement+'> .'+col).val();
      $(tdElement+'> input').css('display', 'none');
      $(tdElement+'> .'+col).parent().append('<p>'+data+'</p>');
      $(tdElement+'> p').css('margin', 0);
    }
  }
  $('.btnBlock').css("display","none");
});

//列印之後
window.addEventListener('afterprint', () => {

  //判斷有沒上傳檔案
  if(!input.files.length){
    $('.upload-border > p').remove();
  }

  //每份複製
  for(var item=0; item<len; item++){

    var data = report.reports[item];
    var tdElement = `#page-${(8*(item)+10)} > .normal-border > fieldset > .comparison > tbody > .content > td`;

    //資料庫問題彙總與上一期比較
    for(var col in data.comparison){
      if(col!=="event"){
        $(tdElement+'> input').css('display', 'flex');
        $(tdElement+'> p').remove();
      }else continue;
    }
    
    var tdElement = `#page-${(8*(item)+10)} > .normal-border > fieldset > .suggestion > tbody > tr > td`;
    //現況與建議事項
    for(var col in data.suggestion){
      $(tdElement+'> input').css('display', 'flex');
      $(tdElement+'> p').remove();
    }
  }
  $('.btnBlock').css("display","block");
});