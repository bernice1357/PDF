function update() {
  var len = report.all_report_info.hostname.length;
  //每份 copy
  for(var item=0; item<len; item++){
    var data = report.reports[item];

    //資料庫問題彙總與上一期比較
    var tdElement = `#page-${(8*(item)+10)} > .border > .comparison > tbody > .content > `;
    for(var col in data.comparison){
      if(col!=="event"){
        data.comparison[col] = $(tdElement+`.${col}`+'> input').val();
      }else continue;
    }

    //現況與建議事項
    var tdElement = `#page-${(8*(item)+10)} > .border > .suggestion > tbody > .content > `;
    for(var i in data.suggestion){
      data.suggestion[i] = $(tdElement+`.${col}`+'> input').val();
    }
  }
}