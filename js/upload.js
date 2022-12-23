var input = document.getElementById('upload');

input.addEventListener('change', function() {
	//no uploaded files
	if(input.files.length === 0) {
		console.log('no files');
		$('#preview > p').css('display','block');
		$('#preview > img').css('display','none');
	} 
	//files uploaded
	else {
		$('#preview > p').css('display','none');

		if(input.files[0].type.includes('pdf')){
			console.log('pdf');

			var file = input.files[0];
			var fileReader = new FileReader(); 
			fileReader.onload = function() {
        var typedarray = new Uint8Array(this.result);
        const loadingTask = pdfjsLib.getDocument(typedarray);
        loadingTask.promise.then(
					function( pdf ) {
						console.log( "PDF loaded" );
						var pageNumber = 1;
						pdf.getPage(pageNumber).then( function( page ) {
							console.log( "Page loaded" );
							var scale = 1.5;
							var viewport = page.getViewport( scale );
							var canvas = document.getElementById( "example" );
							var context = canvas.getContext( "2d" );
							canvas.height = viewport.height;
							canvas.width = viewport.width;
							var renderContext = {
								canvasContext: context,
								viewport: viewport
							};
							var renderTask = page.render( renderContext );
							renderTask.then( function () { console.log( "Page rendered" );
						}//, function ( reason ) {
						// 	console.error( reason );
						// })
					}
				)
			}
    	fileReader.readAsArrayBuffer(file); 
		}else if(input.files[0].type.includes('image')){
			$('#preview > img').css('display','block');
			$('#preview > img').attr('src',window.URL.createObjectURL(input.files[0]));
			console.log(input.files);
		}
	}
});