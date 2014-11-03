var hipsta = {

	init: function(){
		this.bindEvents();
	},

	bindEvents: function(){
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	onDeviceReady: function() {
    	app.receivedEvent('deviceready');				
	},

	receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
	},

	camera: function(){
		//Fire up the camera!
		navigator.camera.getPicture(onSuccess, onFail, {
			destinationType: Camera.DestinationType.DATA_URL,
		    targetWidth : 512,
		    targetHeight : 512
		});
	},

	allImages: {
		getAll: function(){
			var myPhotos = document.getElementById('myPhotos');

			var imageCount = localStorage.getItem('imageCount');

			if(imageCount !== null){

				var imagesHTML = '';

				for (var i = imageCount; i >= 0; i--) {
					var image = localStorage.getItem('image' + i);
					imagesHTML += '<img src="data:image/jpeg;base64,' + image + '">';
				};

				myPhotos.innerHTML = imagesHTML;
			}
		}
	},

	editor: {
		applyImage: function(){
			var imageCount = localStorage.getItem('imageCount');
			var imageURI = localStorage.getItem('image' + imageCount);
			var image = document.getElementById('myImage');

			//iOS can't get normal URI's so base64 is better
			image.src = "data:image/jpeg;base64," + imageURI;
		},

		setFilter: function(filterName, filterValue){
			var image = document.getElementById('myImage');

			if(filterName != 'none'){
				image.style["-webkit-filter"] =  filterName + "(" + filterValue + ")";
			}else{
				image.style["-webkit-filter"] =  filterName;
			}
			
		}
	}
};

function onSuccess(imageURI) {
	//Get the amount of images taken with Hipstagram.
	var imageCount = localStorage.getItem('imageCount');

	//First image
	if(imageCount === null){
		imageCount = 0;
	}

	imageCount++;

	//Keep track of all the images
	localStorage.setItem('image' + imageCount, imageURI);
	localStorage.setItem('imageCount', imageCount);

	//All set lets edit it.
	window.location.href = "templates/editor.html";
}

function onFail(message) {
	alert('Failed because: ' + message);
}