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
                title:'login',
                action_path:`${awesome.path}actions/user/auth.js`,

                username_id:'awesome-login-screen-username',
                username_pattern: awesome.config.validate.username,

                password_id:'awesome-login-screen-password',

                login_event:awesome.constants.action.LOGIN_REQUEST
            }

            return class AwesomeLoginScreen extends awesome.component.BaseScreen{
                createdCallback(){
                    super.createdCallback();
                    this.mergeDataset(defaults);

                    awesome.requireScript(this.dataset.action_path);
                    this.classList.add(AwesomeLoginScreen.elementTagName);

                    this.localize(
                        this.dataset.login,
                        'username',
                        'password',
                        'login'
                    );

                    this.innerHTML=`
                        <awesome-dialog data-title='${this.local[this.dataset.title]}'>
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
                                        placeholder='${this.local.username}'
                                    />
                                    <input
                                        id='${this.dataset.password_id}'
                                        value=''
                                        required='true'
                                        type='password'
                                        placeholder='${this.local.password}'
                                    />
                                    <div class='button-wrapper'>
                                        <button>
                                            ${this.local.login}
                                        </button>
                                    </div>
                                </form>
                            </template>
                        </awesome-dialog>
                    `;
                }

                attachedCallback(){
                    super.attachedCallback();
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
                    super.dettachedCallback();
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
