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
 * @prop awesome.path {String} Path to folder awesome.js is located in
 * @prop awesome.bower {String} path to bower components
 *
 *
 * @prop awesome.constants {Object} awesome constants
 * @prop awesome.dispatchers {Object} dispatchers for store/action/component messages
 * @prop awesome.stores {Object} registered awesome.Store instances. These are designed to support 1 way data flows for use by components
 *
 * @prop awesome.Store {Class} Store class, used to create new stores
 *
 * @prop awesome.loadTemplate {Function} fetches nested template contents for inclusion in awesome-component
 * @prop awesome.requireScript {Function} inject script tag into header
 * @prop awesome.requireCSS {Function} inject stylesheet link tag into header
 * @prop awesome.mergeDataset {Function} merges element's data-* attributes with the defaults for that component element
 * @prop awesome.updateAttributesFromData {Function} maps data-* values to * attribute values
 * @prop awesome.uniqueEntries {Function} ensures that keys and values of an object unique
 *
 */
class Awesome{
    constructor(){
        Object.defineProperties(
            this,
            {
                /**
                 * Path to folder awesome.js is located in
                 * @member awesome.path
                 * @protected
                 * @type {String}
                 */
                path:{
                    enumerable:true,
                    writable:false,
                    value:document.head.querySelector(
                        '[src$="/awesome.js"]'
                    ).src.replace(
                        /awesome\.js$/,
                        ''
                    )
                },
                /**
                 * @member awesome.constants
                 * @type {Object} extensible/overwriteable constansts used in awesome apps
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
                /**
                * @member awesome.dispatchers
                * @type {Object} dispatchers for awesome 1 way data flow
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
                * @member awesome.stores
                * @type {Object} awesome 1 way data flow stores for use by components
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
                requireCSS:{
                    enumerable:true,
                    writable:false,
                    value:requireCSS
                },
                uniqueEntries:{
                    enumerable:true,
                    writable:false,
                    value:uniqueEntries
                },
                mergeDataset:{
                    enumerable:true,
                    writable:false,
                    value:mergeDataset
                },
                updateAttributesFromData:{
                    enumerable:true,
                    writable:false,
                    value:updateAttributesFromData
                }
            }
        );

        /**
         * Path to bower components
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
                value:(document.location.pathname.indexOf('/awesome-webcomponents/') !== 0)?
                    this.path.split('awesome-webcomponents/')[0]
                        :
                    '/awesome-webcomponents/bower_components/'
            }
        );

        Object.defineProperties(
            this.constants,
            {
                /**
                 * Shallow merge action constants object
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
         * @method awesome.loadTemplate
         * @protected
         * @param  {Object} instance instance or scope of template element
         * @return {Object}          contents of template element
         */
        function loadTemplate(instance){
            const template=instance.querySelector('template');
            let content='';
            if(template){
                content=`
                    ${template.innerHTML}
                    ${template.outerHTML}
                `;
            }
            return content;
        }

        /**
         * requireScript includes js scripts into document
         * @method awesome.requireScript
         * @protected
         * @param  {String} path path to script
         * @return {Boolean}      true
         */
        function requireScript(path){
            const script=document.createElement('script');
            const existingScript=document.head.querySelector(`script[src='${path}']`);
            if(existingScript){
                return false;
            }
            script.src=path;
            script.async=false;
            script.defer=true;
            script.type='text/javascript';
            script.onload=scriptLoaded.bind(path);
            document.head.appendChild(script);
            return true;
        }

        function scriptLoaded(){
            /**
             * emitted when a script included via {@link awesome.requireScript} has completed loading a script.
             * @event awesome.awesome-script-loaded
             * @param {Event} e Event Data
             * @param {String} e.detail path of the loaded script
             *
             */
            const e=new CustomEvent(
                'awesome-script-loaded',
                {
                    detail:this
                }
            );

            window.dispatchEvent(e);
        }

        /**
         * requireCSS requires a CSS stylesheet into the document
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
         * mergeDataset merges element's dataset to current default dataset of document
         * @method awesome.mergeDataset
         * @param {Object} el       element dataset to be merged
         * @param {Object} defaults default dataset
         */
        function mergeDataset(el,defaults){
            const data={};
            Object.assign(
                data,
                defaults,
                el.dataset
            );

            Object.assign(
                el.dataset,
                data
            );
        }

        /**
         * updateAttributesFromData updates an element's attributes
         * @method awesome.updateAttributesFromData
         * @param  {Object} el    element object
         * @param  {String} key   key of element
         * @param  {String} value value to update data to
         * @return {Object}       updted element object
         */
        function updateAttributesFromData(el,key,value){
            if(key.indexOf('data-')!==0){
                return el;
            }

            el[
                key.replace('data-','')
            ]=value;

            return el;
        }

        /**
         * uniqueEntries ensures that keys and values of data array are unique
         * @method awesome.uniqueEntries
         * @param  {Array} data Data array with unique entries
         * @return {Boolean}      true
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
                const duplicateIndex=duplicateCheckArray.indexOf(entry);

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

//node modules
awesome.requireScript(`${awesome.bower}event-pubsub/event-pubsub-browser.js`);
awesome.requireScript(`${awesome.bower}js-message/js-message-vanilla.js`);
awesome.requireScript(`${awesome.bower}browser-error-classes/Errors.js`);

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
