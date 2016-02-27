'use strict';

awesome.requireCSS(`${awesome.path}components/video/awesome-vimeo.css`);

(
    function(){
        const defaults={
            video_id:'',
            allow_fullscreen: true,
            autopause: 1,
            autoplay: 0,
            badge: 0,
            byline: 0,
            color: '00adef',
            loop: 0,
            protrait: 0,
            title:1
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                let vimeoURL = `https://player.vimeo.com/video/${this.dataset.video_id}?`;
                for(const i in this.dataset){
                    if(i == 'video_id' || i == 'allow_fullscreen'){
                        continue;
                    }
                    vimeoURL = vimeoURL.concat(`${i}=${this.dataset[i]}&`);
                }

                this.innerHTML=`
                    <iframe
                        src = '${vimeoURL}'
                        allowfullscreen = ${this.dataset.allow_fullscreen}
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
            'awesome-vimeo',
            Component
        );
    }
)();
