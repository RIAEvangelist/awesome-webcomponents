'use strict';

awesome.requireCSS(`${awesome.path}screens/login/awesome-login-screen.css`);
awesome.requireScript(`${awesome.path}stores/user/auth.js`);
awesome.requireScript(`${awesome.path}components/dialog/awesome-dialog.js`);

(
    function(){
        function init() {
            window.off(
                'awesome-ready',
                init
            );

            const state = awesome.stores.auth.state;

            class AwesomeLogin extends awesome.component.BaseScreen{
                createdCallback(){
                    this.defaults = {
                        screen:'login',
                        action_path:`${awesome.path}actions/user/auth.js`,

                        username_id:'awesome-login-screen-username',
                        username_pattern: awesome.config.validate.username,

                        password_id:'awesome-login-screen-password'
                    }
                    super.createdCallback();
                    awesome.requireScript(this.dataset.action_path);
                    this.LOGIN_ACTION = this.action.LOGIN_REQUEST;
                    this.classList.add(AwesomeLogin.elementTagName);

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
                    window.off(
                        'awesome-language-set',
                        this.createdCallback.bind(this)
                    );

                    state.off(
                        'change',
                        this.update
                    );

                    this.addEventListener(
                        'submit',
                        this.submit
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

                    this.dispatcher.trigger(
                        this.LOGIN_ACTION,
                        {
                            username:username.value,
                            password:password.value
                        }
                    );
                }
            }

            AwesomeLogin.elementTagName = 'awesome-login-screen';
            awesome.register(AwesomeLogin);
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
)()
