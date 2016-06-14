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
                    this.reset = awesome.language.current.reset;
                    this.set = awesome.language.current.set;
                    this.innerHTML += `
                        <div
                            class = 'controlFront'
                        >
                        </div>
                        <section
                            class = 'singleIncrementControls'
                        >
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
                        <section class = 'setControls'>
                            <button
                                class = 'resetButton awesomeNumberControlElement'
                            >
                                ${this.reset}
                            </button>

                            <button
                                class = 'setButton awesomeNumberControlElement'
                            >
                                ${this.set}
                            </buton>
                        </section>

                        <input class = 'awesomeNumberControlElement'>
                    `;
                    this.input = this.querySelector('input');
                    this.setControls = this.querySelector('.setControls');
                    this.ballValue = this.querySelector('.ballValue');
                }

                attachedCallback(){
                    super.attachedCallback();
                    this.addEventListener(
                        'click',
                        this.clickHandler.bind(this)
                    );

                    window.on(
                        'awesome-language-set',
                        this.updateLanguage.bind(this)
                    );
                }

                detachedCallback(){
                    super.detachedCallback();
                    this.removeEventListener(
                        'click',
                        this.clickHandler.bind(this)
                    );

                    window.off(
                        'awesome-language-set',
                        this.updateLanguage.bind(this)
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
                    this.input.focus();
                    this.input.style.zIndex = 4;
                    this.setControls.style.height = '12em';
                    this.setControls.style.top = 'calc(50% - 6em)';
                }

                hideExtraControls(){
                    this.dataset.value = this.input.value;
                    this.update();
                    this.input.style.zIndex = -1;
                    this.setControls.style.height = '6em';
                    this.setControls.style.top = 'calc(50% - 3em)';
                }

                updateLanguage(){
                    if(this.reset == awesome.language.current.reset
                        && this.set == awesome.language.current.set
                    ){
                        return
                    }

                    this.createdCallback();
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
