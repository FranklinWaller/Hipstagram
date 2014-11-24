phase.routes({
    "edit": {
        url: 'templates/editor.html',
        controller: 'EditorController'
    },
    
    "all" : {
        url: 'templates/all.html',
        controller: 'AllImagesController'
    }
});

phase.controller('EditorController', function() {
    var body = phase.getContainer().parentNode;
    var newTabs = document.getElementById('temp-sub');
    var newHeader = document.getElementById('header');
    var currentTabs = body.getElementsByClassName('play-tabs')[0];
    var editorTabMenu = document.getElementById('temp-sub');
    var currentHeader = body.getElementsByClassName('play-header')[0];
    
    currentTabs.innerHTML = newTabs.innerHTML;
    editorTabMenu.innerHTML = hipsta.editor.list.generateMustache();
    currentHeader.innerHTML = newHeader.innerHTML;
    hipsta.editor.applyImage();
    //End init

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    var img = document.getElementById('myImage');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var img = document.getElementById('myImage');

    var windowHeight = window.height;
    var imageHeight = windowHeight - 45 - 51 - 141;
    img.style.height = imageHeight + "px";

    img.onload = function(){
        context.drawImage(img, 0, 0);
    };
});

phase.controller('AllImagesController', function(){
    hipsta.allImages.getAll();
});

