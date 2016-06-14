'use strict';

awesome.requireCSS(`${awesome.path}components/controls/awesome-number-control.css`);
awesome.requireScript(`${awesome.path}components/ball/awesome-ball.js`);
(
    function(){

        function init(){
            window.off(
                'awesome-ready',
                init
            );

            const action=awesome.constants.action;
            const dispatcher=awesome.dispatchers.component;

            class AwesomeNumberControl extends awesome.component.AwesomeBall{
                createdCallback(){
                    this.defaults = {
                        set_action: '',
                        reset_action: ''
                    }
                    super.createdCallback();
                    this.classList.add(AwesomeNumberControl.elementTagName);
                    this.innerHTML += `
                        <div
                            class = 'controlFront'
                        >
                        </div>
                        <section>
                            <button
                                class = 'awesomeNumberControlElement'
                            >
                                -
                            </button>
                            <button
                                class = 'awesomeNumberControlElement'
                            >
                                +
                            </button>
                        </section>
                        <input class = 'awesomeNumberControlElement'>
                    `;
                    this.input = this.querySelector('input');
                    this.ballValue = this.querySelector('.ballValue');
                }

                attachedCallback(){
                    super.attachedCallback();
                    this.addEventListener(
                        'click',
                        this.clickHandler.bind(this)
                    );
                }

                detachedCallback(){
                    super.detachedCallback();
                    this.removeEventListener(
                        'click',
                        this.clickHandler.bind(this)
                    );
                }

                clickHandler(e){
                    if(e.target.id == 'ballValue' || e.target.classList.contains('awesomeNumberControlElement')){
                        this.displayExtraControls();
                        document.body.addEventListener(
                            'click',
                            this.optionsHandler
                        );
                    }
                }

                optionsHandler(e){
                    const numberControl = this.querySelector('awesome-number-control');
                    if(e.target.id == 'ballValue' || e.target.classList.contains('awesomeNumberControlElement')){
                        return;
                    }
                    this.removeEventListener(
                        'click',
                        numberControl.optionsHandler
                    );
                    numberControl.hideExtraControls();
                }

                displayExtraControls(){
                    this.input.value = this.dataset.value;
                    this.input.style.zIndex = 4;
                }

                hideExtraControls(){
                    this.dataset.value = this.input.value;
                    super.update();
                    this.input.style.zIndex = -1;
                }

            }

            AwesomeNumberControl.elementTagName='awesome-number-control';
            awesome.register(
                AwesomeNumberControl
            );
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
