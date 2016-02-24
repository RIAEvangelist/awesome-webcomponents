<a name="awesome"></a>
## awesome : <code>object</code>
# Awesome-Webcomponents

Awesome ES6 compliant web componants for use in your app or website.

Tested and working on :
* Chrome
* Chromium
* Android Chrome
* FireFox >=45
* IE Edge
* [Electron](http://electron.atom.io/)
* [NW.js](http://nwjs.io/)

Firefox >=45 supports evrything needed with the included ` ./bower_components/document-register-element/build/document-register-element.js `.
IE Edge ` Array.prototype.includes ` polyfill is build into awesome.js

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
| awesome.path | <code>String</code> | Path to folder awesome.js is located in |
| awesome.bower | <code>String</code> | path to bower components |
| awesome.constants | <code>Object</code> | awesome constants |
| awesome.dispatchers | <code>Object</code> | dispatchers for store/action/component messages |
| awesome.stores | <code>Object</code> | registered awesome.Store instances. These are designed to support 1 way data flows for use by components |
| awesome.Store | <code>Class</code> | Store class, used to create new stores |
| awesome.loadTemplate | <code>function</code> | fetches nested template contents for inclusion in awesome-component |
| awesome.requireScript | <code>function</code> | inject script tag into header |
| awesome.requireCSS | <code>function</code> | inject stylesheet link tag into header |
| awesome.mergeDataset | <code>function</code> | merges element's data-* attributes with the defaults for that component element |
| awesome.updateAttributesFromData | <code>function</code> | maps data-* values to * attribute values |
| awesome.uniqueEntries | <code>function</code> | ensures that keys and values of an object unique |


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
            * [.RESET_STORES](#awesome.constants.action.RESET_STORES) : <code>EventName</code>
            * [.GENERIC_DRAG_DROP_FILE](#awesome.constants.action.GENERIC_DRAG_DROP_FILE) : <code>EventName</code>
            * [.LOGOUT_REQUEST](#awesome.constants.action.LOGOUT_REQUEST) : <code>EventName</code>
            * [.LOGIN_REQUEST](#awesome.constants.action.LOGIN_REQUEST) : <code>EventName</code>
            * [.getter()](#awesome.constants.action.getter) ⇒ <code>ActionConstants</code>
            * [.setter(constants)](#awesome.constants.action.setter) ⇒ <code>ActionConstants</code>
        * [.store](#awesome.constants.store) : <code>Object</code>
            * [.RESET](#awesome.constants.store.RESET) : <code>EventName</code>
            * [.LOGIN_ERROR](#awesome.constants.store.LOGIN_ERROR) : <code>EventName</code>
            * [.LOGOUT_ERROR](#awesome.constants.store.LOGOUT_ERROR) : <code>EventName</code>
            * [.LOGIN_SUCCESS](#awesome.constants.store.LOGIN_SUCCESS) : <code>EventName</code>
            * [.LOGOUT_SUCCESS](#awesome.constants.store.LOGOUT_SUCCESS) : <code>EventName</code>
            * [.getter()](#awesome.constants.store.getter) ⇒ <code>StoreConstants</code>
            * [.setter(constants)](#awesome.constants.store.setter) ⇒ <code>StoreConstants</code>
        * [.component](#awesome.constants.component) : <code>Object</code>
            * [.DRAG_DROP_ENTER](#awesome.constants.component.DRAG_DROP_ENTER) : <code>EventName</code>
            * [.DRAG_DROP_OVER](#awesome.constants.component.DRAG_DROP_OVER) : <code>EventName</code>
            * [.DRAG_DROP_LEAVE](#awesome.constants.component.DRAG_DROP_LEAVE) : <code>EventName</code>
            * [.VALIDATE_USERNAME](#awesome.constants.component.VALIDATE_USERNAME) : <code>EventName</code>
            * [.VALIDATE_EMAIL](#awesome.constants.component.VALIDATE_EMAIL) : <code>EventName</code>
            * [.VALIDATE_URL](#awesome.constants.component.VALIDATE_URL) : <code>EventName</code>
            * [.getter()](#awesome.constants.component.getter) ⇒ <code>ComponentConstants</code>
            * [.setter(constants)](#awesome.constants.component.setter) ⇒ <code>ComponentConstants</code>
    * [.dispatchers](#awesome.dispatchers) : <code>Object</code>
        * [.action](#awesome.dispatchers.action) : <code>EventEmitter</code>
        * [.component](#awesome.dispatchers.component) : <code>EventEmitter</code>
        * [.store](#awesome.dispatchers.store) : <code>EventEmitter</code>
    * [.stores](#awesome.stores) : <code>Object</code>
    * [.bower](#awesome.bower) : <code>String</code>
    * [.loadTemplate(instance)](#awesome.loadTemplate) ⇒ <code>Object</code>
    * [.requireScript(path)](#awesome.requireScript) ⇒ <code>Boolean</code>
    * [.requireCSS(path)](#awesome.requireCSS) ⇒ <code>Boolean</code>
    * [.mergeDataset(el, defaults)](#awesome.mergeDataset)
    * [.updateAttributesFromData(el, key, value)](#awesome.updateAttributesFromData) ⇒ <code>HTMLElement</code>
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
Path to folder awesome.js is located in.

**Kind**: static property of <code>[awesome](#awesome)</code>  
**Access:** protected  
**Example**  
```javascript
//use awesome.path to require scripts
awesome.requireCSS(`${awesome.path}components/buttons/awesome-buttonset.css`);
awesome.requireScript(`${awesome.path}components/buttons/awesome-buttonset.js`);
```
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
        * [.RESET_STORES](#awesome.constants.action.RESET_STORES) : <code>EventName</code>
        * [.GENERIC_DRAG_DROP_FILE](#awesome.constants.action.GENERIC_DRAG_DROP_FILE) : <code>EventName</code>
        * [.LOGOUT_REQUEST](#awesome.constants.action.LOGOUT_REQUEST) : <code>EventName</code>
        * [.LOGIN_REQUEST](#awesome.constants.action.LOGIN_REQUEST) : <code>EventName</code>
        * [.getter()](#awesome.constants.action.getter) ⇒ <code>ActionConstants</code>
        * [.setter(constants)](#awesome.constants.action.setter) ⇒ <code>ActionConstants</code>
    * [.store](#awesome.constants.store) : <code>Object</code>
        * [.RESET](#awesome.constants.store.RESET) : <code>EventName</code>
        * [.LOGIN_ERROR](#awesome.constants.store.LOGIN_ERROR) : <code>EventName</code>
        * [.LOGOUT_ERROR](#awesome.constants.store.LOGOUT_ERROR) : <code>EventName</code>
        * [.LOGIN_SUCCESS](#awesome.constants.store.LOGIN_SUCCESS) : <code>EventName</code>
        * [.LOGOUT_SUCCESS](#awesome.constants.store.LOGOUT_SUCCESS) : <code>EventName</code>
        * [.getter()](#awesome.constants.store.getter) ⇒ <code>StoreConstants</code>
        * [.setter(constants)](#awesome.constants.store.setter) ⇒ <code>StoreConstants</code>
    * [.component](#awesome.constants.component) : <code>Object</code>
        * [.DRAG_DROP_ENTER](#awesome.constants.component.DRAG_DROP_ENTER) : <code>EventName</code>
        * [.DRAG_DROP_OVER](#awesome.constants.component.DRAG_DROP_OVER) : <code>EventName</code>
        * [.DRAG_DROP_LEAVE](#awesome.constants.component.DRAG_DROP_LEAVE) : <code>EventName</code>
        * [.VALIDATE_USERNAME](#awesome.constants.component.VALIDATE_USERNAME) : <code>EventName</code>
        * [.VALIDATE_EMAIL](#awesome.constants.component.VALIDATE_EMAIL) : <code>EventName</code>
        * [.VALIDATE_URL](#awesome.constants.component.VALIDATE_URL) : <code>EventName</code>
        * [.getter()](#awesome.constants.component.getter) ⇒ <code>ComponentConstants</code>
        * [.setter(constants)](#awesome.constants.component.setter) ⇒ <code>ComponentConstants</code>

<a name="awesome.constants.action"></a>
#### constants.action : <code>Object</code>
Shallow merge action constants object

**Kind**: static property of <code>[constants](#awesome.constants)</code>  

* [.action](#awesome.constants.action) : <code>Object</code>
    * [.RESET_STORES](#awesome.constants.action.RESET_STORES) : <code>EventName</code>
    * [.GENERIC_DRAG_DROP_FILE](#awesome.constants.action.GENERIC_DRAG_DROP_FILE) : <code>EventName</code>
    * [.LOGOUT_REQUEST](#awesome.constants.action.LOGOUT_REQUEST) : <code>EventName</code>
    * [.LOGIN_REQUEST](#awesome.constants.action.LOGIN_REQUEST) : <code>EventName</code>
    * [.getter()](#awesome.constants.action.getter) ⇒ <code>ActionConstants</code>
    * [.setter(constants)](#awesome.constants.action.setter) ⇒ <code>ActionConstants</code>

<a name="awesome.constants.action.RESET_STORES"></a>
##### action.RESET_STORES : <code>EventName</code>
all stores should reset their state

**Kind**: static property of <code>[action](#awesome.constants.action)</code>  
<a name="awesome.constants.action.GENERIC_DRAG_DROP_FILE"></a>
##### action.GENERIC_DRAG_DROP_FILE : <code>EventName</code>
file dropped into drop field

**Kind**: static property of <code>[action](#awesome.constants.action)</code>  
<a name="awesome.constants.action.LOGOUT_REQUEST"></a>
##### action.LOGOUT_REQUEST : <code>EventName</code>
logout request

**Kind**: static property of <code>[action](#awesome.constants.action)</code>  
**Memeber**: awesome.constants.action.LOGOUT_REQUEST  
<a name="awesome.constants.action.LOGIN_REQUEST"></a>
##### action.LOGIN_REQUEST : <code>EventName</code>
login request

**Kind**: static property of <code>[action](#awesome.constants.action)</code>  
**Memeber**: awesome.constants.action.LOGIN_REQUEST  
<a name="awesome.constants.action.getter"></a>
##### action.getter() ⇒ <code>ActionConstants</code>
action constants getter

**Kind**: static method of <code>[action](#awesome.constants.action)</code>  
**Returns**: <code>ActionConstants</code> - action constants  
**Access:** protected  
<a name="awesome.constants.action.setter"></a>
##### action.setter(constants) ⇒ <code>ActionConstants</code>
action constants setter : merges the current action constants and the new constants via shallow merge.

**Kind**: static method of <code>[action](#awesome.constants.action)</code>  
**Returns**: <code>ActionConstants</code> - actions merged constants  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| constants | <code>Object</code> | constants to merge |

**Example**  
```javascript
//original constants
{
 	ACTION_CONSTANT1: 'actionConst1',
 	ACTION_CONSTANT2: 'actionConst2',
}
myNewConstants = {
 	NEW_CONSTANT_1: 'const1',
 	NEW_CONSTANT_2: 'const2'
}

awesome.action.constants = myNewConstants;

//action constants will now be
//awesome.constants.action
{
 	ACTION_CONSTANT1: 'actionConst1',
 	ACTION_CONSTANT2: 'actionConst2',
 	NEW_CONSTANT_1: 'const1',
 	NEW_CONSTANT_2: 'const2'
}
```
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
    * [.getter()](#awesome.constants.store.getter) ⇒ <code>StoreConstants</code>
    * [.setter(constants)](#awesome.constants.store.setter) ⇒ <code>StoreConstants</code>

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
<a name="awesome.constants.store.getter"></a>
##### store.getter() ⇒ <code>StoreConstants</code>
store constants getter

**Kind**: static method of <code>[store](#awesome.constants.store)</code>  
**Returns**: <code>StoreConstants</code> - store constants  
**Access:** protected  
<a name="awesome.constants.store.setter"></a>
##### store.setter(constants) ⇒ <code>StoreConstants</code>
action constants setter : merges the current store constants and the new constants via shallow merge.

**Kind**: static method of <code>[store](#awesome.constants.store)</code>  
**Returns**: <code>StoreConstants</code> - stores merged constants  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| constants | <code>Object</code> | constants to merge |

**Example**  
```javascript
//original constants
{
 	STORE_CONSTANT1: 'actionConst1',
 	STORE_CONSTANT2: 'actionConst2',
}

myNewConstants = {
 	NEW_CONSTANT_1: 'const1',
 	NEW_CONSTANT_2: 'const2'
}

awesome.constantants.store = myNewConstants;

//action constants will now be
//awesome.constants.store
{
 	STORE_CONSTANT1: 'actionConst1',
 	STORE_CONSTANT2: 'actionConst2',
 	NEW_CONSTANT_1: 'const1',
 	NEW_CONSTANT_2: 'const2'
}
```
<a name="awesome.constants.component"></a>
#### constants.component : <code>Object</code>
Shallow merge constants constants object
                *

**Kind**: static property of <code>[constants](#awesome.constants)</code>  

* [.component](#awesome.constants.component) : <code>Object</code>
    * [.DRAG_DROP_ENTER](#awesome.constants.component.DRAG_DROP_ENTER) : <code>EventName</code>
    * [.DRAG_DROP_OVER](#awesome.constants.component.DRAG_DROP_OVER) : <code>EventName</code>
    * [.DRAG_DROP_LEAVE](#awesome.constants.component.DRAG_DROP_LEAVE) : <code>EventName</code>
    * [.VALIDATE_USERNAME](#awesome.constants.component.VALIDATE_USERNAME) : <code>EventName</code>
    * [.VALIDATE_EMAIL](#awesome.constants.component.VALIDATE_EMAIL) : <code>EventName</code>
    * [.VALIDATE_URL](#awesome.constants.component.VALIDATE_URL) : <code>EventName</code>
    * [.getter()](#awesome.constants.component.getter) ⇒ <code>ComponentConstants</code>
    * [.setter(constants)](#awesome.constants.component.setter) ⇒ <code>ComponentConstants</code>

<a name="awesome.constants.component.DRAG_DROP_ENTER"></a>
##### component.DRAG_DROP_ENTER : <code>EventName</code>
pointer enters drag and drop field

**Kind**: static property of <code>[component](#awesome.constants.component)</code>  
<a name="awesome.constants.component.DRAG_DROP_OVER"></a>
##### component.DRAG_DROP_OVER : <code>EventName</code>
pointer over drag and drop field

**Kind**: static property of <code>[component](#awesome.constants.component)</code>  
**Memeber**: awesome.constants.component.DRAG_DROP_OVER  
<a name="awesome.constants.component.DRAG_DROP_LEAVE"></a>
##### component.DRAG_DROP_LEAVE : <code>EventName</code>
pointer leaves drag and drop field

**Kind**: static property of <code>[component](#awesome.constants.component)</code>  
<a name="awesome.constants.component.VALIDATE_USERNAME"></a>
##### component.VALIDATE_USERNAME : <code>EventName</code>
regular expression for validating user name

**Kind**: static property of <code>[component](#awesome.constants.component)</code>  
**Memeber**: awesome.constants.component.VALIDATE_USERNAME  
<a name="awesome.constants.component.VALIDATE_EMAIL"></a>
##### component.VALIDATE_EMAIL : <code>EventName</code>
regular expression for validating user email

**Kind**: static property of <code>[component](#awesome.constants.component)</code>  
**Memeber**: awesome.constansts.component.VALIDATE_EMAIL  
<a name="awesome.constants.component.VALIDATE_URL"></a>
##### component.VALIDATE_URL : <code>EventName</code>
regular expression for validating url

**Kind**: static property of <code>[component](#awesome.constants.component)</code>  
**Memeber**: awesome.constansts.component.VALIDATE_URL  
<a name="awesome.constants.component.getter"></a>
##### component.getter() ⇒ <code>ComponentConstants</code>
component constants getter

**Kind**: static method of <code>[component](#awesome.constants.component)</code>  
**Returns**: <code>ComponentConstants</code> - component constants  
**Access:** protected  
<a name="awesome.constants.component.setter"></a>
##### component.setter(constants) ⇒ <code>ComponentConstants</code>
component constants setter : merges the current component constants and the new constants via shallow merge.

**Kind**: static method of <code>[component](#awesome.constants.component)</code>  
**Returns**: <code>ComponentConstants</code> - components merged constants  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| constants | <code>Object</code> | constants to merge |

**Example**  
```javascript
//original constants
{
 	COMPONENT_CONSTANT1: 'actionConst1',
 	COMPONENT_CONSTANT2: 'actionConst2',
}

myNewConstants = {
 	NEW_CONSTANT_1: 'const1',
 	NEW_CONSTANT_2: 'const2'
}

awesome.constants.components = myNewConstants;

//action constants will now be
//awesome.constants.component
{
 	COMPONENT_CONSTANT1: 'actionConst1',
 	COMPONENT_CONSTANT2: 'actionConst2',
 	NEW_CONSTANT_1: 'const1',
 	NEW_CONSTANT_2: 'const2'
}
```
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

**Example**  
```javascript
const dispatcher=awesome.dispatchers.action;

dispatcher.trigger(
	storeEvents.EVENT_NAME,
	{
   	data : 'data'
	}
);
```

* [.dispatchers](#awesome.dispatchers) : <code>Object</code>
    * [.action](#awesome.dispatchers.action) : <code>EventEmitter</code>
    * [.component](#awesome.dispatchers.component) : <code>EventEmitter</code>
    * [.store](#awesome.dispatchers.store) : <code>EventEmitter</code>

<a name="awesome.dispatchers.action"></a>
#### dispatchers.action : <code>EventEmitter</code>
awesome dispatcher for actions, uses event-pubsub

**Kind**: static property of <code>[dispatchers](#awesome.dispatchers)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| on | <code>function</code> | binds handler to action event |
| off | <code>function</code> | ***un***binds handler from action event |
| trigger | <code>function</code> | fires store event |

**Example**  
```javascript
//trigger an event to store
awesome.dispatchers.action.trigger(
 	awesome.constants.store.YOUR_STORE_CONSTANT,
 	{
 		data1 : 'data1',
 		data2 : 'data2'
 	}
);

//listen to an event from a component
awesome.dispatchers.action.on(
 	awesome.constants.components.YOUR_COMPONENT_CONSTANT,
 	yourHanderFunction
);

//stop listening to the event
 awesome.dispatchers.action.off(
 	awesome.constants.components.YOUR_COMPONENT_CONSTANT,
 	yourHanderFunction
);
```
<a name="awesome.dispatchers.component"></a>
#### dispatchers.component : <code>EventEmitter</code>
awesome dispatcher for components, uses event-pubsub

**Kind**: static property of <code>[dispatchers](#awesome.dispatchers)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| trigger | <code>function</code> | fires action event |

**Example**  
```javascript
//trigger an event to action
awesome.dispatchers.component.trigger(
 	awesome.constants.action.YOUR_COMPONENT_CONSTANT,
 	{
 		data1 : 'data1',
 		data2 : 'data2'
 	}
);
```
<a name="awesome.dispatchers.store"></a>
#### dispatchers.store : <code>EventEmitter</code>
awesome dispatcher for stores, uses event-pubsub

**Kind**: static property of <code>[dispatchers](#awesome.dispatchers)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| on | <code>function</code> | binds handler to store events |
| off | <code>function</code> | ***un***binds handler from store event |
| events | <code>function</code> | fires event |

**Example**  
```javascript
//listen to an event from an action
awesome.dispatchers.store.on(
 	awesome.constants.action.YOUR_STORE_CONSTANT,
 	yourHanderFunction
);

//stop listening to the event
 awesome.dispatchers.store.off(
 	awesome.constants.components.YOUR_STORE_CONSTANT,
 	yourHanderFunction
);
```
<a name="awesome.stores"></a>
### awesome.stores : <code>Object</code>
awesome 1 way data flow stores for use by component

**Kind**: static property of <code>[awesome](#awesome)</code>  
**Example**  
```javascript
state=awesome.stores.auth.state;

state.on(
  	'change',
  	this.yourAwesomeUpdateHandler.bind(this)
);
```
<a name="awesome.bower"></a>
### awesome.bower : <code>String</code>
Path to bower components

**Kind**: static property of <code>[awesome](#awesome)</code>  
**Access:** protected  
**Example**  
```javascript
//include bower components using the bower components path
awesome.requireScript(`${awesome.bower}bower-component/bower-component.js`);
```
<a name="awesome.loadTemplate"></a>
### awesome.loadTemplate(instance) ⇒ <code>Object</code>
loadTemplate collects template element and returns element

**Kind**: static method of <code>[awesome](#awesome)</code>  
**Returns**: <code>Object</code> - contents of template element  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| instance | <code>Object</code> | instance or scope of template element |

**Example**  
```javascript
//taken from awesome-list example, loadTemplate will load template element of awesome-component
//and returns element

//html snippet

 <awesome-list>
       <template>
           <li>
               Test 1
           </li>
           <li>
               Test 2
           </li>
           <li>
               Test 3
           </li>
       </template>
   </awesome-list>

//js

const content=awesome.loadTemplate(this);

//constents of content
   <template>
       <li>
           Test 1
       </li>
       <li>
           Test 2
       </li>
       <li>
           Test 3
       </li>
   </template>

//usage
//this content can now be loaded into awesome-list

this.innerHTML=`
             <ul>
                 ${content}
             </ul>
         `;
```
<a name="awesome.requireScript"></a>
### awesome.requireScript(path) ⇒ <code>Boolean</code>
requireScript appends scripts to the docuyment head with a differed false

**Kind**: static method of <code>[awesome](#awesome)</code>  
**Returns**: <code>Boolean</code> - true  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | path to script |

**Example**  
```javascript
//here we require the dispatcher to action and the constants to stores and actions
awesome.requireScript(`${awesome.path}dispatchers/action.js`);
awesome.requireScript(`${awesome.path}actions/constants.js`);
awesome.requireScript(`${awesome.path}stores/constants.js`);
```
<a name="awesome.requireCSS"></a>
### awesome.requireCSS(path) ⇒ <code>Boolean</code>
requireCSS requires and appends scripts to CSS head

**Kind**: static method of <code>[awesome](#awesome)</code>  
**Returns**: <code>Boolean</code> - false if stylesheet has already been loaded into document  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path to CSS stylesheet |

**Example**  
```javascript
//require your component CSS
awesome.requireCSS(`${awesome.path}components/your-component/your-component.css`);
```
<a name="awesome.mergeDataset"></a>
### awesome.mergeDataset(el, defaults)
mergeDataset merges element's dataset to current default dataset of document

**Kind**: static method of <code>[awesome](#awesome)</code>  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> | element with dataset to be merged |
| defaults | <code>Object</code> | default dataset |

**Example**  
```javascript
defaultElementDataset = {
 	property1: 'one',
 	property2: 'two'
}

function yourElementAttributeChangeHandler(changedDataset){
		mergeDataset(myElement, changedDataset);
}

//after the dataset changes it will be

//ElementDataset
 {
 	property1 : 'newProp1',
 	property2 : 'newProp2'
 }
```
<a name="awesome.updateAttributesFromData"></a>
### awesome.updateAttributesFromData(el, key, value) ⇒ <code>HTMLElement</code>
updateAttributesFromData updates an element's attributes

**Kind**: static method of <code>[awesome](#awesome)</code>  
**Returns**: <code>HTMLElement</code> - updated element object  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> | element object |
| key | <code>String</code> | key of element |
| value | <code>String</code> | value to update data to |

**Example**  
```javascript
//orginal element attributes
{
 	attribute1 : 'green',
 	attribute2 : 'red',
 	attribute3 : 'white'
}

yourElementAttributeUpdater(element, attribute3, black);

function yourElementAttributeUpdater(element, elementKey,newValue){
 	awesome.updateAttributesFromData(element, elementKey, newValue);
}

//resulting element attributes
{
 	attribute1 : 'green',
 	attribute2 : 'red',
 	attribute3 : 'black'
}
```
<a name="awesome.uniqueEntries"></a>
### awesome.uniqueEntries(data) ⇒ <code>Boolean</code>
uniqueEntries ensures that keys and values of data array are unique

**Kind**: static method of <code>[awesome](#awesome)</code>  
**Returns**: <code>Boolean</code> - true  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Data object or array with unique entries |

**Example**  
```javascript
let arr = ['green', 'red', 'white', 'black', 'red'];

awesome.uniqueEntries(arr);

//respose is
'duplicate value string of red found on 4 && 1 const value strings MUST be unique!'
```
<a name="awesome.event_awesome-script-loaded"></a>
### "awesome-script-loaded" (e)
emitted when a script included via [requireScript](#awesome.requireScript) has completed loading a script.

**Kind**: event emitted by <code>[awesome](#awesome)</code>  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Event Data |
| e.detail | <code>String</code> | path of the loaded script |

**Example**  
```javascript
window.on(
 	'awesome-script-loaded',
 	yourAwesomeLoadedHandler
);
```
