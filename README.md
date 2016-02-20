<a name="awesome"></a>
## awesome : <code>object</code>
# Awesome-Webcomponents

Awesome ES6 compliant web componants for use in your app or website.

Currently works awesome in/on Android, Chrome, Chromium, ChromeOS, ChromiumOS, Electron and NW.

Only Chromium based browsers support ES6 well enough for these components. Firefox only needs to complete support for standards compliant ` const ` and ` let ` and these will work in FF as well.


### Working Component Examples and Demos
[awesome-webcomponents on github.io](https://riaevangelist.github.io/awesome-webcomponents/)
#### Licensed under DBAD license
See the [DBAD license](https://github.com/philsturgeon/dbad) in your language or our [licence.md](https://github.com/RIAEvangelist/awesome-webcomponents/blob/master/LICENSE.md) file.
`npm install `

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path to folder awesome.js is located in |
| bower | <code>String</code> | path to bower components |
| constants | <code>Object</code> | awesome constants |
| dispatchers | <code>Object</code> | dispatchers for store/action/component messages |
| stores | <code>Object</code> | awesome 1 way data flow stores for use by components |
| loadTemplate | <code>function</code> | fetches nested template contents for inclusion in awesome-component |
| requireScript | <code>function</code> | inject script tag into header |
| requireCSS | <code>function</code> | inject stylesheet link tag into header |
| mergeDataset | <code>function</code> | merges element's data-* attributes with the defaults for that component element |
| updateAttributesFromData | <code>function</code> | maps data-* values to * attribute values |
| uniqueEntries | <code>function</code> | ensures that keys and values of an object unique |


* [awesome](#awesome) : <code>object</code>
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
        * [.action](#awesome.dispatchers.action)
    * [.stores](#awesome.stores) : <code>Object</code>
    * [.bower](#awesome.bower) : <code>String</code>
    * [.loadTemplate(instance)](#awesome.loadTemplate) ⇒ <code>Object</code>
    * [.requireScript(path)](#awesome.requireScript) ⇒ <code>Boolean</code>
    * [.requireCSS(path)](#awesome.requireCSS) ⇒ <code>Boolean</code>
    * [.mergeDataset(el, defaults)](#awesome.mergeDataset)
    * [.updateAttributesFromData(el, key, value)](#awesome.updateAttributesFromData) ⇒ <code>Object</code>
    * [.uniqueEntries(data)](#awesome.uniqueEntries) ⇒ <code>Boolean</code>
    * ["awesome-script-loaded" (e)](#awesome.event_awesome-script-loaded)

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
all stores should reset their state

**Kind**: static property of <code>[store](#awesome.constants.store)</code>  
<a name="awesome.constants.store.LOGOUT_ERROR"></a>
##### store.LOGOUT_ERROR : <code>EventName</code>
all stores should reset their state

**Kind**: static property of <code>[store](#awesome.constants.store)</code>  
<a name="awesome.constants.store.LOGIN_SUCCESS"></a>
##### store.LOGIN_SUCCESS : <code>EventName</code>
all stores should reset their state

**Kind**: static property of <code>[store](#awesome.constants.store)</code>  
<a name="awesome.constants.store.LOGOUT_SUCCESS"></a>
##### store.LOGOUT_SUCCESS : <code>EventName</code>
all stores should reset their state

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
#### dispatchers.action
awesome dispatcher for actions

**Kind**: static property of <code>[dispatchers](#awesome.dispatchers)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| on | <code>function</code> | binds handler to action event |
| off | <code>function</code> | ***un***binds handler from action event |
| trigger | <code>function</code> | fires store events |

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

