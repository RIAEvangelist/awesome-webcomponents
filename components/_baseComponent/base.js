'use strict';

(
    function(){
        const component=new AwesomeComponent;
        component.extendsNative=true;
        component.tagName='awesome-base-component';

        component.create=function createBaseComponent(){

            return class BaseComponent extends HTMLElement{
                createdCallback(){
                    this.noAutoLocalization=false;
                    this.local={};
                    this.caresAbout=[];
                    this.classList.add(BaseComponent.elementTagName);

                    //these are constant, you can not change them, they will overwrite your values
                    this.dispatcher= awesome.dispatchers.component;
                    this.constants = awesome.constants.component;
                    this.actions = awesome.constants.action;

                    this.content=awesome.loadTemplate(this);
                }

                attachedCallback(){
                    this.createdCallback();

                    window.on(
                        'awesome-language-set',
                        this.localization.bind(this)
                    );
                }

                detachedCallback(){
                    window.off(
                        'awesome-language-set',
                        this.localization.bind(this)
                    );
                }

                attributeChangedCallback(key,oldValue,newValue){
                    //console.log(`${key}--${oldValue}--${newValue}--${this.caresAbout}`);
                    if(!this.caresAbout){
                        return;
                    }

                    if(!this.caresAbout.includes(key)){
                       return;
                    }

                    //changing very rapidly? skip it!
                    if(this.getAttribute(key) !== newValue){
                        return;
                    }

                    clearTimeout(this.attributeChangedCallbackTimer);

                    this.attributeChangedCallbackTimer=setTimeout(
                        this.createdCallback.bind(this),
                        10
                    );
                }

                localize(){
                    for(let i in arguments){
                        const key=arguments[i];
                        this.local[key]=awesome.language.current[key]||key
                    }
                }

                localization(){
                    let shouldUpdate=false;

                    for(let key in this.local){
                        if(
                            !awesome.language.current[key]
                            ||this.local[key]===awesome.language.current[key]
                        ){
                            continue;
                        }

                        shouldUpdate=true;
                        this.local[key]=awesome.language.current[key];
                    }

                    if(!this.noAutoLocalization && shouldUpdate){
                        this.createdCallback();
                    }

                    return shouldUpdate;
                }

                careAbout(){
                    Array.prototype.push.apply(this.caresAbout, arguments);
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
                mergeDataset(defaults){
                    const data={};
                    Object.assign(
                        data,
                        defaults,
                        this.dataset
                    );

                    Object.assign(
                        this.dataset,
                        data
                    );
                }
            };
        };

        component.init();
    }
)();
