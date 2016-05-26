'use strict';
awesome.requireCSS(`${awesome.path}components/localization/awesome-languages.css`);
awesome.requireScript(`${awesome.path}components/buttons/awesome-buttonset.js`);

(
    function(){
        let defaults=null;
        let langs=[];

        function init(e){
            defaults={
                codes:[
                    'en',
                    'ru',
                    'jp',
                    'es'
                ],
                en:awesome.language.current.english,
                ru:awesome.language.current.russian,
                jp:awesome.language.current.japanese,
                es:awesome.language.current.spanish
            };

            window.off(
                'awesome-ready',
                init
            );

            document.registerElement(
                'awesome-languages',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                langs=this.dataset.codes.split(',');
                const index=langs.indexOf(
                    localStorage.getItem('language')
                );
                const buttons=[];

                for(let i=0; i<langs.length; i++){
                    buttons.push(
                        `
                            data-b${i}='${
                                this.dataset[
                                    langs[i]
                                ]
                            }'
                        `
                    );
                }

                let langIndex='';
                if(index>-1){
                    langIndex=`data-index='${
                        index
                    }'`
                }

                this.innerHTML=`
                    <awesome-buttonset
                        ${langIndex}
                        data-count=${langs.length}
                        ${buttons.join('')}
                    ></awesome-buttonset>
                `;
            }

            attachedCallback(){
                this.addEventListener(
                    'change',
                    function languageChange(e){
                        awesome.setLanguage(
                            langs[e.target.value]
                        );
                    }
                );
            }

            detachedCallback(){
                this.createdCallback();
            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }
        }

        if(!awesome.ready){
            window.on(
                'awesome-ready',
                init
            );

            return;
        }

        init();
    }
)();
