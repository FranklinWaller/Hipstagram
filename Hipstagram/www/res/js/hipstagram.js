var hipsta = {
    init: function() {
        this.bindEvents();
    },
    bindEvents: function() {
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
    camera: function() {
        //Fire up the camera!
        navigator.camera.getPicture(onSuccess, onFail, {
            destinationType: Camera.DestinationType.DATA_URL,
            allowEdit: true,
            targetWidth: 512,
            targetHeight: 512
        });
    },
    allImages: {
        getAll: function() {
            var myPhotos = document.getElementById('myPhotos');

            var imageCount = localStorage.getItem('imageCount');

            if (imageCount !== null) {

                var imagesHTML = '';

                for (var i = imageCount; i >= 1; i--) {
                    var image = localStorage.getItem('image' + i);
                    imagesHTML += '<div class="play-card"><img src="' + image + '"></div>';
                }
                ;

                myPhotos.innerHTML = imagesHTML;
            }else{
                myPhotos.innerHTML = 'No images found';
            }
        }
    },
    editor: {

        list: {
            generateMustache: function(){
                var list = '';
            

                for(var i = 1; i < 13; i++){
                    list += '<a href="javascript:void(0)" onclick="hipsta.editor.spawnMustache(\'snor-' + i + '\')">';
                    list += '<img src="res/img/assets/snorren/snor-' + i + '.svg" width="100" height="100"/>';
                    list += '</a>';
                }

                return list;
            }
        },

        applyImage: function() {
            var imageURI = localStorage.getItem('temp');
            var image = document.getElementById('myImage');

            //iOS can't get normal URI's so base64 is better
            image.src = "data:image/jpeg;base64," + imageURI;
        },
        setFilter: function(filterName, filterValue) {
            var image = document.getElementById('imgWrapper');

            if (filterName != 'none') {
                image.style["-webkit-filter"] = filterName + "(" + filterValue + ")";
            } else {
                image.style["-webkit-filter"] = filterName;
            }

        },

        spawnMustache: function(name){

            var mustache = $("<img class='dynamic' style='display:none; width:200px; height:100px;'>");
            mustache.attr('src', 'res/img/assets/snorren/' + name + '.svg');
            mustache.appendTo('#imgWrapper');

            /*mustache.pep({
                constrainTo: 'parent'
            });
            */
           
            mustache.TouchBox({
                resize:true,
                drag:true,
                rotate: true,
                grid_drag:1
            });

            mustache.show();
        },

        save: function(){
            html2canvas($("#imgWrapper"), {
                onrendered: function(canvas) {
                    // canvas is the final rendered <canvas> element
                    var image = document.getElementById('imgWrapper');

					var imageCount = localStorage.getItem('imageCount');

					//First image
					if (imageCount === null) {
						imageCount = 0;
					}

					imageCount++;
					
					localStorage.setItem('imageCount', imageCount);

                    var imageURI = canvas.toDataURL("image/png");
                    
                    var imageCount = localStorage.getItem('imageCount');
                    //image.src = "data:image/jpeg;base64," + imageURI;
                    localStorage.setItem('image' + imageCount, imageURI);


                    window.canvas2ImagePlugin.saveImageDataToLibrary(
                        function(msg){
                            alert('Done');
                        },
                        function(err){
                            alert('Woops. Something went terribry wrong.');
                        },
                        canvas
                    );

                    
                    //window.open(myImage);
                }
            });
        }
    }
};

function onSuccess(imageURI) {
    //Get the amount of images taken with Hipstagram.
    var imageCount = localStorage.getItem('imageCount');

    //First image
    if (imageCount === null) {
        imageCount = 0;
    }

    imageCount++;

    //Keep track of all the images
    localStorage.setItem('temp', imageURI);
    //localStorage.setItem('imageCount', imageCount);

    //All set lets edit it.
    window.location.hash = "#edit";
}

function onFail(message) {
    alert('Failed because: ' + message);
}