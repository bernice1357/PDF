//塞第一頁的資料
for(var item in report.all_report_info){
  $('#'+item).text(report.all_report_info[item]);
}
