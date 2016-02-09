'use strict';

awesome.requireCSS('components/dialog/awesome-dialog.css');
awesome.requireScript('components/header/awesome-header.js');

(
    function(){
        const defaults={
            title:''
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                this.classList.add(
                    'panel',
                    'panel-default'
                );

                this.innerHTML=`
                    <awesome-header data-title='${this.dataset.title}'></awesome-header>
                    <div class='content'>
                        ${this.innerHTML}
                    </div>
                `;
            }

            attachedCallback(){

            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                if(key!=='data-title'){
                    return false;
                }
                this.querySelector('awesome-header').dataset.title=newValue;
                return true;
            }
        }

        document.registerElement(
            'awesome-dialog',
            Component
        );
    }
)();
