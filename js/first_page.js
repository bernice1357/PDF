//塞第一頁的資料
for(var item in report.all_report_info){
  if(item==="hostname"){
    var host = report.all_report_info.hostname;
    var text = '';
    for(var i in host){
      text += host[i]+'<br>';
    }
    $('#hostname').html(text);
  }else{
    $('#'+item).text(report.all_report_info[item]);
  }
}
