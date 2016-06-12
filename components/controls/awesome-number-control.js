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
                        <section>
                            <button>
                                -
                            </button>
                            <button>
                                +
                            </button>
                        </section>
                        <input
                            type = 'number'
                        >
                    `;

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
                    console.log('clicked', e.target.tagName);
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
