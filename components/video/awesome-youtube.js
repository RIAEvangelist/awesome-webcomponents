'use strict';

awesome.requireCSS(`${awesome.path}components/video/awesome-youtube.css`);

(
    function(){
        const defaults={
            source:'',
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                this.innerHTML=`
                    <iframe width="420" height="315"
                        src = "http://www.youtube.com/embed/${this.dataset.source}"
                    ></iframe>
                `;
            }

            attachedCallback(){

            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }
        }

        document.registerElement(
            'awesome-youtube',
            Component
        );
    }
)();
