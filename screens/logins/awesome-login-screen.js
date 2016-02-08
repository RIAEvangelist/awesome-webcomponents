'use strict';

util.requireCSS('screens/logins/awesome-login-screen.css');
util.requireScript('components/dialogs/awesome-dialog.js');

var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = render;
proto.attributeChangedCallback = render;
proto.defaults={
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

document.registerElement(
    'awesome-login-screen',
    {
        prototype: proto
    }
);

function render(){
    util.mergeDataset(this,proto);

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
