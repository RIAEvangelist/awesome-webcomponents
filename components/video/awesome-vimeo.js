'use strict';

awesome.requireCSS(`${awesome.path}components/video/awesome-vimeo.css`);

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
                        src = "http://player.vimeo.com/video/${this.dataset.source}"
                    ></iframe>
                `;
            }

            attachedCallback(){

            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){

            }
        }

        document.registerElement(
            'awesome-vimeo',
            Component
        );
    }
)();
