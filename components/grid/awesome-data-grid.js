'use strict';

awesome.requireCSS(`${awesome.path}components/grid/awesome-data-grid.css`);

(
    function(){
        let dispatcher=null;
        let constants = null;
        let action = null;
        const defaults={};

        function init(e){
            window.off(
                'awesome-ready',
                init
            );

            dispatcher=awesome.dispatchers.component;
            constants=awesome.constants.component;
            action=awesome.constants.action;

            document.registerElement(
                'awesome-data-grid',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
            }

            attachedCallback(){
            }

            detachedCallback(){
            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            generate(gridData){
                const grid = document.querySelector('awesome-data-grid');
                const listItem = document.createElement('ul');

                const title = document.createElement('h1');
                title.innerHTML = gridData.gridDefinition.name;
                grid.appendChild(title);

                for(const i in gridData.data){
                    if(typeof gridData.data[i]=='object'){
                        for(const j in gridData.data[i]){
                            listItem.innerHTML += `<li>${gridData.data[i][j].firstName}, ${gridData.data[i][j].lastName}</li>`;
                            grid.appendChild(listItem);
                        }
                    }
                }
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
