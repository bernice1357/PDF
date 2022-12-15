(function() {
  const script = document.createElement("script");
  script.src = '/Users/bernicechaung/Desktop/page/scripts/jquery-3.5.1.min.js';
  script.type = 'text/javascript';
  script.addEventListener('load', () => {});
  document.head.appendChild(script);
})();

//只需要一次資料
$(document).ready(function(){
  $.getJSON("../json/index.json", function(data){
    $.each( data.reportinfo, function( key, value ) {
      $('#'+key).text(value);
    });
    $.each( data.two, function( key, value ) {
      $('#'+key).text(value);
    });
    $.each( data.comparion, function( key, value ) {
      if(key!="event"){
        $('#'+key+'> input').val(value);
      }else{
        $('#'+key).text(value);
      }
    });
    $.each( data.suggestion, function( key, value ) {
      $('#'+key+'> input').val(value);
    });
  });
});

//系統使用空間
$(document).ready(function(){
  $.getJSON("../json/index.json", function(data){
    var tableContent = "<tr class=\"header\"><th>Filesystem</th><th>Size</th><th>Used</th><th>Avail</th><th>Use%</th><th>Mounted</th></tr>";
    for(var i in data.system){
      tableContent += "<tr><td>"+data.system[i].file
      tableContent += "</td><td>"+data.system[i].size
      tableContent += "</td><td>"+data.system[i].used
      tableContent += "</td><td>"+data.system[i].avail
      tableContent += "</td><td>"+data.system[i].percent
      tableContent += "</td><td>"+data.system[i].mounted+"</td></tr>";
      document.getElementById('system').innerHTML = tableContent ;
    }
  });
});

//表空間使用報告
$(document).ready(function(){
  $.getJSON("../json/index.json", function(data){
    var tableContent = "<tr class=\"header\"><th>Tablespace</th><th>CurrentSize</th><th>Used</th><th>Free</th><th>MaxSize</th><th>Used%</th></tr>";
    for(var i in data.tablespace){
      tableContent += "<tr><td>"+data.tablespace[i].name
      tableContent += "</td><td>"+data.tablespace[i].size
      tableContent += "</td><td>"+data.tablespace[i].used
      tableContent += "</td><td>"+data.tablespace[i].free
      tableContent += "</td><td>"+data.tablespace[i].maxsize
      tableContent += "</td><td>"+data.tablespace[i].percent+"</td></tr>";
      document.getElementById('tablespace').innerHTML = tableContent ;
    }
  });
});

//RMAN備份
$(document).ready(function(){
  $.getJSON("../json/index.json", function(data){
    var tableContent = "<tr class=\"header\"><th>DATE</th><th>STATUS</th></tr>";
    for(var i in data.rman){
      tableContent += "<tr><td>"+data.rman[i].date
      tableContent += "</td><td>"+data.rman[i].status+"</td></tr>";
      document.getElementById('rman').innerHTML = tableContent ;
    }
  });
});

//DataGuard同步機制
$(document).ready(function(){
  $.getJSON("../json/index.json", function(data){
    var tableContent = "<tr class=\"header\"><th>THREAD#</th><th>DEST_ID</th><th>APPLIED</th><th>SEQUENCE#</th><th>TIME</th></tr>";
    for(var i in data.guard){
      tableContent += "<tr><td>"+data.guard[i].thread
      tableContent += "</td><td>"+data.guard[i].dest
      tableContent += "</td><td>"+data.guard[i].applied
      tableContent += "</td><td>"+data.guard[i].sequence
      tableContent += "</td><td>"+data.guard[i].time+"</td></tr>";
      document.getElementById('dataguard').innerHTML = tableContent ;
    }
  });
});

//物件狀態異常報告
$(document).ready(function(){
  $.getJSON("../json/index.json", function(data){
    var tableContent = "<tr class=\"header\"><th>Owner#</th><th>Object Name</th><th>Object Type</th><th>Status</th></tr>";
    if(!data.exception.length){
      $('#messege').text('無效物件與上期相比並無增加。');
      tableContent += "<tr><td>"+' '
      tableContent += "</td><td>"+' '
      tableContent += "</td><td>"+' '
      tableContent += "</td><td>"+' '+"</td></tr>";
      document.getElementById('abnormal').innerHTML = tableContent ;
    }else{
      for(var i in data.exception){
        tableContent += "<tr><td>"+data.exception[i].owner
        tableContent += "</td><td>"+data.exception[i].name
        tableContent += "</td><td>"+data.exception[i].type
        tableContent += "</td><td>"+data.exception[i].status+"</td></tr>";
        document.getElementById('abnormal').innerHTML = tableContent ;
      }
    }
  });
});

//效能分析說明
$(document).ready(function(){
  $.getJSON("../json/index.json", function(data){
    var tableContent = "<tr class=\"header\"><th>項目</th><th>數值</th><th>狀態</th></tr>";
    for(var i in data.efficacy){
      tableContent += "</td><td>"+data.efficacy[i].item
      tableContent += "</td><td>"+data.efficacy[i].num
      tableContent += "</td><td>"+data.efficacy[i].status+"</td></tr>";
      document.getElementById('effect').innerHTML = tableContent ;
    }
  });
});

//TOP SQL
$(document).ready(function(){
  $.getJSON("../json/index.json", function(data){
    var tableContent = "<tr class=\"header\"><th>Elapsed Time(s)</th><th>Execution</th><th>Elap per Exec(s)</th><th>SQL Id</th><th>SQL Text</th></tr>";
    for(var i in data.sql){
      tableContent += "<tr><td>"+data.sql[i].time
      tableContent += "</td><td>"+data.sql[i].exec
      tableContent += "</td><td>"+data.sql[i].elap
      tableContent += "</td><td>"+data.sql[i].id
      tableContent += "</td><td>"+data.sql[i].text+"</td></tr>";
      document.getElementById('sql').innerHTML = tableContent ;
    }
  });
});