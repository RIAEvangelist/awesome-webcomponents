'use strict';
awesome.requireCSS(`${awesome.path}components/localization/awesome-languages.css`);
awesome.requireScript(`${awesome.path}components/buttons/awesome-buttonset.js`);

(
    function(){
        let langs=[];

        const component=new AwesomeComponent;
        component.tagName='awesome-languages';
        component.extends='AwesomeButtonSet';

        component.create=function createAwesomeLanguages(e){
            const defaults={
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

            return class AwesomeLanguages extends awesome.component.AwesomeButtonSet{
                createdCallback(){
                    this.mergeDataset(defaults);
                    super.createdCallback();
                    this.classList.add(AwesomeLanguages.elementTagName);

                    langs=this.dataset.codes.split(',');

                    const index=langs.indexOf(
                        localStorage.getItem('language')
                    );

                    for(let i=0; i<langs.length; i++){
                        this.dataset[`b${i}`]=this.dataset[
                            langs[i]
                        ]
                    }

                    this.dataset.index=index;
                }

                attachedCallback(){
                    super.attachedCallback();
                    this.addEventListener(
                        'change',
                        function languageChange(e){
                            awesome.setLanguage(
                                langs[e.target.value]
                            );
                        }
                    );
                }
            }
        }

        component.init();
    }
)();
