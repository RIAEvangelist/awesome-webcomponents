'use strict';

awesome.requireCSS(`${awesome.path}components/_a_boilerplate/awesome-boilerplate.css`);
awesome.requireCSS(`${awesome.path}stores/_a_boilerplate/boilerplate.js`);


'use strict';

awesome.requireCSS(`${awesome.path}components/dialog/awesome-dialog.css`);
awesome.requireScript(`${awesome.path}components/header/awesome-header.js`);

(
    function(){
        const defaults={
            something:'Boilerplate'
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-boilerplate-example';
        component.extends='BaseComponent';

        component.create=function createAwesomeDialog() {
            const dispatcher=awesome.dispatchers.component;
            const constants=awesome.constants.component;
            const action=awesome.constants.action;

            const store=awesome.store.boilerplate;

            return class Component extends awesome.component.BaseComponent{
                createdCallback(){
                    super.createdCallback();
                    this.mergeDataset(this,defaults);

                    this.innerHTML=`
                        <p>${this.dataset.something}</p>
                        <p>store.state.boilerplate=${store.state.boilerplate}</p>
                        <div>${this.content.content}</div>

                        <!-- preserve content template so it isn't lost on re-render -->
                        ${this.content.template}
                    `;
                }
            }
        }

        component.init();
    }
)();
