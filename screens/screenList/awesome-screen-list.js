'use strict';

awesome.requireScript(`${awesome.path}stores/router/route.js`);
awesome.requireCSS(`${awesome.path}screens/screenList/awesome-screen-list.css`);
awesome.requireScript(`${awesome.path}components/icons/awesome-screen-icon.js`);

(
    function(){
        let route=null;
        let dispatcher=null;
        let constants = null;
        let action = null;

        const caresAbout=[];
        const defaults={
            screen:'app-list',
            icon:'flaticon-show-apps-button',
            link_text:'Home',
            show_all:true
        };

        function init(e){
            window.off(
                'awesome-ready',
                init
            );

            route=awesome.stores.route.state;
            dispatcher=awesome.dispatchers.component;
            constants = awesome.constants.component;
            action = awesome.constants.action;

            document.registerElement(
                'awesome-screen-list',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                if(!this.screens && !this.dataset.show_all){
                    return;
                }

                if(route.screens.length<2){
                    return;
                }

                let content='';

                for (let i = 0; i < route.screens.length; i++) {
                    const screen = route.screens[i];
                    console.log(screen.dataset.screen)
                    if(
                        (
                            this.screens
                            && !this.screens.includes(screen.dataset.screen)
                        )||this.dataset.screen===screen.dataset.screen
                    ){
                        continue;
                    }

                    if(!screen.dataset.icon){
                        continue;
                    }

                    content = `
                        ${content}
                        <awesome-screen-icon
                            ${
                                (!screen.dataset.icon.includes('.'))
                                ? `data-class= '${screen.dataset.icon}'`
                                : `data-icon = '${screen.dataset.icon}'`
                            }
                            data-text= '${screen.dataset.link_text}'
                            data-screen_name= '${screen.dataset.screen}'
                        >
                        </awesome-screen-icon>
                    `;
                }

                this.innerHTML=`
                    <div class='screensList-container'>
                        ${content}
                    </div>
                `;
            }

            attachedCallback(){
                this.addEventListener(
                    'change',
                    this.clicked
                );

                this.screenCount=route.screens.length;
                route.on(
                    'change',
                    this.checkScreens.bind(this)
                );
            }

            detachedCallback(){
                route.off(
                    'change',
                    this.checkScreens.bind(this)
                );
            }

            checkScreens(){
                if(this.screenCount==route.screens.length){
                    return;
                }
                this.screenCount=route.screens.length;
                console.log(this.screenCount,route.screens.length)
                this.createdCallback();
            }

            attributeChangedCallback(key,oldValue,newValue){
                if(!caresAbout.includes(key)){
                    return;
                }
                this.createdCallback();
            }

            load(screens){
                if(!screens){
                    return;
                }
                this.screens = screens;
                this.createdCallback();
            }

            clicked(e){
                dispatcher.trigger(
                    action.ROUTE_REQUEST,
                    e.target.dataset.screen_name
                );
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
