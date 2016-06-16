'use strict';

awesome.requireCSS(`${awesome.path}components/iframe/awesome-iframe.css`);

(
    function(){
        const defaults={
            source: '',
            allow_fullscreen:true
        }
        const component=new AwesomeComponent;
        component.tagName='awesome-iframe';
        component.extends='BaseComponent';

        component.create=function createAwesomeIFrame() {
            return class AwesomeIFrame extends awesome.component.BaseComponent{
                createdCallback(){
                    super.createdCallback();
                    this.mergeDataset(defaults);
                    this.classList.add(AwesomeIFrame.elementTagName);
                    this.careAbout(
                        'data-source',
                        'data-allow_fullscreen'
                    );
                    this.innerHTML=`
                        <iframe
                            src = '${this.dataset.source}'
                            allowfullscreen = ${this.dataset.allow_fullscreen}
                        ></iframe>
                    `;
                }
            }
        }
        component.init();
    }
)();
