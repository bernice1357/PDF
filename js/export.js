$("#export_json").click(function() {

  update();
  //把 report 轉換成 json 格式
  var data = JSON.stringify(report, null, '\t');
  // console.log(data);
  data = 'var report = ' + data;

  var blob = new Blob([data], {type: 'application/json'});
  url = URL.createObjectURL(blob);

  var link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'report.json');

  var event = new MouseEvent('click');
  link.dispatchEvent(event);

}) 