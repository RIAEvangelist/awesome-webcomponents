'use strict';

(
    function(){
        class BaseComponent extends HTMLElement{
            createdCallback(){
                this.defaults=this.defaults||{};
                this.caresAbout=[];
                this.classList.add(BaseComponent.elementTagName);

                awesome.mergeDataset(this,this.defaults);
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
        }

        BaseComponent.elementTagName='awesome-base-component';

        awesome.register(BaseComponent);
    }
)();
