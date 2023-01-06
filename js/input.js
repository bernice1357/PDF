function inputClick(event){
    
    var datalists = document.querySelectorAll('datalist');
    for(let i=0;i<datalists.length;i++){
        datalists[i].style.display = 'none';
    }
    // $('datalist').="none";
    // if()

    //抓到被點選的 input
    var input = event.target;
    //抓到被點選 input 下的 datalist
    var datalist = event.target.parentElement.children[1];
    datalist.style.display = 'block';

    //有幾個 option 就開幾個 listener
    for (let option of datalist.options) {
        option.onclick = function () {
            input.value = option.value;
            datalist.style.display = 'none';
        }
    };

    //監聽 input 輸入動作
    input.oninput = function() {
        currentFocus = -1;

        //input 中有值才顯示 datalist
        if(input.value===''){
            datalist.style.display = 'block';
        }else{
            datalist.style.display = 'none';
        }
    }

    //TODO:改hover、PDF樣式

    //判斷鍵盤動作
    var currentFocus = -1;
    input.onkeydown = function(e) {
        if(e.keyCode == 40){//向下箭頭
            currentFocus++
            addActive(datalist.options);
        }
        else if(e.keyCode == 38){//向上箭頭
            currentFocus--
            addActive(datalist.options);
        }
        else if(e.keyCode == 13){//enter
            e.preventDefault();
            if (currentFocus > -1) {
                if (datalist.options) datalist.options[currentFocus].click();
            }
        }
    }

    //增加 classname active
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("active");
    }

    //刪除 classname active
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            //刪除所有 option 的 active
            x[i].classList.remove("active");
        }
    }

    //判斷點到 input 或 datalist 外的地方 datalist 會隱藏
    window.onclick = function(event) { 
        if(datalist.style.display=="block"
        && !(event.target===input || event.target===datalist)) {
            datalist.style.display = "none";
        }        
    }
}

