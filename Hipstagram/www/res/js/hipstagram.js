

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
			navigator.camera.getPicture(onSuccess, onFail, {
				quality : 40,
			    allowEdit : false,
			    encodingType : navigator.camera.EncodingType.JPEG, 
			    sourceType : navigator.camera.PictureSourceType.CAMERA,
			    targetWidth : 512,
			    targetHeight : 512
			});
		},

		editor: {
			applyImage: function(){
				var imageURI = localStorage.getItem('image');
				var image = document.getElementById('myImage');
				image.src = imageURI;
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

	var private = {

	};

	function onSuccess(imageURI) {
		//var image = document.getElementById('myImage');
		localStorage.setItem('image', imageURI);
		window.location.href = "templates/editor.html";
		//image.src = imageURI;
	}

	function onFail(message) {
		alert('Failed because: ' + message);
	}
	

