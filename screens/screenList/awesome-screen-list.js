'use strict';

awesome.requireCSS(`${awesome.path}screens/screenList/awesome-screen-list.css`);
awesome.requireScript(`${awesome.path}stores/router/route.js`);
awesome.requireScript(`${awesome.path}components/icons/awesome-screen-icon.js`);

(
    function(){
        const component = new AwesomeComponent;
        component.tagName = 'awesome-screen-list';
        component.extends = 'BaseScreen';

        const defaults={
            screen:'app-list',
            icon:'flaticon-show-apps-button',
            link_text:'Home',
            show_all:true
        };

        component.create = function createAwesomeScreenList(){
            return class AwesomeScreenList extends awesome.component.BaseScreen{
                createdCallback(){
                    console.log('wtff');
                    super.createdCallback();
                    this.mergeDataset(defaults);
                    this.classList.add(AwesomeScreenList.elementTagName);
                    this.route = awesome.stores.route.state;

                    if(!this.screens && !this.dataset.show_all){
                        return;
                    }

                    if(this.route.screens.length<2){
                        return;
                    }

                    let content='';

                    for (let i = 0; i < this.route.screens.length; i++) {
                        const screen = this.route.screens[i];
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
                    super.attachedCallback();

                    this.addEventListener(
                        'change',
                        this.clicked
                    );

                    this.screenCount=this.route.screens.length;
                    this.route.on(
                        'change',
                        this.checkScreens.bind(this)
                    );
                }

                detachedCallback(){
                    super.attachedCallback();

                    this.removeEventListener(
                        'change',
                        this.clicked
                    );

                    this.route.off(
                        'change',
                        this.checkScreens.bind(this)
                    );
                }

                checkScreens(){
                    if(this.screenCount==this.route.screens.length){
                        return;
                    }
                    this.screenCount=this.route.screens.length;
                    console.log(this.screenCount,this.route.screens.length)
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
                    this.dispatcher.trigger(
                        this.actions.ROUTE_REQUEST,
                        e.target.dataset.screen_name
                    );
                }
            }
        }
        component.init();
    }
)();
