var input = document.getElementById('upload');

$('#show-pdf-button').remove();
$('#pdf-main-container').remove();
// var nodes = $('body')[0].childNode s; 
$('body')[0].childNodes[4].nodeValue = "";

input.addEventListener('change', function() {
	//選擇檔案時按取消
	if(input.files.length === 0) {
		console.log('no files');
		$('#preview > p').css('display','block');
		$('#preview > img').css('display','none');
		$('#preview > canvas').css('display','none');
	} 
	//有檔案被上傳
	else {
		//隱藏「點擊上傳檔案」
		$('#preview > p').css('display','none');
		//上傳至瀏覽器的檔案
		var file = input.files[0];

		//pdf
		if(file.type.includes('pdf')){
			$('#preview > img').css('display','none');
			$('#preview > canvas').remove();

			//local file 需要使用 FileReader 讀取
			var fileReader = new FileReader(); 
			fileReader.onload = function() {
        var typedarray = new Uint8Array(this.result);
				//取得要顯示PDF的檔案
        pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
					var pageNumber = 1;
					pdf.getPage(pageNumber).then( function( page ) {
						var scale = 1.2;
						var viewport = page.getViewport( scale );
						var canvas = document.createElement('canvas');
						var context = canvas.getContext( "2d" );
						canvas.height = 1020;
						canvas.width = 720;

						var renderContext = {
							canvasContext: context,
							viewport: viewport
						};
						
						//將PDF內容產生到canvas上
						page.render( renderContext );
						document.getElementById('preview').appendChild(canvas);
					})
				});
			}
			fileReader.readAsArrayBuffer(file); 

		//image
		}else if(file.type.includes('image')){
			$('#preview > canvas').css('display','none');
			$('#preview > img').css('display','block');
			$('#preview > img').attr('src',window.URL.createObjectURL(file));
		}
	}
});