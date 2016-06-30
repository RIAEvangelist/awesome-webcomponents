'use strict';
window.on=window.addEventListener;
window.off=window.removeEventListener;

/**
 * # Awesome-Webcomponents
 *
 * Awesome ES6 compliant web componants for use in your app or website.
 *
 * Tested and working on :
 * * Chrome
 * * Chromium
 * * Android Chrome
 * * FireFox >=45
 * * IE Edge
 * * [Electron](http://electron.atom.io/)
 * * [NW.js](http://nwjs.io/)
 *
 * Firefox >=45 supports evrything needed with the included ` ./bower_components/document-register-element/build/document-register-element.js `.
 * IE Edge ` Array.prototype.includes ` polyfill is build into awesome.js
 *
 * install awesome-webcomponents via bower for your project by running ` bower install awesome-webcomponents ` don't forget to run ` bower update ` on occasion to get the latest version!
 *
 * ### Working Component Examples and Demos
 * [awesome-webcomponents on github.io](https://riaevangelist.github.io/awesome-webcomponents/)
 * #### Licensed under DBAD license
 * See the [DBAD license](https://github.com/philsturgeon/dbad) in your language or our [licence.md](https://github.com/RIAEvangelist/awesome-webcomponents/blob/master/LICENSE.md) file.
 *
 * # Contributing
 * 1. Fork the repo
 * 2. Do awesome stuff!
 * 3. Submit a Pull Request
 * 4. Feel Awesome!
 *
 * # Awesome.js Class api
 *
 * ` window.awesome = new Awesome; ` is called automatically to instantiate a global ` awesome ` object for your use right away.
 *
 * ---
 *
 * @class Awesome
 * @namespace awesome
 *
 *
 */
class Awesome{
    constructor(){
        Object.defineProperties(
            this,
            {
                ready:{
                    enumerable:true,
                    writable:true,
                    value:false
                },
                /**
                 * Path to folder awesome.js is located in.
                 *
                 * @example
                 *
                 * //use awesome.path to reference the awesome-webcomponents directory
                 * awesome.requireCSS(`${awesome.path}components/buttons/awesome-buttonset.css`);
                 * awesome.requireScript(`${awesome.path}components/buttons/awesome-buttonset.js`);
                 *
                 * @member awesome.path
                 * @protected
                 * @type {String}
                 */
                path:{
                    enumerable:true,
                    writable:false,
                    value:document.head.querySelector(
                        '[src$="/awesome.js"], [src^="/awesome.js"]'
                    ).src.replace(
                        /awesome\.js$/,
                        ''
                    )
                },
                /**
                 * requiresAuth requires the user to be authenticated for the app or page.
                 *
                 * @example
                 *
                 * awesome.requiresAuth=true;
                 *
                 * @member awesome.requiresAuth
                 * @type {String}
                 */
                requiresAuth:{
                    enumerable:true,
                    writable:true,
                    value:false
                },
                /**
                 * component classes scope, basically a list of the available components
                 *
                 * @member awesome.components
                 *
                 * @type {Object}
                 *
                 */
                component:{
                    enumerable:true,
                    writable:false,
                    value:{}
                },
                /**
                 * extensible/overwriteable constansts used in awesome apps
                 *
                 * @member awesome.constants
                 *
                 * @type {Object}
                 *
                 * @prop action {Object} action constants
                 * @prop store {Object} store constants
                 * @prop component {Object} component constants
                 */
                constants:{
                    enumerable:true,
                    writable:false,
                    value:{}
                },
                _config:{
                    enumerable:false,
                    writable:true,
                    value:{}
                },
                /**
                 * extensible/overwriteable constansts used in awesome apps
                 * @member awesome.config
                 * @type {Object}
                 *
                 */
                config:{
                    enumerable:true,
                    get:getConfigs,
                    set:configMerge
                },
                /**
                 * language objects used by awesome components
                 * @member awesome.language
                 * @type {Object}
                 */
                language:{
                    enumerable:true,
                    get:getLanguage,
                    set:setLanguageKey
                },
                setLanguage:{
                    enumerable:true,
                    writable:false,
                    value:setLanguage
                },
                dynamicLanguageString:{
                    enumerable:true,
                    writable:false,
                    value:dynamicLanguageString
                },
                /**
                * dispatchers for awesome 1 way data flow
                * @member awesome.dispatchers
                * @type {Object}
                * @protected
                * @prop action {Object} action dispatcher
                * @prop store {Object} store dispatcher
                * @prop component {Object} component dispatcher
                 */
                dispatchers:{
                    enumerable:true,
                    writable:false,
                    value:{}
                },
                /**
                *
                * awesome 1 way data flow stores for use by component
                * @member awesome.stores
                *
                * @example
                *
                * state=awesome.stores.auth.state;
                *
                * state.on(
                *   	'change',
                *   	this.yourAwesomeUpdateHandler.bind(this)
                * );
                *
                * @type {Object}
                */
                stores:{
                    enumerable:true,
                    writable:false,
                    value:{}
                },
                loadTemplate:{
                    enumerable:true,
                    writable:false,
                    value:loadTemplate
                },
                requireScript:{
                    enumerable:true,
                    writable:false,
                    value:requireScript
                },
                requireLanguage:{
                    enumerable:true,
                    writable:false,
                    value:requireLanguage
                },
                requireCSS:{
                    enumerable:true,
                    writable:false,
                    value:requireCSS
                },
                register:{
                    enumerable:true,
                    writable:false,
                    value:registerComponent
                },
                uniqueEntries:{
                    enumerable:true,
                    writable:false,
                    value:uniqueEntries
                }
            }
        );

        /**
         * Path to bower components
         *
         * @example
         *
         * //include bower components using the bower components path
         * awesome.requireScript(`${awesome.bower}bower-component/bower-component.js`);
         *
         * @member awesome.bower
         * @protected
         * @type {String}
         */
        Object.defineProperty(
            this,
            'bower',
            {
                enumerable:true,
                writable:false,
                value:(document.location.pathname.match(/\/awesome-webcomponents\//))?
                    `${this.path}bower_components/` //if demo
                    :
                    this.path.split('awesome-webcomponents/')[0] //if not demo
            }
        );

        Object.defineProperties(
            this.constants,
            {
                /**
                 * Shallow merge action constants object
                 *
                 * @member awesome.constants.action
                 * @type {Object}
                 */
                action:{
                    enumerable:true,
                    get:getActionConstants,
                    set:setActionConstants
                },
                /**
                 * Shallow merge store constants object
                 * @member awesome.constants.store
                 * @type {Object}
                 */
                store:{
                    enumerable:true,
                    get:getStoreConstants,
                    set:setStoreConstants
                },
                /**
                 * Shallow merge constants constants object
                 *                 *
                 * @member awesome.constants.component
                 * @type {Object}
                 */
                component:{
                    enumerable:true,
                    get:getComponentConstants,
                    set:setComponentConstants
                }
            }
        );

        /**
         * Deep merge config object
         * @method awesome.config.setter
         *
         *	@example
         *
         * ```javascript
         *
         * // awesome.config could be
         * {
         *     a:1,
         *     b:{
         *         c:3
         *     },
         *     d:{
         *         e:55,
         *         f:{
         *             g:99
         *         }
         *     },
         *     q:{
         *         r:77
         *     }
         * }
         *
         * awesome.configMerge(
         *     {
         *         b:{
         *             x:{
         *                 y:{
         *                     z:99999
         *                 }
         *             }
         *         },         *
         *         d:{
         *             f:{
         *                 h:55
         *             }
         *         },
         *         q:33
         *     }
         * )
         *
         *
         * //now awesome.config would look like
         * {
         *     a:1,
         *     b:{
         *         c:3
         *             x:{
         *                 y:{
         *                     z:99999
         *                 }
         *             }
         *         }
         *     },
         *     d:{
         *         e:55,
         *         f:{
         *             g:99,
         *             h:55
         *         }
         *     },
         *     q:33
         * }
         *
         *
         * ```
         *
         * @return {Object}            awesome.config
         */
        function configMerge(root,newRoot){
            if(!newRoot){
                newRoot=root;
                root=this._config;
            }

            for (let key in newRoot) {
                const newChild=newRoot[key];
                let rootChild=root[key];
                const newChildIsObject=(typeof newChild==='object');

                if (newChildIsObject && typeof rootChild==='object') {
                    root[key]=configMerge(rootChild,newChild);
                    continue;
                }

                root[key]=(newChildIsObject)?
                    Object.assign({},newChild)
                    :
                    newChild;
            }

            return root;
        }

        function getConfigs(){
            return this._config;
        }

        const language={
            default:{},
            current:{}
        };

        function getLanguage(){
            return language;
        }

        function setLanguageKey(newLanguage){
            for(let code in newLanguage){
                if(!language[code]){
                    language[code]={};
                }
                Object.assign(language[code],newLanguage[code]);
            }
            return language;
        }


        /**
         * Merge a specific language and the default languages. If the languageCode has not been populated on the awesome.language object, the awesome.language.default will be used.
         * @method setLanguage
         * @param  {String}    languageCode like 'en', 'en-US', 'es' or 'zh' etc.
         *
         * @example
         *
         * ```javascript
         * //if awesome.language.default is
         * {
         *     hello:'Hello',
         *     appName:'My Awesome App'
         * }
         *
         * //and awesome.language.es is
         * {
         *     hello:'Ola'
         * }
         *
         * awesome.setLanguage('es');
         *
         * //will result in awesome.language.current being
         * {
         *     hello:'Ola',
         *     appName:'My Awesome App'
         * }
         *
         * ```
         *
         */
        function setLanguage(languageCode){
            if(!languageCode){
                languageCode='default';
            }

            let desiredLanguage=this.language[languageCode];

            if(!desiredLanguage && languageCode.length>2){
                if(!hasLang(languageCode)){
                    localStorage.setItem('language',languageCode);
                    return;
                }
                languageCode=languageCode.slice(0,2);
                desiredLanguage=this.language[languageCode];
            }

            if(!desiredLanguage){
                if(!hasLang(languageCode)){
                    localStorage.setItem('language',languageCode);
                    return;
                }
                languageCode='default';
                desiredLanguage=this.language[languageCode];
            }

            localStorage.setItem('language',languageCode);

            const newLanguage={};
            Object.assign(
                newLanguage,
                this.language.default,
                desiredLanguage
            );

            language.current=Object.assign(
                {},
                newLanguage
            );

            /**
             * emitted when the language is set or changed via {@link awesome.setLanguage}.
             * @event awesome.awesome-language-set
             * @param {Event} e Event Data
             * @param {String} e.detail languageCode
             *
             */
            const e=new CustomEvent(
                'awesome-language-set',
                {
                    detail:languageCode
                }
            );

            window.dispatchEvent(e);
        }

        function dynamicLanguageString(key,params){
            // make regEx like :  /${your-var1}|${anotherVar}|${magicalVar}/ig
            const vars = new RegExp(`\\$\\{${Object.keys(params).join('\}|\\$\\{')}\\}`,"gi");
            const string=this.language.current[key];

            if(!string){
                return string;
            }

            return string.replace(
                vars,
                function(matched){
                    return params[matched.slice(2,-1)];
                }
            );
        }

        const actions={};
        const stores={};
        const components={};

        /**
         * action constants getter
         * @method awesome.constants.action.getter
         * @protected
         * @return {ActionConstants}           action constants
         */
        function getActionConstants(){
            return actions;
        }

        /**
         * action constants setter : merges the current action constants and the new constants via shallow merge.
         *
         * @example
         * //original constants
         * {
         *  	ACTION_CONSTANT1: 'actionConst1',
         *  	ACTION_CONSTANT2: 'actionConst2',
         * }
         * myNewConstants = {
         *  	NEW_CONSTANT_1: 'const1',
         *  	NEW_CONSTANT_2: 'const2'
         * }
         *
         * awesome.action.constants = myNewConstants;
         *
         * //action constants will now be
         * //awesome.constants.action
         * {
         *  	ACTION_CONSTANT1: 'actionConst1',
         *  	ACTION_CONSTANT2: 'actionConst2',
         *  	NEW_CONSTANT_1: 'const1',
         *  	NEW_CONSTANT_2: 'const2'
         * }
         *
         * @method awesome.constants.action.setter
         * @protected
         * @param  {Object}           constants constants to merge
         * @return {ActionConstants} actions merged constants
         */
        function setActionConstants(constants){
            Object.assign(actions,constants);
            uniqueEntries(actions);
            return actions;
        }

        /**
         * store constants getter
         * @method awesome.constants.store.getter
         * @protected
         * @return {StoreConstants}           store constants
         */
        function getStoreConstants(){
            return stores;
        }

        /**
         * action constants setter : merges the current store constants and the new constants via shallow merge.
         *
         * @example
         * //original constants
         * {
         *  	STORE_CONSTANT1: 'actionConst1',
         *  	STORE_CONSTANT2: 'actionConst2',
         * }
         *
         * myNewConstants = {
         *  	NEW_CONSTANT_1: 'const1',
         *  	NEW_CONSTANT_2: 'const2'
         * }
         *
         * awesome.constantants.store = myNewConstants;
         *
         * //action constants will now be
         * //awesome.constants.store
         * {
         *  	STORE_CONSTANT1: 'actionConst1',
         *  	STORE_CONSTANT2: 'actionConst2',
         *  	NEW_CONSTANT_1: 'const1',
         *  	NEW_CONSTANT_2: 'const2'
         * }
         *
         * @method awesome.constants.store.setter
         * @protected
         * @param  {Object}           constants constants to merge
         * @return {StoreConstants} stores merged constants
         */
        function setStoreConstants(constants){
            Object.assign(stores,constants);
            uniqueEntries(stores);
            return stores;
        }

        /**
         * component constants getter
         * @method awesome.constants.component.getter
         * @protected
         * @return {ComponentConstants}           component constants
         */
        function getComponentConstants(){
            return components;
        }

        /**
         * component constants setter : merges the current component constants and the new constants via shallow merge.
         *
         * @example
         *
         * //original constants
         * {
         *  	COMPONENT_CONSTANT1: 'actionConst1',
         *  	COMPONENT_CONSTANT2: 'actionConst2',
         * }
         *
         * myNewConstants = {
         *  	NEW_CONSTANT_1: 'const1',
         *  	NEW_CONSTANT_2: 'const2'
         * }
         *
         * awesome.constants.components = myNewConstants;
         *
         * //action constants will now be
         * //awesome.constants.component
         * {
         *  	COMPONENT_CONSTANT1: 'actionConst1',
         *  	COMPONENT_CONSTANT2: 'actionConst2',
         *  	NEW_CONSTANT_1: 'const1',
         *  	NEW_CONSTANT_2: 'const2'
         * }
         *
         * @method awesome.constants.component.setter
         * @protected
         * @param  {Object}           constants constants to merge
         * @return {ComponentConstants} components merged constants
         */
        function setComponentConstants(constants){
            Object.assign(components,constants);
            uniqueEntries(components);
            return components;
        }

        /**
         * loadTemplate collects template element and returns element
         *
         * @example
         *
         * //taken from awesome-list example, loadTemplate will load template element of awesome-component
         * //and returns element
         *
         * //html snippet
         *
         *  <awesome-list>
        *        <template>
        *            <li>
        *                Test 1
        *            </li>
        *            <li>
        *                Test 2
        *            </li>
        *            <li>
        *                Test 3
        *            </li>
        *        </template>
        *    </awesome-list>
        *
         * //js
         *
         * const content=awesome.loadTemplate(this);
         *
         * //constents of content
        *        `<li>
        *            Test 1
        *        </li>
        *        <li>
        *            Test 2
        *        </li>
        *        <li>
        *            Test 3
        *        </li>`
         *
         * //usage
         * //this content can now be loaded into awesome-list
         *
         * this.innerHTML=`
        *     <ul>
        *         ${content.content}
        *     </ul>
        *     ${content.template}
         *`;
         *
         * @method awesome.loadTemplate
         * @protected
         * @param  {Object} instance instance or scope of template element
         * @return {Object}          { content:"contents of template element", template:"Full Template String including tag"}
         */
        function loadTemplate(instance){
            const template=instance.querySelector(':scope > template');
            let content='';
            let templateTag='';
            if(template){
                content=`
                    ${template.innerHTML}
                `;
                templateTag=`
                    ${template.outerHTML}
                `;
            }
            return {
                content:content,
                template:templateTag
            };
        }

        let remainingScriptCount=0;

        /**
         * requireScript appends scripts to the docuyment head with a differed false
         *
         * @example
         *
         * //here we require the dispatcher to action and the constants to stores and actions
         * awesome.requireScript(`${awesome.path}dispatchers/action.js`);
         * awesome.requireScript(`${awesome.path}actions/constants.js`);
         * awesome.requireScript(`${awesome.path}stores/constants.js`);
         *
         * @method awesome.requireScript
         * @protected
         * @param  {String} path path to script
         * @return {Boolean}      true
         */
        function requireScript(path){
            const existingScript=document.head.querySelector(`script[src='${path}']`);
            if(existingScript){
                return false;
            }
            const script=document.createElement('script');
            script.setAttribute('crossorigin','anonymous');
            remainingScriptCount++;
            this.ready=false;

            script.src=path;
            script.async=false;
            script.defer=true;
            script.type='text/javascript';
            script.onload=scriptLoaded.bind(this,path);
            script.onerror=scriptError.bind(this,path);
            document.head.appendChild(script);
            return true;
        }

        /**
         * requireLanguage includes js scripts into document
         * @method awesome.requireScript
         * @protected
         * @param  {String} path path to script
         * @return {Boolean}      true
         */
        function requireLanguage(path){
            const existingScript=document.head.querySelector(`script[src='${path}']`);
            if(existingScript){
                return false;
            }
            const script=document.createElement('script');
            remainingScriptCount++;
            this.ready=false;

            script.src=path;
            script.dataset.language=true;
            script.async=true;
            script.defer=false;
            script.type='text/javascript';
            script.onload=languageLoaded.bind(this);;
            script.onerror=scriptError.bind(this);
            document.head.appendChild(script);
            return true;
        }

        function scriptLoaded(path){
            /**
             * emitted when a script included via {@link awesome.requireScript} has completed loading a script.
             *
             * @example
             *
             * window.on(
             *  	'awesome-script-loaded',
             *  	yourAwesomeLoadedHandler
             *);
             *
             * @event awesome.awesome-script-loaded
             * @param {Event} e Event Data
             * @param {String} e.detail path of the loaded script
             *
             */
            const e=new CustomEvent(
                'awesome-script-loaded',
                {
                    detail:path
                }
            );

            remainingScriptCount--;
            if(remainingScriptCount<1){
                this.ready=true;
            }

            window.dispatchEvent(e);

            //give a small buffer incase more scripts are added right away
            setTimeout(
                awesomeReady.bind(this),
                10
            );
        }

        function scriptError(path){
            /**
             * emitted when a script included via {@link awesome.requireScript} can NOT be loaded.
             * @event awesome.awesome-script-error
             * @param {Event} e Event Data
             * @param {String} e.detail path of the loaded script
             *
             */
            const e=new CustomEvent(
                'awesome-script-error',
                {
                    detail:path
                }
            );

            remainingScriptCount--;
            if(remainingScriptCount<1){
                this.ready=true;
            }

            window.dispatchEvent(e);

            awesomeReady.bind(this);
        }

        function languageLoaded(path){
            /**
             * emitted when a new language file included via {@link awesome.requireLanguage} has completed loading.
             * @event awesome.awesome-language-loaded
             * @param {Event} e Event Data
             * @param {String} e.detail path of the loaded language
             *
             */
            const e=new CustomEvent(
                'awesome-language-loaded',
                {
                    detail:path
                }
            );

            this.setLanguage(
                localStorage.getItem('language')
            );

            remainingScriptCount--;
            if(remainingScriptCount<1){
                this.ready=true;
            }

            window.dispatchEvent(e);

            //give a small buffer incase more languages are added right away
            setTimeout(
                awesomeReady.bind(this),
                10
            );
        }

        /**
         * register creates component Class in the awesome.component object and registers the element with the DOM
         *
         * @example
         *
         * //here we require the dispatcher to action and the constants to stores and actions
         * awesome.register(MyComponent, 'my-awesome-component');
         *
         * @method awesome.register
         * @protected
         * @param  {Class} Component Class
         * @param  {String} Component Element Name
         * @return {Boolean}      true
         */
        function registerComponent(componentClass){
            if(!componentClass.elementTagName){
                console.warn(componentClass.name);
                console.trace('awesome.register requires elementTagName property to be defined');
            }

            const component=awesome.component[componentClass.name];

            if(
                component
                &&component!==componentClass
            ){
                // console.warn(componentClass.name);
                console.trace('awesome.register requested registration of previously existing component');
                return;
            }

            awesome.component[componentClass.name]=componentClass;

            const e=new CustomEvent(
                'awesome-component-registered',
                {
                    detail:componentClass.name
                }
            );

            window.dispatchEvent(e);

            document.registerElement(
                componentClass.elementTagName,
                componentClass
            );

        }

        function awesomeReady(){
            if(!this.ready){
                return;
            }

            /**
             * emitted when all queued scripts included via {@link awesome.requireScript} have completed loading. This will fire each time awesome deems it is ready for use. So if you include more scripts long after load it will fire again once all the new scripts are loaded.
             * @event awesome.awesome-ready
             *
             */
            const e=new CustomEvent(
                'awesome-ready'
            );

            //detect or determine language
            let lang=localStorage.getItem('language');
            if(!lang){
                lang=window.navigator.language;
                localStorage.setItem('language',lang);
            }

            if(!hasLang(lang)){
                return;
            }

            // if language is geographically specific like 'en-US' and not present try the non-specific version like 'en'
            if(
                lang!='default'
                && !this.language[lang]
                && lang.length>2
            ){
                lang=lang.slice(0,2);
                localStorage.setItem('language',lang);
            }

            if(!hasLang(lang)){
                return;
            }

            this.setLanguage(lang);

            window.dispatchEvent(e);

            awesome.dispatchers.component.trigger(
                awesome.constants.action.ROUTE_UPDATE_SCREENS
            );

            const activeScreen=document.querySelector('.activeScreen');
            let startScreen=document.querySelector('body').dataset.start_screen;
            const hashScreen=document.location.hash.slice(2);

            if(hashScreen){
                startScreen=hashScreen;
            }

            if(activeScreen || !startScreen){
                return;
            }

            awesome.dispatchers.component.trigger(
                awesome.constants.action.ROUTE_REQUEST,
                startScreen
            );
        }

        function hasLang(lang){
            const hasLang=(document.head.querySelector(`[src$='/${lang}.js']`))?
                true:false;

            /**
             * emitted when a language check is performed for the first time and the language script is NOT in the head. This is useful when you have your own language files to load.
             * @event awesome.awesome-wants-lang
             * @param {Event} e Event Data
             * @param {String} e.detail desired language code
             *
             */
            const e=new CustomEvent(
                'awesome-wants-lang',
                {
                    detail:lang
                }
            );

            if(!hasLang){
                awesome.requireLanguage(`${awesome.path}languages/${lang}.js`);
                window.dispatchEvent(e);
            }

            return hasLang;
        }

        /**
         * requireCSS requires and appends scripts to CSS head
         *
         * @example
         *
         * //require any CSS to script
         * awesome.requireCSS(`${awesome.path}components/your-component/your-component.css`);
         *
         * @method awesome.requireCSS
         * @param  {String} path Path to CSS stylesheet
         * @return {Boolean}      false if stylesheet has already been loaded into document
         */
        function requireCSS(path){
            const css=document.createElement('link');
            const existingCSS=document.head.querySelector(`link[href='${path}']`);

            if(existingCSS){
                return false;
            }

            css.rel='stylesheet';
            css.href=path;
            document.head.appendChild(css);
        }

        /**
         * uniqueEntries ensures that keys and values of data array are unique
         *
         * @example
         *
         * //check that your constants all have unique entries as they should
         *  const constans = awesome.constans;
         *
         * awesome.uniqueEntries(constans.store);
         * awesome.uniqueEntries(constans.components);
         * awesome.uniqueEntries(constans.actions);
         *
         * //if entires are not unique an error will be thrown
         * `duplicate key of yourKey const keys mist be unique!`
         * //or
         * `duplicate value of yourConstant found on yourKey and yourKeyDuplicate const value strings MUST be unique!`
         *
         * @method awesome.uniqueEntries
         * @param  {Object} data    Data object or array with unique entries
         * @return {Boolean}        true
         */
        function uniqueEntries(data){
            const duplicateCheckArray=[];
            const duplicateKeyArray=[];

            const keys=Object.keys(data);
            for(let i=0; i<keys.length; i++){
                const key=keys[i];
                const entry=data[
                    key
                ];
                const duplicateKeyIndex=duplicateKeyArray.indexOf(key);
                const duplicateIndex=(typeof entry=='string')
                    ?duplicateCheckArray.indexOf(entry)
                    :-1;

                if(duplicateKeyIndex>-1){
                    const error=[
                        'duplicate key of',
                        key,
                        'const keys MUST be unique!'
                    ].join(' ');

                    throw(error);
                }

                if(duplicateIndex>-1){
                    const error=[
                        'duplicate value string of',
                        data[key],
                        'found on',
                        key,
                        '&&',
                        keys[duplicateIndex],
                        'const value strings MUST be unique!'
                    ].join(' ');

                    throw(error);
                }
                duplicateKeyArray.push(key);
                duplicateCheckArray.push(entry);
            }

            return true;
        };
    }
}

const awesome=new Awesome;

//bootstrap css
awesome.requireCSS(`${awesome.path}css/component.css`);

//Font Icons
awesome.requireCSS(`${awesome.path}fonts/flatIcon/flaticon.css`);

//libs
awesome.requireScript(`${awesome.bower}document-register-element/build/document-register-element.js`);
awesome.requireScript(`${awesome.bower}event-pubsub/event-pubsub-browser.js`);
awesome.requireScript(`${awesome.bower}js-message/js-message-vanilla.js`);
awesome.requireScript(`${awesome.bower}browser-error-classes/Errors.js`);

//base components
awesome.requireScript(`${awesome.path}components/baseComponent/base.js`);
awesome.requireScript(`${awesome.path}screens/baseScreen/base.js`);


//default language file
awesome.requireScript(`${awesome.path}languages/default.js`);

//configs
awesome.requireScript(`${awesome.path}configs/default.js`);


//constants
awesome.requireScript(`${awesome.path}stores/constants.js`);
awesome.requireScript(`${awesome.path}actions/constants.js`);
awesome.requireScript(`${awesome.path}components/constants.js`);

//dispatchers
awesome.requireScript(`${awesome.path}dispatchers/store.js`);
awesome.requireScript(`${awesome.path}dispatchers/action.js`);
awesome.requireScript(`${awesome.path}dispatchers/component.js`);

//awesome classes
awesome.requireScript(`${awesome.path}stores/store.js`);

//default stores
awesome.requireScript(`${awesome.path}stores/router/route.js`);

//default actions
awesome.requireScript(`${awesome.path}actions/router/route.js`);


//polyfills

if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement) {
        const O = Object(this);
        const len = parseInt(O.length,10) || 0;

        if (len === 0) {
            return false;
        }

        const n = parseInt(arguments[1],10) || 0;
        let k;

        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) {
                k = 0;
            }
        }

        let currentElement;

        while (k < len) {
            currentElement = O[k];
            if (
                searchElement === currentElement
                || (searchElement !== searchElement && currentElement !== currentElement) //NaN !== NaN
            ){
                return true;
            }
            k++;
        }
        return false;
    };
}

class AwesomeComponent{
    constructor(){
        this.extends='BaseComponent';
        this.tagName=null;
        this.extendsNative=false;
        this.create=null;
    }

    register(e){
        if(!this.extendsNative && !awesome.component[this.extends]){
            return;
        }

        window.off(
            'awesome-component-registered',
            this.registerHandler
        );

        window.off(
            'awesome-ready',
            this.registerHandler
        );

        const componentClass=this.create();

        componentClass.elementTagName=this.tagName;
        this.extends=null;
        this.tagName=null;
        this.extendsNative=null;
        this.create=null;
        awesome.register(componentClass);
    }



    init(){
        let isReady=awesome.component[this.extends];
        if(!isReady){
            this.registerHandler=this.register.bind(this);
            window.on(
                'awesome-component-registered',
                this.registerHandler
            );

            window.on(
                'awesome-ready',
                this.registerHandler
            );

            return;
        }

        this.register(
            {
                detail:this.extends
            }
        );
    }
}
