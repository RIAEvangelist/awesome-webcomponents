'use strict';

awesome.requireCSS(`${awesome.path}screens/login/awesome-login-screen.css`);
awesome.requireScript(`${awesome.path}actions/user/auth.js`);
awesome.requireScript(`${awesome.path}stores/user/auth.js`);
awesome.requireScript(`${awesome.path}components/dialog/awesome-dialog.js`);

(
    function(){
        let state=null;
        let dispatcher=null;
        let constants = null;
        let action = null;
        let defaults=null;

        function init(e){
            dispatcher=awesome.dispatchers.component;
            constants = awesome.constants.component;
            action = awesome.constants.action;

            defaults={
                login_type:null,

                username_id:'awesome-login-screen-username',
                username_pattern: constants.VALIDATE_USERNAME,

                password_id:'awesome-login-screen-password'
            };

            window.off(
                'awesome-ready',
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
                    <awesome-dialog data-title='${awesome.language.current['awesome-login-screen-header']}'>
                        <template>
                            <form>
                                <input
                                    id='${this.dataset.username_id}'
                                    value=''
                                    required='true'
                                    minlength=6
                                    maxlength=30
                                    pattern='${this.dataset.username_pattern}'
                                    class=''
                                    placeholder='${awesome.language.current.username}'
                                />
                                <input
                                    id='${this.dataset.password_id}'
                                    value=''
                                    required='true'
                                    type='password'
                                    placeholder='${awesome.language.current.password}'
                                />
                                <div class='button-wrapper'>
                                    <button>
                                        ${awesome.language.current.login}
                                    </button>
                                </div>
                            </form>
                        </template>
                    </awesome-dialog>
                `;
            }

            attachedCallback(){
                window.on(
                    'awesome-language-set',
                    this.createdCallback.bind(this)
                );

                state.on(
                    'change',
                    this.update.bind(this)
                );

                this.addEventListener(
                    'submit',
                    this.submit
                );
            }

            detachedCallback(){
                state.off(
                    'change',
                    this.update
                );
            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            update(){
                if(state.authenticated!==true && state.failedAttempts===0){
                    return;
                }

                this.querySelector(`#${this.dataset.username_id}`).value='';
                this.querySelector(`#${this.dataset.password_id}`).value='';
            }

            submit(e){
                e.preventDefault();
                e.stopPropagation();
                const username=this.querySelector(`#${this.dataset.username_id}`);
                const password=this.querySelector(`#${this.dataset.password_id}`);

                dispatcher.trigger(
                    action.LOGIN_REQUEST,
                    {
                        username:username.value,
                        password:password.value
                    }
                );
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
