'use strict';

awesome.requireCSS(`${awesome.path}components/options/awesome-options-dropdown.css`);

(
    function(){
        let store=null;
        let dispatcher=null;
        let constants = null;
        let action = null;

        const defaults={
            label:''
        }

        function init(e){
            window.off(
                'awesome-ready',
                init
            );

            dispatcher=awesome.dispatchers.component;
            constants=awesome.constants.component;
            action=awesome.constants.action;

            document.registerElement(
                'awesome-options-dropdown',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                this.innerHTML=`
                    <label>${this.dataset.label} :</label>
                    <select name='${this.dataset.label}'>
                        ${content.content}
                    </select>
                `;

                this.querySelector('select').addEventListener(
                    'change',
                    this.change.bind(this)
                );
            }

            attachedCallback(){

            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                //basic re-render
                this.createdCallback();
            }

            change(e){
                e.preventDefault();
                e.stopPropagation();
                this.value=e.target.value;
                const change = new Event(
                    'change',
                    {
                        'bubbles':true,
                        'cancelable':false
                    }
                );

                this.dispatchEvent(change);
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
