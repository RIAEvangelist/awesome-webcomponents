'use strict';

awesome.requireCSS(`${awesome.path}components/video/awesome-youtube.css`);

(
    function(){
        //full documentation of these parameters can be seen @
        //https://developers.google.com/youtube/player_parameters#controls
        const defaults={
            video_id:'',
            allow_fullscreen: true,
            autoplay: 0,
            controls: 1,
            color: 'white',
            disablekb: 1,
            enablejsapi: 1,
            end: -1,
            fs: 1,
            h1: 'eng',
            iv_load_policy: 3,
            modestbranding: 1,
            loop: 0,
            rel: 0,
            showinfo: 0,
            start: -1,
            theme: 'dark'
        }

        class Component extends HTMLElement{

            createdCallback(){
                awesome.mergeDataset(this,defaults);

                let youTubeURL = `https://www.youtube.com/embed/${this.dataset.video_id}?`;
                for(const i in this.dataset){
                    if(i == 'video_id' || i == 'allow_fullscreen'){
                        continue;
                    }

                    youTubeURL = youTubeURL.concat(`${i}=${this.dataset[i]}&`);
                }

                this.innerHTML=`
                    <iframe
                        src = '${youTubeURL}'
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
            'awesome-youtube',
            Component
        );
    }
)();
