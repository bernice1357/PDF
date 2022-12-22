var len = report.all_report_info.hostname.length;

$('#update').click(function () {
  //每份 copy
  for(var item=0; item<len; item++){
    var data = report.reports[item];
    //資料庫問題彙總與上一期比較
    var tdElement = `#page-${(8*(item)+10)} > .border > .comparison > tbody > .content > `;
    for(var col in data.comparison){
      if(col!=="event"){
        test.push({ col : $(tdElement+`.${col}`+'> input').val() });
      }else continue;
    }
    // console.log(data);
    //現況與建議事項
    // for(var i in data.suggestion){
    //   report.reports[item].info.comparion[item] = document.querySelector(`#${item}`+'> input').value;
    // }
    // for(var i=1; i<15; i++){
    //   report.reports[item].suggestion['s'+String(i)] = document.getElementById('i'+String(i)).value;
    // }
  }
});