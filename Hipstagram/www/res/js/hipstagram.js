

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
			navigator.camera.getPicture(onSuccess, onFail, {});
		},

		editor: {
			applyImage: function(){
				var imageURI = localStorage.getItem('image');
				var image = document.getElementById('myImage');
				image.src = imageURI;
			},

			setFilter: function(){
				var image = document.getElementById('myImage');
				image.style["-webkit-filter"] = "sepia(1)";
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
	

