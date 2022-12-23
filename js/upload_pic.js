var input = document.getElementById('upload');

input.addEventListener('change', function() {
	while(preview.firstChild) {
		console.log(1111);
		preview.removeChild(preview.firstChild);
	}

	//no uploaded files
	if(input.files.length === 0) {
		$('#preview').append($('p').text('未選擇任何檔案'));
	} 
	//files uploaded
	else {
		console.log(input.files[0].type);
		if(input.files[0].type.includes('pdf')){

		}else if(input.files[0].type.includes('image')){

		}

		var para = document.createElement('p');
		var image = document.createElement('img');
		image.src = window.URL.createObjectURL(input.files[0]);
		preview.appendChild(image);
		preview.appendChild(para);
	}
});