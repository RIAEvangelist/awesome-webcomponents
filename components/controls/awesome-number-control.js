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
                        <section
                            class = 'singleIncrementControls awesomeNumberControlElement'
                        >
                            <button
                                id = 'decrementButton'
                            >
                                -
                            </button>
                            <button
                                id = 'incrementButton'
                            >
                                +
                            </button>
                        </section>
                        <section class = 'setControls awesomeNumberControlElement'>
                            <button
                                id = 'resetButton'
                                class = 'resetButton'
                            >
                                ${this.reset}
                            </button>

                            <button
                                id = 'setButton'
                                class = 'setButton'
                            >
                                ${this.set}
                            </buton>
                        </section>

                        <input class = 'awesomeNumberControlElement'>
                    `;
                    this.input = this.querySelector('input');
                    this.setControls = this.querySelector('.setControls');
                    this.ballValue = this.querySelector('.ballValue');

                    this.setButton = this.querySelector('.setButton');
                    this.resetButton = this.querySelector('.resetButton');

                    this.input.addEventListener(
                        'change',
                        this.changeHandler.bind(this)
                    );
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

                    this.input.removeEventListener(
                        'change',
                        this.changeHandler.bind(this)
                    );

                    window.off(
                        'awesome-language-set',
                        this.updateLanguage.bind(this)
                    );
                }

                clickHandler(e){
                    if(e.target.id == 'ballValue'
                        || e.target.classList.contains('awesomeNumberControlElement')
                        || e.target.parentElement.classList.contains('awesomeNumberControlElement')
                    ){
                        this.displayExtraControls();
                        document.body.addEventListener(
                            'click',
                            this.optionsHandler
                        );
                    }
                    switch (e.target.id) {
                        case 'incrementButton':
                            super.increment();
                            this.input.value = this.dataset.value;
                            break;
                        case 'decrementButton':
                            super.decrement();
                            this.input.value = this.dataset.value;
                            break;
                        case 'setButton':
                            if(!action[this.dataset.set_action]){
                                console.warn('No action constant of data-set_action has been defined!');
                                return;
                            }
                            dispatcher.trigger(
                                action[this.dataset.set_action],
                                true
                            );
                            break;
                        case 'resetButton':
                            if(!action[this.dataset.reset_action]){
                                console.warn('No action constant of data-reset_action has been defined!');
                                return;
                            }
                            dispatcher.trigger(
                                action[this.dataset.reset_action],
                                true
                            );
                            break;
                        default:
                            break;
                    }
                }

                changeHandler(e){
                    this.dataset.value = this.input.value;
                }

                optionsHandler(e){
                    const numberControl = this.querySelector('awesome-number-control');

                    if(e.target.id == 'ballValue'
                        || e.target.classList.contains('awesomeNumberControlElement')
                        || e.target.parentElement.classList.contains('awesomeNumberControlElement')
                    ){
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
                    this.setControls.style.height = '13em';
                    this.setControls.style.top = 'calc(50% - 6.5em)';
                }

                hideExtraControls(){
                    this.dataset.value = this.input.value;
                    this.update();
                    this.input.style.zIndex = -1;
                    this.setControls.style.height = '6em';
                    this.setControls.style.top = 'calc(50% - 3em)';
                }

                updateLanguage(){
                    if(this.resetButton.innerHTML.trim() == awesome.language.current.reset
                        && this.setButton.innerHTML.trim() == awesome.language.current.set
                    ){
                        return;
                    }

                    this.setButton.innerHTML = awesome.language.current.set;
                    this.resetButton.innerHTML = awesome.language.current.reset;
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
