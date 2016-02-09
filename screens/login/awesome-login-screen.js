'use strict';

awesome.requireCSS(`${awesome.path}screens/login/awesome-login-screen.css`);
awesome.requireScript(`${awesome.path}components/dialog/awesome-dialog.js`);
awesome.requireScript(`${awesome.path}stores/user/auth.js`);
awesome.requireScript(`${awesome.path}validators/username.js`);

(
    function(){
        let state=null;

        const constants = awesome.constants.components;
        const dispatcher=awesome.dispatchers.component;
        const defaults={
            title:'Login',
            action:null,

            usernameID:'awesome-login-screen-username',
            usernamePlaceholder:'username',

            passwordID:'awesome-login-screen-password',
            passwordPlaceholder:'password',

            submitButtonText:'Login'
        };

        function init(){
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
                                id='${this.dataset.usernameID}'
                                value=''
                                required='true'
                                class=''
                                placeholder='${this.dataset.usernamePlaceholder}'
                            />
                            <input
                                id='${this.dataset.passwordID}'
                                value=''
                                required='true'
                                placeholder='${this.dataset.passwordPlaceholder}'
                            />
                            <div class='button-wrapper'>
                                <button>
                                    ${this.dataset.submitButtonText}
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

            }

            update(state){
                if(state.authenticated!==true && state.failedAttempts===0){
                    return;
                }

                const password=this.querySelector(`#${this.dataset.passwordID}`);
                password.value='';
            }

            change(e){
                console.log(this);
                const username=this.querySelector(`#${this.dataset.usernameID}`);
                const password=this.querySelector(`#${this.dataset.passwordID}`);

                username.classList.remove('invalid');
                password.classList.remove('invalid');
            }

            submit(e){
                e.preventDefault();
                e.stopPropagation();
                console.log(e)
                const username=this.querySelector(`#${this.dataset.usernameID}`);
                const password=this.querySelector(`#${this.dataset.passwordID}`);
                if (!awesome.validators.username(username.value)) {
                    username.classList.add('invalid');
                    return;
                }

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
                function loadedScript(e){
                    if(e.detail!==`${awesome.path}stores/user/auth.js`){
                        return;
                    }
                    init();
                }
            )
            return;
        }

        init();
    }
)();
