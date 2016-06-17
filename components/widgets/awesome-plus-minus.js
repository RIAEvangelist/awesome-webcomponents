'use strict';

awesome.requireCSS(`${awesome.path}components/widgets/awesome-plus-minus.css`);
awesome.requireScript(`${awesome.path}components/ball/awesome-ball.js`);

(
    function(){

        const defaults = {
            set_action: '',
            reset_action: ''
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-plus-minus';
        component.extends='AwesomeBall';

        component.create=function creatAwesomePlusMinus(){


            const action=awesome.constants.action;
            const dispatcher=awesome.dispatchers.component;

            return class AwesomePlusMinus extends awesome.component.AwesomeBall{
                createdCallback(){
                    super.createdCallback();
                    this.mergeDataset(defaults)
                    this.classList.add(AwesomePlusMinus.elementTagName);

                    this.localize(
                        'set',
                        'reset'
                    );

                    this.innerHTML += `
                        <div
                            class = 'controlFront'
                        >
                        </div>
                        <section
                            class = 'singleIncrementControls target'
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
                        <section class = 'setControls target'>
                            <button
                                id = 'resetButton'
                                class = 'resetButton'
                            >
                                ${this.local.reset}
                            </button>

                            <button
                                id = 'setButton'
                                class = 'setButton'
                            >
                                ${this.local.set}
                            </buton>
                        </section>

                        <input class = 'target'>
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
                }

                clickHandler(e){
                    if(e.target.id === 'ballValue'
                        || e.target.classList.contains('target')
                        || e.target.parentElement.classList.contains('target')
                    ){
                        this.displayExtraControls();
                        document.body.addEventListener(
                            'click',
                            this.optionsHandler.bind(this)
                        );
                    }

                    if(!e.target.id){
                        return;
                    }

                    switch (e.target.id) {
                        case 'incrementButton':
                            this.increment();
                            this.input.value = this.dataset.value;
                            break;
                        case 'decrementButton':
                            this.decrement();
                            this.input.value = this.dataset.value;
                            break;
                        case 'setButton':
                            if(!action[this.dataset.set_action]){
                                //@TODO : good these are here, but these warnings suck
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
                                //@TODO : good these are here, but these warnings suck
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
                    if(e.target.id == 'ballValue'
                        || e.target.classList.contains('target')
                        || e.target.parentElement.classList.contains('target')
                    ){
                        return;
                    }

                    document.querySelector('body').removeEventListener(
                        'click',
                        this.optionsHandler.bind(this)
                    );

                    this.hideExtraControls();
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
                    //@TODO do CSS IN CSS! not javascript unless really needed in javascript. use 1 class on the parent and adjust the children with it
                    this.input.style.zIndex = -1;
                    this.setControls.style.height = '6em';
                    this.setControls.style.top = 'calc(50% - 3em)';
                }
            }
        }

        component.init();
    }
)();
