'use strict';

awesome.requireCSS(`${awesome.path}components/timer/awesome-timer.css`);

(
    function(){

        const defaults={
            initial_time:'60000',
            current_time: '0'
        }

        function init(e){
            window.off(
                'awesome-ready',
                init
            );

            document.registerElement(
                'awesome-timer',
                Component
            );
        }

        class Component extends HTMLElement{

            createdCallback(){
                awesome.mergeDataset(this,defaults);
                this.innerHTML=`
                    <div>
                        ${awesome.language.current.timeleft}:
                    </div>
                    <p>
                        ${this.getMinutes()}:${this.getSeconds()}
                    </p>
                `;
            }

            attachedCallback(){
                window.on(
                    'awesome-language-set',
                    this.createdCallback.bind(this)
                );

                this.timerInterval = null;
                this.dataset.current_time = this.dataset.initial_time;
            }

            detachedCallback(){
                clearTimeout(this.timerInterval);
                this.timerInterval = null;
            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            update(){
                this.createdCallback();
            }

            start(){
                if(this.dataset.current_time == '0'){
                    return false;
                }
                clearInterval(this.timerInterval);
                this.timerInterval = setTimeout(
                    this.decreaseTime.bind(this),
                    100
                );
            }

            decreaseTime(){
                this.dataset.current_time -= 100;
                if(this.dataset.current_time == '0'){
                    this.stop();
                }
                this.start();
            }

            stop(){
                clearInterval(this.timerInterval);
            }

            reset(){
                this.stop();
                this.dataset.current_time = this.dataset.initial_time;
            }

            getMinutes(){
                let minutes = Math.floor(this.dataset.current_time / (60* 1000));
                if(minutes <= 9){
                    minutes =`0${minutes}`;
                }
                return minutes;
            }

            getSeconds(){
                let seconds = Math.floor(((this.dataset.current_time/ (60*1000)) % 1) * 60);
                if(seconds <= 9){
                    seconds =`0${seconds}`;
                }
                return seconds;
             }
        }

        if(!awesome.ready){
            window.on(
                'awesome-ready',
                init
            );

            return;
        }

        init();
    }
)();
