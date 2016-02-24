/**************************************\
This module operates outside the law!

DON'T COPY HOW THIS WORKS!

Abide by the law and use the boilerplate!
\**************************************/
var shared=require('../shared.js');
var actionDispatcher=require('../../dispatchers/default.js').ActionDispatcher;

var store=new shared.Store;
store.ignoreResetEvent=true;
store.state={
    isRecording:false,
    events:[],
    play:replay,
    export:exportJSON,
    start:record,
    stop:stop,
    clear:clear,
    goTo:goToEvent
};

const START_TIME=new Date().getTime();

function record(){
    if(store.state.isRecording){
        return;
    }
    if(store.state.events.length){
        goToEvent(store.state.events.length-1);
    }
    shared.dispatcher.on(
        '*',
        save
    );
    store.state={
        isRecording:true
    };
}

function stop(){
    shared.dispatcher.off(
        '*',
        save
    );
    store.state={
        isRecording:false
    };
}

function save(type,message){
    var data={};
    data.timestamp=new Date().getTime()-START_TIME;
    data.type=type;
    data.message=Object.assign({},message);
    delete data.JSON;
    delete data.message.JSON;

    //data=JSON.stringify(data);
    var events=store.state.events;
    events.push(data);
    store.state={
        events:events
    }
}

function replay(){
    stop();

    var total=store.state.events.length;

    //calculate time offset here with 2 timestamps : for loop will add in some delay
    //
    //stop recording process during playback
    //
    //probably make queue of timeouts to either STOP them
    //OR to know when complete.

    for(var i=0; i<total; i++){
        setTimeout(
            function(){
                replayEvent(this);
            }.bind(store.state.events[i]),
            store.state.events[i].timestamp
        );
    }
}

function replayEvent(event){
    actionDispatcher.trigger(
        event.type,
        event.message
    );
}

function exportJSON(){
    console.log(
        JSON.stringify(store.state.events)
    );
}

function clear(){
    var events=store.state.events;
    events.splice(0,events.length);
    store.state={
        events:events
    }
}

function goToEvent(index){
    stop();
    for(var i=0; i<index; i++){
        console.log(i,index);
        replayEvent(store.state.events[i]);
    }
}

module.exports=store.exposedState;
