<a name="Awesome"></a>
## Awesome
# Awesome-Webcomponents
### Working Component Examples and Demos
[awesome-webcomponents on github.io](https://riaevangelist.github.io/awesome-webcomponents/)
#### Licensed under DBAD license
See the [DBAD license](https://github.com/philsturgeon/dbad) in your language or our [licence.md](https://github.com/RIAEvangelist/awesome-webcomponents/blob/master/LICENSE.md) file.
`npm install `

**Kind**: global class  

* [Awesome](#Awesome)
    * [new Awesome()](#new_Awesome_new)
    * [.path](#Awesome.path)
    * [.constants](#Awesome.constants) : <code>Object</code>
        * [.action](#Awesome.constants.action) : <code>Object</code>
        * [.store](#Awesome.constants.store) : <code>Object</code>
        * [.component](#Awesome.constants.component) : <code>Object</code>
    * [.dispatchers](#Awesome.dispatchers) : <code>Object</code>
    * [.stores](#Awesome.stores) : <code>Object</code>
    * [.loadTemplate(instance)](#Awesome.loadTemplate) ⇒ <code>Object</code>
    * [.requireScript(path)](#Awesome.requireScript) ⇒ <code>Boolean</code>
    * [.requireCSS(path)](#Awesome.requireCSS) ⇒ <code>Boolean</code>
    * [.mergeDataset(el, defaults)](#Awesome.mergeDataset)
    * [.updateAttributesFromData(el, key, value)](#Awesome.updateAttributesFromData) ⇒ <code>Object</code>
    * [.uniqueEntries(data)](#Awesome.uniqueEntries) ⇒ <code>Boolean</code>

<a name="new_Awesome_new"></a>
### new Awesome()
constructor creates awesome

<a name="Awesome.path"></a>
### Awesome.path
Path is used for requiring scripts or CSS to components or screens

**Kind**: static property of <code>[Awesome](#Awesome)</code>  
<a name="Awesome.constants"></a>
### Awesome.constants : <code>Object</code>
constants

**Kind**: static property of <code>[Awesome](#Awesome)</code>  

* [.constants](#Awesome.constants) : <code>Object</code>
    * [.action](#Awesome.constants.action) : <code>Object</code>
    * [.store](#Awesome.constants.store) : <code>Object</code>
    * [.component](#Awesome.constants.component) : <code>Object</code>

<a name="Awesome.constants.action"></a>
#### constants.action : <code>Object</code>
get or set action constants

**Kind**: static property of <code>[constants](#Awesome.constants)</code>  
<a name="Awesome.constants.store"></a>
#### constants.store : <code>Object</code>
get or set store constants

**Kind**: static property of <code>[constants](#Awesome.constants)</code>  
<a name="Awesome.constants.component"></a>
#### constants.component : <code>Object</code>
get or set component constants

**Kind**: static property of <code>[constants](#Awesome.constants)</code>  
<a name="Awesome.dispatchers"></a>
### Awesome.dispatchers : <code>Object</code>
dispatchers for store/action/component messages

**Kind**: static property of <code>[Awesome](#Awesome)</code>  
<a name="Awesome.stores"></a>
### Awesome.stores : <code>Object</code>
stores

**Kind**: static property of <code>[Awesome](#Awesome)</code>  
<a name="Awesome.loadTemplate"></a>
### Awesome.loadTemplate(instance) ⇒ <code>Object</code>
loadTemplate collects template element and returns element

**Kind**: static method of <code>[Awesome](#Awesome)</code>  
**Returns**: <code>Object</code> - contents of template element  

| Param | Type | Description |
| --- | --- | --- |
| instance | <code>Object</code> | instance or scope of template element |

<a name="Awesome.requireScript"></a>
### Awesome.requireScript(path) ⇒ <code>Boolean</code>
requireScript includes js scripts into document

**Kind**: static method of <code>[Awesome](#Awesome)</code>  
**Returns**: <code>Boolean</code> - true  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | path to script |

<a name="Awesome.requireCSS"></a>
### Awesome.requireCSS(path) ⇒ <code>Boolean</code>
requireCSS requires a CSS stylesheet into the document

**Kind**: static method of <code>[Awesome](#Awesome)</code>  
**Returns**: <code>Boolean</code> - false if stylesheet has already been loaded into document  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path to CSS stylesheet |

<a name="Awesome.mergeDataset"></a>
### Awesome.mergeDataset(el, defaults)
mergeDataset merges element's dataset to current default dataset of document

**Kind**: static method of <code>[Awesome](#Awesome)</code>  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Object</code> | element dataset to be merged |
| defaults | <code>Object</code> | default dataset |

<a name="Awesome.updateAttributesFromData"></a>
### Awesome.updateAttributesFromData(el, key, value) ⇒ <code>Object</code>
updateAttributesFromData updates an element's attributes

**Kind**: static method of <code>[Awesome](#Awesome)</code>  
**Returns**: <code>Object</code> - updted element object  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Object</code> | element object |
| key | <code>String</code> | key of element |
| value | <code>String</code> | value to update data to |

<a name="Awesome.uniqueEntries"></a>
### Awesome.uniqueEntries(data) ⇒ <code>Boolean</code>
uniqueEntries ensures that keys and values of data array are unique

**Kind**: static method of <code>[Awesome](#Awesome)</code>  
**Returns**: <code>Boolean</code> - true  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | Data array with unique entries |

<a name="event_awesome-script-loaded"></a>
## "awesome-script-loaded"
scriptLoaded emits an event when the awesome-script has been loaded with the instance of 'this' as data

**Kind**: event emitted  
