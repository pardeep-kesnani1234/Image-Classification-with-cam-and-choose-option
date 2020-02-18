window.imge = "global";   // Declare a global variable

function take_snapshot() {
	imge="";
	// take snapshot and get image data
	Webcam.snap( function(data_uri) {
	// display results in page
	document.getElementById('imagePreview').innerHTML = '<img src="'+data_uri+'"/>';
	imge = data_uri
 	
	function saveBase64AsFile(base64, fileName) 
	{

    	var link = document.createElement("a");

    	link.setAttribute("href", base64);
    	link.setAttribute("download", fileName);
    	link.click();
	}
	saveBase64AsFile(base64=data_uri, fileName="nonenone.jpeg")


	
	console.log(data_uri);
 
			} );
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
	$('#my_camera').hide();
 	$('#IntCamera').show();
 	//Webcam.off();
 	
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
	
 	Webcam.set({
			width: 240,
			height: 240,
			image_format: 'jpeg',
			jpeg_quality: 90
		});
		Webcam.attach( '#my_camera' );

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

    // upload predict 
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);
	//var array = form_data1.split(" ");
	//var form_data1 = array;  
	console.log('Suc');
        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
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



 // capture predict
    $('#btn-predict-capture').click(function () {
        var form_data = new FormData($('#capture-file')[0]);
	//var array = form_data1.split(" ");
	//var form_data1 = array;  
	console.log('Suc');
        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict-capture',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
		 // Get and display the result
		$('#imageCapture').hide();
	 	$('#IntCamera').show();
		
                // Get and display the result
                $('.loader').hide();
                $('#label').fadeIn(600);
                $('#label').text(' Prediction:  ' + data.split(",")[0] );
		$('#conf').fadeIn(600);
                $('#conf').text(' Confidence:  ' + data.split(",")[1] );
                console.log('Success!');
            },
        });
    });


});
