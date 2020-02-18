
    let v = document.getElementById("myVideo");

    //create a canvas to grab an image for upload
    let imageCanvas = document.createElement('canvas');
    let imageCtx = imageCanvas.getContext("2d");

    //Add file blob to a form and post
    function postFile(file) {
        let formdata = new FormData();
        formdata.append("image", file);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/image', true);
        xhr.onload = function () {
            if (this.status === 200)
                console.log("succes");
            else
                console.error(xhr);
        };

        xhr.send(formdata);
	console.log("post image executed");

		
    }

    //Get the image from the canvas
    function sendImagefromCanvas() {

        //Make sure the canvas is set to the current video size
        imageCanvas.width = v.videoWidth;
        imageCanvas.height = v.videoHeight;

        imageCtx.drawImage(v, 0, 0, v.videoWidth, v.videoHeight);
	
	var img = new Image();
	img.onload = function(){
    	imageCtx.drawImage(img, 0, 0);}

        imageCanvas.toBlob(postFile, 'image/jpeg');
	
	document.getElementById('imagePreview').innerHTML =  '<img src="'+img+'"/>';;	

        //Convert the canvas to blob and post the file
        imageCanvas.toBlob(postFile, 'image/jpeg');
	console.log("send image executed");
	console.log(img);	
    }

    
$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#label').hide();
    $('#conf').hide();
    $('#imageCapture').hide();	
 
    
    // Upload Preview
    function readURL(input) {
	document.getElementById('imagePreview').innerHTML = "";	
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#btn-predict-capture').hide();	
        $('#label').text('');
        $('#label').hide();
        $('#conf').text('');
        $('#conf').hide();
	$('#my_camera').hide();
	readURL(this);
 	$('#IntCamera').show();
	$('#imageCapture').hide();	
	
	
	
    });
	
    $("#imageCapture").click(function (e) {
	 	
        $('.image-section').show();
        $('#btn-predict-capture').show();
        $('#btn-predict').hide();
        $('#label').text('');
        $('#label').hide();
        $('#conf').text('');
        $('#conf').hide();
 	//console.log(imge);
	$('#imageCapture').hide();
	$('#myVideo').hide();
 	$('#IntCamera').show();
	sendImagefromCanvas();

 	//Webcam.off();
 	//console.log(v.srcObject)
	/*var im = JSON.stringify(imge);
	im = JSON.parse(im);
	console.log(im);
	$.ajax({
            type: 'POST',
            url: '/send-image',
            data:  im,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                 
                console.log("hello");
            },
	    error: function (e) {
		console.log("E");
}       
 });
    
*/

});

    $("#IntCamera").click(function () {
	


        //Get camera video
        navigator.mediaDevices.getUserMedia({video: {width: 200, height: 240}, audio: false})
            .then(stream => {
                v.srcObject = stream;
            })
            .catch(err => {
                console.log('navigator.getUserMedia error: ', err)
            });


        //$('.image-section').show();
 	$('#IntCamera').hide();	
        $('#btn-predict').hide();
	$('.image-section').hide();
        $('#label').text('');
        $('#label').hide();
        $('#conf').text('');
        $('#conf').hide();
 	//console.log("ok");

	$('#my_camera').show();
    	$('#imageCapture').show();	
 

    });

    /* upload predict 
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);
	//var array = form_data1.split(" ");
	//var form_data1 = array;  
	//console.log(form_data);
        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/image-capture',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
		$('#imageCapture').hide();
	 	$('#IntCamera').show();

                $('.loader').hide();
                $('#label').fadeIn(600);
                $('#label').text(' Prediction:  ' + data.split(",")[0] );
		$('#conf').fadeIn(600);
                $('#conf').text(' Confidence:  ' + data.split(",")[1] );
                console.log('Success!');
            },
        });
    });

*/

 // capture predict
    $('#btn-predict-capture').click(function () {
	console.log('Suc1');
        var form_data1 = new FormData($('#capture-file')[0]);
	//var array = form_data1.split(" ");
	//var form_data1 = array;
	console.log(form_data1);
  
	console.log('Suc2');
        // Show loading animation
        $(this).hide();
        $('.loader').show();
	//console.log('Suc3!');
        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5000/image',
            data1: form_data1,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data1) {
		 // Get and display the result
		$('#imageCapture').hide();
	 	$('#IntCamera').show();
		console.log('Suc4!');
                // Get and display the result
                $('.loader').hide();
                $('#label').fadeIn(600);
                $('#label').text(' Prediction:  ' + data1.split(",")[0] );
		$('#conf').fadeIn(600);
                $('#conf').text(' Confidence:  ' + data1.split(",")[1] );
                console.log('Success!');
            },
        });
    });


});
