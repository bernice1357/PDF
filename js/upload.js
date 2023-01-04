var input = document.getElementById('upload');
var message = document.getElementById('upload-message');
var preview = document.getElementById('preview');

input.addEventListener('mouseover', function() {
	input.style.cursor= 'pointer';
	message.className = 'click';
});

input.addEventListener('mouseout', function() {
	message.className = 'unclick';
});

input.addEventListener('change', function() {
	preview.textContent = '';
	//選擇檔案時按取消，就會清除之前選擇的檔案
	if(input.files.length === 0) {
		message.style.display = 'block';
	} 
	//有檔案被上傳
	else {
		//隱藏「點擊上傳檔案」
		message.style.display = 'none';
		//上傳至瀏覽器的檔案
		var file = input.files[0];
		//pdf
		if(file.type.includes('pdf')){
			//local file 需要使用 FileReader 讀取
			var fileReader = new FileReader(); 
			fileReader.onload = function() {
        var typedarray = new Uint8Array(this.result);
				
				//取得要顯示PDF的檔案
        pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
					var pageNumber = 1;
					pdf.getPage(pageNumber).then( function( page ) {
						var viewport = page.getViewport(3);
						var canvas = document.createElement('canvas');
						var context = canvas.getContext('2d');
						canvas.width = viewport.width;
						canvas.height = viewport.height;

						var renderContext = {
							canvasContext: context,
							viewport: viewport
						};
						
						//將PDF內容產生到canvas上
						page.render( renderContext );
						preview.appendChild(canvas);
					})
				});
			}
			fileReader.readAsArrayBuffer(file); 

		//image
		}else if(file.type.includes('image')){
			var pic = document.createElement('img');
			pic.setAttribute('src', window.URL.createObjectURL(file));
			preview.appendChild(pic);
		}
	}
});