<a name="awesome"></a>
## awesome : <code>object</code>
# Awesome-Webcomponents

Awesome ES6 compliant web componants for use in your app or website.

Currently works awesome in/on Android, Chrome, Chromium, ChromeOS, ChromiumOS, Electron and NW.

Only Chromium based browsers support ES6 well enough for these components. Firefox only needs to complete support for standards compliant ` const ` and ` let ` and these will work in FF as well.

install awesome-webcomponents via bower for your project by running ` bower install awesome-webcomponents ` don't forget to run ` bower update ` on occasion to get the latest version!

### Working Component Examples and Demos
[awesome-webcomponents on github.io](https://riaevangelist.github.io/awesome-webcomponents/)
#### Licensed under DBAD license
See the [DBAD license](https://github.com/philsturgeon/dbad) in your language or our [licence.md](https://github.com/RIAEvangelist/awesome-webcomponents/blob/master/LICENSE.md) file.

# Contributing
1. Fork the repo
2. Do awesome stuff!
3. Submit a Pull Request
4. Feel Awesome!

# Awesome.js Class api

` window.awesome = new Awesome; ` is called automatically to instantiate a global ` awesome ` object for your use right away.

---

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path to folder awesome.js is located in |
| bower | <code>String</code> | path to bower components |
| constants | <code>Object</code> | awesome constants |
| dispatchers | <code>Object</code> | dispatchers for store/action/component messages |
| stores | <code>Object</code> | registered awesome.Store instances. These are designed to support 1 way data flows for use by components |
| Store | <code>Class</code> | Store class, used to create new stores |
| loadTemplate | <code>function</code> | fetches nested template contents for inclusion in awesome-component |
| requireScript | <code>function</code> | inject script tag into header |
| requireCSS | <code>function</code> | inject stylesheet link tag into header |
| mergeDataset | <code>function</code> | merges element's data-* attributes with the defaults for that component element |
| updateAttributesFromData | <code>function</code> | maps data-* values to * attribute values |
| uniqueEntries | <code>function</code> | ensures that keys and values of an object unique |


* [awesome](#awesome) : <code>object</code>
    * [.Store](#awesome.Store)
        * [.state](#awesome.Store.state) : <code>Object</code>
        * [.defaultState](#awesome.Store.defaultState) : <code>Object</code>
        * [.ignoreResetEvent](#awesome.Store.ignoreResetEvent) : <code>Boolean</code>
        * [.expose(instance, name)](#awesome.Store.expose)
        * [.resetState(events)](#awesome.Store.resetState)
        * ["change"](#awesome.Store.event_change)
    * [.path](#awesome.path) : <code>String</code>
    * [.constants](#awesome.constants) : <code>Object</code>
        * [.action](#awesome.constants.action) : <code>Object</code>
        * [.store](#awesome.constants.store) : <code>Object</code>
            * [.RESET](#awesome.constants.store.RESET) : <code>EventName</code>
            * [.LOGIN_ERROR](#awesome.constants.store.LOGIN_ERROR) : <code>EventName</code>
            * [.LOGOUT_ERROR](#awesome.constants.store.LOGOUT_ERROR) : <code>EventName</code>
            * [.LOGIN_SUCCESS](#awesome.constants.store.LOGIN_SUCCESS) : <code>EventName</code>
            * [.LOGOUT_SUCCESS](#awesome.constants.store.LOGOUT_SUCCESS) : <code>EventName</code>
        * [.component](#awesome.constants.component) : <code>Object</code>
    * [.dispatchers](#awesome.dispatchers) : <code>Object</code>
        * [.action](#awesome.dispatchers.action) : <code>Events</code>
    * [.stores](#awesome.stores) : <code>Object</code>
    * [.bower](#awesome.bower) : <code>String</code>
    * [.loadTemplate(instance)](#awesome.loadTemplate) ⇒ <code>Object</code>
    * [.requireScript(path)](#awesome.requireScript) ⇒ <code>Boolean</code>
    * [.requireCSS(path)](#awesome.requireCSS) ⇒ <code>Boolean</code>
    * [.mergeDataset(el, defaults)](#awesome.mergeDataset)
    * [.updateAttributesFromData(el, key, value)](#awesome.updateAttributesFromData) ⇒ <code>Object</code>
    * [.uniqueEntries(data)](#awesome.uniqueEntries) ⇒ <code>Boolean</code>
    * ["awesome-script-loaded" (e)](#awesome.event_awesome-script-loaded)

<a name="awesome.Store"></a>
### awesome.Store
**Kind**: static class of <code>[awesome](#awesome)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> | state data of store exposed for reading by components via expose. The store modifies this as a shallow merge Object. |
| defaultState | <code>Object</code> | default store state |
| ignoreResetEvent | <code>Boolean</code> | flag to ignore the global reset event ***USE WITH CAUTION*** |
| resetState | <code>function</code> | rests the store state |
| expose | <code>function</code> | registers the read-only state with awesome.stores[store name] for components to use |


* [.Store](#awesome.Store)
    * [.state](#awesome.Store.state) : <code>Object</code>
    * [.defaultState](#awesome.Store.defaultState) : <code>Object</code>
    * [.ignoreResetEvent](#awesome.Store.ignoreResetEvent) : <code>Boolean</code>
    * [.expose(instance, name)](#awesome.Store.expose)
    * [.resetState(events)](#awesome.Store.resetState)
    * ["change"](#awesome.Store.event_change)

<a name="awesome.Store.state"></a>
#### Store.state : <code>Object</code>
state data of store exposed for reading by components via expose. The store modifies this as a shallow merge Object.

**Kind**: static property of <code>[Store](#awesome.Store)</code>  
**Access:** protected  
<a name="awesome.Store.defaultState"></a>
#### Store.defaultState : <code>Object</code>
default store state

**Kind**: static property of <code>[Store](#awesome.Store)</code>  
<a name="awesome.Store.ignoreResetEvent"></a>
#### Store.ignoreResetEvent : <code>Boolean</code>
flag to ignore the global reset event ***USE WITH CAUTION***

**Kind**: static property of <code>[Store](#awesome.Store)</code>  
<a name="awesome.Store.expose"></a>
#### Store.expose(instance, name)
registers the read-only state with awesome.stores[store name] for components to use

**Kind**: static method of <code>[Store](#awesome.Store)</code>  

| Param | Type | Description |
| --- | --- | --- |
| instance | <code>Store</code> | your instantiated Store instance |
| name | <code>String</code> | The name of your store |

<a name="awesome.Store.resetState"></a>
#### Store.resetState(events)
rests the store state

**Kind**: static method of <code>[Store](#awesome.Store)</code>  

| Param | Type | Description |
| --- | --- | --- |
| events | <code>Object</code> | your stores event-pubsub instance |

<a name="awesome.Store.event_change"></a>
#### "change"
Store.state change event used to notify component that the store state has changed.

**Kind**: event emitted by <code>[Store](#awesome.Store)</code>  
<a name="awesome.path"></a>
### awesome.path : <code>String</code>
Path to folder awesome.js is located in

**Kind**: static property of <code>[awesome](#awesome)</code>  
**Access:** protected  
<a name="awesome.constants"></a>
### awesome.constants : <code>Object</code>
extensible/overwriteable constansts used in awesome apps

**Kind**: static property of <code>[awesome](#awesome)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| action | <code>Object</code> | action constants |
| store | <code>Object</code> | store constants |
| component | <code>Object</code> | component constants |


* [.constants](#awesome.constants) : <code>Object</code>
    * [.action](#awesome.constants.action) : <code>Object</code>
    * [.store](#awesome.constants.store) : <code>Object</code>
        * [.RESET](#awesome.constants.store.RESET) : <code>EventName</code>
        * [.LOGIN_ERROR](#awesome.constants.store.LOGIN_ERROR) : <code>EventName</code>
        * [.LOGOUT_ERROR](#awesome.constants.store.LOGOUT_ERROR) : <code>EventName</code>
        * [.LOGIN_SUCCESS](#awesome.constants.store.LOGIN_SUCCESS) : <code>EventName</code>
        * [.LOGOUT_SUCCESS](#awesome.constants.store.LOGOUT_SUCCESS) : <code>EventName</code>
    * [.component](#awesome.constants.component) : <code>Object</code>

<a name="awesome.constants.action"></a>
#### constants.action : <code>Object</code>
Shallow merge action constants object

**Kind**: static property of <code>[constants](#awesome.constants)</code>  
<a name="awesome.constants.store"></a>
#### constants.store : <code>Object</code>
Shallow merge store constants object

**Kind**: static property of <code>[constants](#awesome.constants)</code>  

* [.store](#awesome.constants.store) : <code>Object</code>
    * [.RESET](#awesome.constants.store.RESET) : <code>EventName</code>
    * [.LOGIN_ERROR](#awesome.constants.store.LOGIN_ERROR) : <code>EventName</code>
    * [.LOGOUT_ERROR](#awesome.constants.store.LOGOUT_ERROR) : <code>EventName</code>
    * [.LOGIN_SUCCESS](#awesome.constants.store.LOGIN_SUCCESS) : <code>EventName</code>
    * [.LOGOUT_SUCCESS](#awesome.constants.store.LOGOUT_SUCCESS) : <code>EventName</code>

<a name="awesome.constants.store.RESET"></a>
##### store.RESET : <code>EventName</code>
all stores should reset their state

**Kind**: static property of <code>[store](#awesome.constants.store)</code>  
<a name="awesome.constants.store.LOGIN_ERROR"></a>
##### store.LOGIN_ERROR : <code>EventName</code>
user supplied bad credentials

**Kind**: static property of <code>[store](#awesome.constants.store)</code>  
<a name="awesome.constants.store.LOGOUT_ERROR"></a>
##### store.LOGOUT_ERROR : <code>EventName</code>
there was an error logging out

**Kind**: static property of <code>[store](#awesome.constants.store)</code>  
<a name="awesome.constants.store.LOGIN_SUCCESS"></a>
##### store.LOGIN_SUCCESS : <code>EventName</code>
login was successful

**Kind**: static property of <code>[store](#awesome.constants.store)</code>  
<a name="awesome.constants.store.LOGOUT_SUCCESS"></a>
##### store.LOGOUT_SUCCESS : <code>EventName</code>
logout was successful

**Kind**: static property of <code>[store](#awesome.constants.store)</code>  
<a name="awesome.constants.component"></a>
#### constants.component : <code>Object</code>
Shallow merge constants constants object

**Kind**: static property of <code>[constants](#awesome.constants)</code>  
<a name="awesome.dispatchers"></a>
### awesome.dispatchers : <code>Object</code>
dispatchers for awesome 1 way data flow

**Kind**: static property of <code>[awesome](#awesome)</code>  
**Access:** protected  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| action | <code>Object</code> | action dispatcher |
| store | <code>Object</code> | store dispatcher |
| component | <code>Object</code> | component dispatcher |

<a name="awesome.dispatchers.action"></a>
#### dispatchers.action : <code>Events</code>
awesome dispatcher for actions, uses event-pubsub

**Kind**: static property of <code>[dispatchers](#awesome.dispatchers)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| on | <code>function</code> | binds handler to action event |
| off | <code>function</code> | ***un***binds handler from action event |
| trigger | <code>function</code> | fires store event |

<a name="awesome.stores"></a>
### awesome.stores : <code>Object</code>
awesome 1 way data flow stores for use by components

**Kind**: static property of <code>[awesome](#awesome)</code>  
<a name="awesome.bower"></a>
### awesome.bower : <code>String</code>
Path to bower components

**Kind**: static property of <code>[awesome](#awesome)</code>  
**Access:** protected  
<a name="awesome.loadTemplate"></a>
### awesome.loadTemplate(instance) ⇒ <code>Object</code>
loadTemplate collects template element and returns element

**Kind**: static method of <code>[awesome](#awesome)</code>  
**Returns**: <code>Object</code> - contents of template element  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| instance | <code>Object</code> | instance or scope of template element |

<a name="awesome.requireScript"></a>
### awesome.requireScript(path) ⇒ <code>Boolean</code>
requireScript includes js scripts into document

**Kind**: static method of <code>[awesome](#awesome)</code>  
**Returns**: <code>Boolean</code> - true  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | path to script |

<a name="awesome.requireCSS"></a>
### awesome.requireCSS(path) ⇒ <code>Boolean</code>
requireCSS requires a CSS stylesheet into the document

**Kind**: static method of <code>[awesome](#awesome)</code>  
**Returns**: <code>Boolean</code> - false if stylesheet has already been loaded into document  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path to CSS stylesheet |

<a name="awesome.mergeDataset"></a>
### awesome.mergeDataset(el, defaults)
mergeDataset merges element's dataset to current default dataset of document

**Kind**: static method of <code>[awesome](#awesome)</code>  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Object</code> | element dataset to be merged |
| defaults | <code>Object</code> | default dataset |

<a name="awesome.updateAttributesFromData"></a>
### awesome.updateAttributesFromData(el, key, value) ⇒ <code>Object</code>
updateAttributesFromData updates an element's attributes

**Kind**: static method of <code>[awesome](#awesome)</code>  
**Returns**: <code>Object</code> - updted element object  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Object</code> | element object |
| key | <code>String</code> | key of element |
| value | <code>String</code> | value to update data to |

<a name="awesome.uniqueEntries"></a>
### awesome.uniqueEntries(data) ⇒ <code>Boolean</code>
uniqueEntries ensures that keys and values of data array are unique

**Kind**: static method of <code>[awesome](#awesome)</code>  
**Returns**: <code>Boolean</code> - true  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | Data array with unique entries |

<a name="awesome.event_awesome-script-loaded"></a>
### "awesome-script-loaded" (e)
emitted when a script included via [requireScript](#awesome.requireScript) has completed loading a script.

**Kind**: event emitted by <code>[awesome](#awesome)</code>  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Event Data |
| e.detail | <code>String</code> | path of the loaded script |

<a name="getActionConstants"></a>
## getActionConstants() ⇒ <code>Object</code>
gets the action constants

**Kind**: global function  
**Returns**: <code>Object</code> - action constants  
<a name="setActionConstants"></a>
## setActionConstants(constants) ⇒ <code>Object</code>
merges the current action constants and the new constants via shallow merge.

**Kind**: global function  
**Returns**: <code>Object</code> - actions merged constants  

| Param | Type | Description |
| --- | --- | --- |
| constants | <code>Object</code> | constants to merge |

<a name="getStoreConstants"></a>
## getStoreConstants() ⇒ <code>Object</code>
gets the store constants

**Kind**: global function  
**Returns**: <code>Object</code> - store constants  
<a name="setStoreConstants"></a>
## setStoreConstants(constants) ⇒ <code>Object</code>
merges the current store constants and the new constants via shallow merge.

**Kind**: global function  
**Returns**: <code>Object</code> - stores merged constants  

| Param | Type | Description |
| --- | --- | --- |
| constants | <code>Object</code> | constants to merge |

<a name="getComponentConstants"></a>
## getComponentConstants() ⇒ <code>Object</code>
gets the component constants

**Kind**: global function  
**Returns**: <code>Object</code> - component constants  
<a name="setComponentConstants"></a>
## setComponentConstants(constants) ⇒ <code>Object</code>
merges the current component constants and the new constants via shallow merge.

**Kind**: global function  
**Returns**: <code>Object</code> - components merged constants  

| Param | Type | Description |
| --- | --- | --- |
| constants | <code>Object</code> | constants to merge |

