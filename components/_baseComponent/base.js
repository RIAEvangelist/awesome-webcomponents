'use strict';

(
    function(){
        function init() {
            window.off(
                'awesome-ready',
                init
            );

            class BaseComponent extends HTMLElement{
                createdCallback(){
                    this.defaults=this.defaults||{};

                    this.caresAbout=[];
                    this.classList.add(BaseComponent.elementTagName);

                    awesome.mergeDataset(this,this.defaults);

                    //these are constant, you can not change them, they will overwrite your values
                    this.dispatcher= awesome.dispatchers.component;
                    this.constants = awesome.constants.component;
                    this.actions = awesome.constants.action;

                    this.content=awesome.loadTemplate(this);
                }

                attachedCallback(){
                    this.createdCallback();
                }

                detachedCallback(){

                }

                attributeChangedCallback(key,oldValue,newValue){
                    if(!this.caresAbout){
                        return;
                    }
                    if(!this.caresAbout.includes(key)){
                       return;
                    }

                    if(this.getAttribute(key) === newValue){
                        return;
                    }

                    this.createdCallback();
                }

                /**
                 * mergeDataset merges element's dataset to current default dataset of document
                 *
                 * @example
                 *
                 * defaultElementDataset = {
                 *  	property1: 'one',
                 *  	property2: 'two'
                 * }
                 *
                 * function componentCreatedCallback(componentDataset){
                 * 		mergeDataset(componentDataset);
                 * }
                 *
                 * //after the component is created it will contain
                 * //ElementDataset
                 *  {
                 *  	property1 : 'newProp1',
                 *  	property2 : 'newProp2'
                 *  }
                 *
                 * @method awesome.mergeDataset
                 * @param {Object} defaults        default dataset
                 */
                function mergeDataset(defaults){
                    const data={};
                    Object.assign(
                        data,
                        defaults,
                        this.dataset
                    );

                    Object.assign(
                        dataset,
                        data
                    );
                }
            }

            BaseComponent.elementTagName='awesome-base-component';
            awesome.register(BaseComponent);
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
