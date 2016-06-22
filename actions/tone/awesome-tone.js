'use strict';

awesome.requireScript(`${awesome.path}dispatchers/action.js`);
awesome.requireScript(`${awesome.path}actions/constants.js`);
awesome.requireScript(`${awesome.path}stores/constants.js`);

(
    function AwesomeTone(){
        const dispatcher = awesome.dispatchers.action;
        const constants = awesome.constants.action;
        const storeEvents = awesome.constants.store;

        function init( e ) {
            window.off(
                'awesome-ready',
                init
            );

            dispatcher.on(
                constants.TONE_PLAY,
                playTone
            );

        }

        function playTone(data){
            const context = new AudioContext();
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(context.destination);

            oscillator.frequency.value = data.frequency;
            gainNode.gain.value = data.gain;
            oscillator.start();

            oscillator.stop(data.duration/1000);
            oscillator.onended = function closeContext(){
               context.close();
            };
        }

        if(!awesome.ready){
            window.on(
                'awesome-ready',
                init
            );
            return true;
        }

        init();
    }
)();
