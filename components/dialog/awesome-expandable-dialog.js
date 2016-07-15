'use strict';

awesome.requireCSS(`${awesome.path}components/dialog/awesome-expandable-dialog.css`);
awesome.requireScript(`${awesome.path}components/dialog/awesome-dialog.js`);

(
    function(){
        const component=new AwesomeComponent;
        component.tagName='awesome-expandable-dialog';
        component.extends='AwesomeDialog';

        component.create=function createAwesomeList(){
            return class AwesomeExpandableDialog extends awesome.component.AwesomeDialog{
                createdCallback(){
                    super.createdCallback();
                    this.classList.add(AwesomeExpandableDialog.elementTagName);
                    this.careAbout('class');
                }

                attachedCallback(){
                    super.attachedCallback();
                    this.addEventListener(
                        'click',
                        this.change
                    );
                }

                change(e){
                    this.classList.toggle('fullScreenView');
                }
            }
        }

        component.init();
    }
)();
