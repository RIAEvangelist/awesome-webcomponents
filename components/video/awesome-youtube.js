'use strict';

awesome.requireCSS(`${awesome.path}components/video/awesome-youtube.css`);
awesome.requireScript(`${awesome.path}components/video/_baseVideo.js`);

(
    function(){
        //full documentation of these parameters can be seen @
        //https://developers.google.com/youtube/player_parameters#controls
        const defaults={
            video_id:'',
            allow_fullscreen: true,
            autoplay: 0,
            cc_load_policy: 0,
            controls: 1,
            color: 'white',
            disabled: 0,
            enablejsapi: 1,
            end: -1,
            fs: 1,
            h1: 'en',
            iv_load_policy: 0,
            modestbranding: 1,
            loop: 0,
            rel: 0,
            showinfo: 1,
            start: 0
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-youtube';
        component.extends='BaseVideo';

        component.create=function createAwesomeYouTube() {
            return class AwesomeYouTube extends awesome.component.BaseVideo{
                createdCallback(){
                    this.url = 'https://www.youtube.com/embed';
                    super.createdCallback();
                    this.mergeDataset(defaults);
                    this.classList.add(AwesomeYouTube.elementTagName);
                    this.careAbout(
                        'data-video_id',
                        'data-allow_fullscreen',
                        'data-autoplay',
                        'data-cc_load_policy',
                        'data-controls',
                        'data-color',
                        'data-disabled',
                        'data-enablejsapi',
                        'data-end',
                        'data-fs',
                        'data-h1',
                        'data-iv_load_policy',
                        'data-modestbranding',
                        'data-loop',
                        'data-rel',
                        'data-showinfo',
                        'data-start'
                    );
                }
            }
        }

        component.init();
    }
)();
