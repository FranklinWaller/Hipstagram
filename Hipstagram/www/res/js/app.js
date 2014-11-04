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
    var newTabs = document.getElementById('tabs');
    var newHeader = document.getElementById('header');
    var currentTabs = body.getElementsByClassName('play-tabs')[0];
    var currentHeader = body.getElementsByClassName('play-header')[0];
    
    currentTabs.innerHTML = newTabs.innerHTML;
    currentHeader.innerHTML = newHeader.innerHTML;
    hipsta.editor.applyImage();
});

phase.controller('AllImagesController', function(){
    hipsta.allImages.getAll();
});

