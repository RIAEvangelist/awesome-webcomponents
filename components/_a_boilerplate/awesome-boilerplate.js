'use strict';

awesome.requireCSS(`${awesome.path}components/_a_boilerplate/awesome-boilerplate.css`);
awesome.requireCSS(`${awesome.path}stores/_a_boilerplate/boilerplate.js`);

(
    function(){
        const defaults={
            something:'Boilerplate'
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-boilerplate-example';
        component.extends='BaseComponent';

        component.create=function createAwesomeDialog() {
            const store=awesome.store.boilerplate.state;

            return class AwesomeBoilerPlateExample extends awesome.component.BaseComponent{
                createdCallback(){
                    super.createdCallback();
                    this.mergeDataset(this,defaults);
                    this.classList.add(AwesomeBoilerPlateExample.elementTagName);

                    this.innerHTML=`
                        <p>${this.dataset.something}</p>
                        <p>store.state.boilerplate=${store.boilerplate}</p>
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
