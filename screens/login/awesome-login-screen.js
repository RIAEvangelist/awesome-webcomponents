'use strict';

awesome.requireCSS(`${awesome.path}screens/login/awesome-login-screen.css`);
awesome.requireScript(`${awesome.path}components/dialog/awesome-dialog.js`);
awesome.requireScript(`${awesome.path}stores/user/auth.js`);

(
    function(){
        let state=null;

        const constants = awesome.constants.components;
        const dispatcher=awesome.dispatchers.component;
        const defaults={
            title:'Login',
            login_type:null,

            username_id:'awesome-login-screen-username',
            username_placeholder:'username',
            username_pattern: awesome.constants.components.VALIDATE_USERNAME,

            password_id:'awesome-login-screen-password',
            password_placeholder:'password',

            submit_button_text:'Login'
        };

        function init(){
            if(e.detail!==`${awesome.path}stores/user/auth.js`){
                return;
            }

            window.off(
                'awesome-script-loaded',
                init
            );

            state=awesome.stores.auth.state;

            document.registerElement(
                'awesome-login-screen',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
                if(this.dataset.action){
                    awesome.requireScript(`${this.dataset.action}`);
                }
                awesome.mergeDataset(this,defaults);

                this.innerHTML=`
                    <awesome-dialog data-title='${this.dataset.title}'>
                        <form>
                            <input
                                id='${this.dataset.username_id}'
                                value=''
                                required='true'
                                pattern='${this.dataset.username_pattern}'
                                class=''
                                placeholder='${this.dataset.username_placeholder}'
                            />
                            <input
                                id='${this.dataset.password_id}'
                                value=''
                                required='true'
                                placeholder='${this.dataset.password_placeholder}'
                            />
                            <div class='button-wrapper'>
                                <button>
                                    ${this.dataset.submit_button_text}
                                </button>
                            </div>
                        </form>
                    </awesome-dialog>
                `;

                state.on(
                    'change',
                    this.update
                );

                this.addEventListener(
                    'change',
                    this.change
                );

                this.addEventListener(
                    'submit',
                    this.submit
                );
            }

            attachedCallback(){

            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.querySelector(`#${this.dataset.password_id}`).value='';
            }

            update(state){
                if(state.authenticated!==true && state.failedAttempts===0){
                    return;
                }

                this.querySelector(`#${this.dataset.password_id}`).value='';
            }

            change(e){

            }

            submit(e){
                e.preventDefault();
                e.stopPropagation();
                const username=this.querySelector(`#${this.dataset.username_id}`);
                const password=this.querySelector(`#${this.dataset.password_id}`);

                const message = new Message;
                message.type = constants.LOGIN_ATTEMPT;
                message.data.username = username.value;
                message.data.password = password.value;

                dispatcher.trigger(
                    shared.actions.LOGIN_REQUEST,
                    message
                );
            }
        }

        if(!awesome.stores.auth){
            window.on(
                'awesome-script-loaded',
                init
            )
            return;
        }

        init();
    }
)();
