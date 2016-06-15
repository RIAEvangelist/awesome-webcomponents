'use strict';

awesome.requireCSS(`${awesome.path}components/widgets/awesome-timer.css`);

(
    function(){

        const defaults={
            initial_time:60000,
            current_time: 0,
            delay:500
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-timer';
        component.extends='BaseComponent';

        component.create=function createAwesomeTimer(){
            return class AwesomeTimer extends awesome.component.BaseComponent{

                createdCallback(){
                    super.createdCallback();
                    this.mergeDataset(defaults);
                    this.classList.add(AwesomeTimer.elementTagName);
                    this.careAbout(
                        'data-initial_time',
                        'data-current_time'
                    );

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
                    super.attachedCallback();

                    window.on(
                        'awesome-language-set',
                        this.createdCallback.bind(this)
                    );

                    this.timeout = null;
                    this.dataset.current_time = this.dataset.initial_time;
                }

                detachedCallback(){
                    super.detachedCallback();
                    clearTimeout(this.timeout);
                    this.timeout = null;
                }

                update(){
                    this.createdCallback();
                }

                start(){
                    if(this.dataset.current_time == 0){
                        return false;
                    }
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(
                        this.decreaseTime.bind(this),
                        this.dataset.delay
                    );
                }

                decreaseTime(){
                    this.dataset.current_time -= this.dataset.delay;
                    if(this.dataset.current_time == 0){
                        this.stop();
                    }
                    this.start();
                }

                stop(){
                    clearInterval(this.timeout);
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
        }

        component.init();
    }
)();
