'use strict';

awesome.requireCSS(`${awesome.path}components/video/awesome-vimeo.css`);
awesome.requireScript(`${awesome.path}components/iframe/awesome-iframe.js`);

(
    function(){
        //full documentation of these parameters can be seen @
        //https://developer.vimeo.com/player/embedding
        const defaults={
            video_id:'',
            autopause: 1,
            autoplay: 0,
            badge: 0,
            byline: 0,
            color: 'cccccc',
            loop: 0,
            portrait: 0,
            title:1
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-vimeo';
        component.extends='AwesomeIFrame';

        component.create=function createAwesomeVimeo() {
            return class AwesomeVimeo extends awesome.component.AwesomeIFrame{
                createdCallback(){
                    super.createdCallback();
                    this.mergeDataset(defaults);
                    this.classList.add(AwesomeVimeo.elementTagName);
                    this.source = `https://player.vimeo.com/video/${this.dataset.video_id}?`;
                    for(const videoSetting in this.dataset){
                        if(videoSetting == 'video_id' || videoSetting == 'allow_fullscreen' || videoSetting == 'source'){
                            continue;
                        }
                        this.source = `${this.source}${videoSetting}=${this.dataset[videoSetting]}&`;
                    }

                    this.dataset.source = this.source;

                    this.careAbout(
                        'data-video_id',
                        'data-allow_fullscreen',
                        'data-autopause',
                        'data-autoplay',
                        'data-badge',
                        'data-byline',
                        'data-color',
                        'data-loop',
                        'data-portrait',
                        'data-title'
                    );
                }
            }
        }

        component.init();
    }
)();
