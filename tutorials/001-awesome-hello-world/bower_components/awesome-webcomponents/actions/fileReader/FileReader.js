var shared=require('../shared.js');


shared.dispatcher.on(
    shared.actions.GENERIC_DRAG_DROP_FILE,
    updateDragAndDropDrop
);

function fileRead(message, index, e) {
    var fileMessage = new shared.Message;
    fileMessage.type = message.type;
    fileMessage.data.file = message.data.files[index];
    fileMessage.data.result = e.target.result;

    //Added support for reading JSON files. Object can be used as needed here
    var type = message.data.files[index].name.split('.').pop();
    switch(type){
        case 'json':
            fileMessage.data.object =JSON.parse(e.target.result);
            break;
    }

    shared.dispatcher.trigger(
        shared.storeEvents.READ_DROPPED_FILE,
        fileMessage
    );
}

function updateDragAndDropDrop(message) {
    for (var i = 0; i < message.data.files.length; i++) {
        var reader = new FileReader();
        reader.addEventListener(
            'load',
            fileRead.bind(null, message, i)
        );

        switch(message.data.files[i].type){
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
                reader.readAsDataURL(message.data.files[i]);
                break;
            case 'text/plain':
            case 'text/xml':
                reader.readAsText(message.data.files[i]);
                break;
            default:
                reader.readAsText(message.data.files[i]);
                break;
        }
    }
}

/****************************************\
    actions are not really modules
    we just export them as modules to be
    required in the actions.js which is
    included in the app.js file to init
    all of the required actions.

    all communication is done via a
    dispatcher.
\****************************************/
module.exports=true;
