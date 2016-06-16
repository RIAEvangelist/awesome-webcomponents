'use strict';

awesome.requireCSS(`${awesome.path}screens/login/awesome-login-screen.css`);
awesome.requireScript(`${awesome.path}stores/user/auth.js`);
awesome.requireScript(`${awesome.path}components/dialog/awesome-dialog.js`);

(
    function(){
        const component=new AwesomeComponent;
        component.tagName='awesome-login-screen';
        component.extends='BaseScreen';

        component.create=function createAwesomeLoginScreen() {
            const state = awesome.stores.auth.state;

            const defaults = {
                screen:'login',
                action_path:`${awesome.path}actions/user/auth.js`,

                username_id:'awesome-login-screen-username',
                username_pattern: awesome.config.validate.username,

                password_id:'awesome-login-screen-password',

                login_event:awesome.constants.action.LOGIN_REQUEST
            }

            return class AwesomeLoginScreen extends awesome.component.BaseScreen{
                createdCallback(){
                    super.createdCallback();
                    defaults.login_event=this.actions.LOGIN_REQUEST;
                    this.mergeDataset(defaults);

                    awesome.requireScript(this.dataset.action_path);
                    this.classList.add(AwesomeLoginScreen.elementTagName);

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
                        this.dataset.login_event,
                        {
                            username:username.value,
                            password:password.value
                        }
                    );
                }
            }
        };

        component.init();
    }
)()
