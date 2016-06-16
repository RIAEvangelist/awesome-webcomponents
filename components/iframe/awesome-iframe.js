'use strict';

awesome.requireCSS(`${awesome.path}components/video/_baseVideo.css`);

(
    function(){
        const defaults={
        }
        const component=new AwesomeComponent;
        component.tagName='awesome-base-video';
        component.extends='BaseComponent';

        component.create=function createBaseVideo() {
            return class BaseVideo extends awesome.component.BaseComponent{
                createdCallback(){
                    super.createdCallback();
                    this.mergeDataset(defaults);
                    this.classList.add(BaseVideo.elementTagName);

                    this.url = this.url || '';

                    this.url = `${this.url}/${this.dataset.video_id}?`;
                    for(const videoSetting in this.dataset){
                        if(videoSetting == 'video_id' || videoSetting == 'allow_fullscreen'){
                            continue;
                        }
                        this.url = `${this.url}${videoSetting}=${this.dataset[videoSetting]}&`;
                    }

                    this.innerHTML=`
                        <iframe
                            src = '${this.url}'
                            allowfullscreen = ${this.dataset.allow_fullscreen}
                        ></iframe>
                    `;
                }
            }
        }

        component.init();
    }
)();
