'use strict';

awesome.requireCSS('screens/logins/awesome-login-screen.css');
awesome.requireScript('components/dialogs/awesome-dialog.js');

(
    function(){
        const defaults={
            title:'Login',

            usernameID:'',
            usernamePlaceholder:'username',
            usernameInvalid:false,

            passwordID:'',
            passwordPlaceholder:'password',
            passwordInvalid:false,

            disableSubmit:true,
            submitButtonText:'Login'
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                this.innerHTML=`
                    <awesome-dialog data-title='${this.dataset.title}'>
                        <form>
                            <input
                                id='${this.dataset.usernameID}'
                                value=''
                                placeholder='${this.dataset.usernamePlaceholder}'
                                data-invalid='${this.dataset.usernameInvalid}'
                            />
                            <input
                                id='${this.dataset.passwordID}'
                                value=''
                                placeholder='${this.dataset.passwordPlaceholder}'
                                data-invalid='${this.dataset.passwordInvalid}'
                            />
                            <button disabled='${this.dataset.disableSubmit}'>
                                ${this.dataset.submitButtonText}
                            </button>
                        </form>
                    </awesome-dialog>
                `;
            }

            attachedCallback(){

            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){

            }
        }

        document.registerElement(
            'awesome-login-screen',
            Component
        );
    }
)();
