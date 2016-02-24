<a name="Errors"></a>
## Errors : <code>object</code>
# Custom and Explicit Javascript Error Classes

` bower install browser-error-classes `

 Easy to read custom and extensible error classes for the browser which extend the native error classes.

 Include all the errors with ` Error.js ` ***OR*** include just what you need from the ` lib/ ` dir.

 Sometimes, just throwing an error isn't that helpful. Sometimes, handling an error elegantly preventing a crash just isn't quite good enough sometimes you want to handle explicit errors in the UI in specific ways. During team development there are times when you want to throw explicit errors to both help developers understand whats going on, as well as enforce some strict rules. That is what this module is for.

**Kind**: global namespace  
**Example**  
```javascript
<script src='bower_components/browser-error-classes/Errors.js'></script>
```

* [Errors](#Errors) : <code>object</code>
    * [.Immutable](#Errors.Immutable) ⇐ <code>Error</code>
        * [new Immutable()](#new_Errors.Immutable_new)
        * [.setMessage(varaibleName, scope)](#Errors.Immutable.setMessage) ⇒ <code>String</code>
    * [.InvalidMethod](#Errors.InvalidMethod) ⇐ <code>Error</code>
        * [new InvalidMethod()](#new_Errors.InvalidMethod_new)
        * [.setMessage(methodName, method, [scope])](#Errors.InvalidMethod.setMessage) ⇒ <code>String</code>
    * [.InvalidParameter](#Errors.InvalidParameter) ⇐ <code>Error</code>
        * [new InvalidParameter()](#new_Errors.InvalidParameter_new)
        * [.setMessage(parameterName, expected, got, [scope])](#Errors.InvalidParameter.setMessage) ⇒ <code>String</code>
    * [.RequiredParameter](#Errors.RequiredParameter) ⇐ <code>Error</code>
        * [new RequiredParameter()](#new_Errors.RequiredParameter_new)
        * [.setMessage(parameterName, [scope])](#Errors.RequiredParameter.setMessage) ⇒ <code>String</code>
    * [.SocketUnavailable](#Errors.SocketUnavailable) ⇐ <code>Error</code>
        * [new SocketUnavailable()](#new_Errors.SocketUnavailable_new)
        * [.setMessage(socketPath, [scope])](#Errors.SocketUnavailable.setMessage) ⇒ <code>String</code>
    * [.Type](#Errors.Type) ⇐ <code>TypeError</code>
        * [new Type()](#new_Errors.Type_new)
        * [.setMessage(parameterName, type, value, [scope])](#Errors.Type.setMessage) ⇒ <code>String</code>
    * [.UndefinedValue](#Errors.UndefinedValue) ⇐ <code>Error</code>
        * [new UndefinedValue()](#new_Errors.UndefinedValue_new)
        * [.setMessage(variableName, variable, [scope])](#Errors.UndefinedValue.setMessage) ⇒ <code>String</code>

<a name="Errors.Immutable"></a>
### Errors.Immutable ⇐ <code>Error</code>
**Kind**: static class of <code>[Errors](#Errors)</code>  
**Extends:** <code>Error</code>  

* [.Immutable](#Errors.Immutable) ⇐ <code>Error</code>
    * [new Immutable()](#new_Errors.Immutable_new)
    * [.setMessage(varaibleName, scope)](#Errors.Immutable.setMessage) ⇒ <code>String</code>

<a name="new_Errors.Immutable_new"></a>
#### new Immutable()
Error for Immutable variables

<a name="Errors.Immutable.setMessage"></a>
#### Immutable.setMessage(varaibleName, scope) ⇒ <code>String</code>
**Kind**: static method of <code>[Immutable](#Errors.Immutable)</code>  
**Returns**: <code>String</code> - compiled error message  

| Param | Type | Description |
| --- | --- | --- |
| varaibleName | <code>String</code> | name of immutable variable |
| scope | <code>Any</code> | Scope of varaible |

**Example**  
```javascript
class User{
        constructor(name,age){
            Object.defineProperties(
                this,
                {
                    age:{
                        enumerable:true,
                        writable:true,
                        value:age
                    },
                    name:{
                        enumerable:true,
                        get:getName,
                        set:setName
                    }
                }
            );

            let userName=null;

            function getName(){
                return userName;
            }

            function setName(value){
                if(userName){
                    const err=new Errors.Immutable;
                    err.setMessage(
                        'name',
                        this
                    );

                    throw err;
                }
                userName=value;
                return userName;
            }

            if(name){
                this.name=name;
            }
        }
    }

    const bob=new User('bob',42);

    bob.name='bob';
```
**Example**  
```sh


immutable.html:39 Uncaught Immutable: "name" is Immutable and may not be modified.
    Scope : {
    "age": 42,
    "name": "bob"
}
```
<a name="Errors.InvalidMethod"></a>
### Errors.InvalidMethod ⇐ <code>Error</code>
**Kind**: static class of <code>[Errors](#Errors)</code>  
**Extends:** <code>Error</code>  

* [.InvalidMethod](#Errors.InvalidMethod) ⇐ <code>Error</code>
    * [new InvalidMethod()](#new_Errors.InvalidMethod_new)
    * [.setMessage(methodName, method, [scope])](#Errors.InvalidMethod.setMessage) ⇒ <code>String</code>

<a name="new_Errors.InvalidMethod_new"></a>
#### new InvalidMethod()
Error for methods which are either undefined or not methods (functions)

<a name="Errors.InvalidMethod.setMessage"></a>
#### InvalidMethod.setMessage(methodName, method, [scope]) ⇒ <code>String</code>
**Kind**: static method of <code>[InvalidMethod](#Errors.InvalidMethod)</code>  
**Returns**: <code>String</code> - compiled error message  

| Param | Type | Description |
| --- | --- | --- |
| methodName | <code>String</code> | method name |
| method | <code>Any</code> | expected method |
| [scope] | <code>Any</code> | scope in which the invalid method is expected |

**Example**  
```javascript
class User{
            constructor(name,age){
                this.name=name;
                this.age=age;
            }
         }

        const bob=new User('bob',42);

        if(!bob.getInfo || typeof bob.getInfo !== 'function'){
            const err=new Errors.InvalidMethod;
            err.setMessage('getInfo',bob.getInfo,bob);
        }
```
**Example**  
```sh


 invalidMethod.html:25 Uncaught InvalidMethod: Expects "getInfo" to be Function but got undefined
             Scope : {
     "name": "bob",
     "age": 42
 }

```
<a name="Errors.InvalidParameter"></a>
### Errors.InvalidParameter ⇐ <code>Error</code>
**Kind**: static class of <code>[Errors](#Errors)</code>  
**Extends:** <code>Error</code>  

* [.InvalidParameter](#Errors.InvalidParameter) ⇐ <code>Error</code>
    * [new InvalidParameter()](#new_Errors.InvalidParameter_new)
    * [.setMessage(parameterName, expected, got, [scope])](#Errors.InvalidParameter.setMessage) ⇒ <code>String</code>

<a name="new_Errors.InvalidParameter_new"></a>
#### new InvalidParameter()
Error for invalid parameters

<a name="Errors.InvalidParameter.setMessage"></a>
#### InvalidParameter.setMessage(parameterName, expected, got, [scope]) ⇒ <code>String</code>
**Kind**: static method of <code>[InvalidParameter](#Errors.InvalidParameter)</code>  
**Returns**: <code>String</code> - compiled error message  

| Param | Type | Description |
| --- | --- | --- |
| parameterName | <code>Any</code> | name of parameter |
| expected | <code>Any</code> | what it expected |
| got | <code>Any</code> | what it got |
| [scope] | <code>Any</code> | optional value where the parameter came from like an object or array |

**Example**  
```javascript
let test={a:1,b:0};

if(test.b<1){
    err=new Errors.InvalidParameter;
    err.setMessage(
        'b',
        'a value greater than 0',
        test.b,
        test
    );
    throw err;
}
```
**Example**  
```sh



        InvalidParameter: 'b' Expects 'a value greater than 0' but got 0

        at InvalidParameter (/home/bmiller/git/node-error-classes/lib/InvalidParameter.js:11:1)
        at multiplyNumbers (/home/bmiller/git/node-error-classes/example/invalidParam.js:13:13)

```
<a name="Errors.RequiredParameter"></a>
### Errors.RequiredParameter ⇐ <code>Error</code>
**Kind**: static class of <code>[Errors](#Errors)</code>  
**Extends:** <code>Error</code>  

* [.RequiredParameter](#Errors.RequiredParameter) ⇐ <code>Error</code>
    * [new RequiredParameter()](#new_Errors.RequiredParameter_new)
    * [.setMessage(parameterName, [scope])](#Errors.RequiredParameter.setMessage) ⇒ <code>String</code>

<a name="new_Errors.RequiredParameter_new"></a>
#### new RequiredParameter()
error for required params that are not set or passed

<a name="Errors.RequiredParameter.setMessage"></a>
#### RequiredParameter.setMessage(parameterName, [scope]) ⇒ <code>String</code>
**Kind**: static method of <code>[RequiredParameter](#Errors.RequiredParameter)</code>  
**Returns**: <code>String</code> - compiled error message  

| Param | Type | Description |
| --- | --- | --- |
| parameterName | <code>Any</code> | name of parameter |
| [scope] | <code>Any</code> | optional value where the parameter came from like an object or array |

**Example**  
```javascript
let test={a:1,b:0};

if(!test.c){
    err=new Errors.RequiredParameter;
    err.setMessage(
        'c',
        test
    );
    throw err;
}
```
**Example**  
```sh


        RequiredParameter: Expects 'numberOne' to be defined

        at RequiredParameter (/home/bmiller/git/node-error-classes/lib/RequiredParameter.js:12:1)
        at multiplyNumbers (/home/bmiller/git/node-error-classes/example/requiredParam.js:13:13)
```
<a name="Errors.SocketUnavailable"></a>
### Errors.SocketUnavailable ⇐ <code>Error</code>
**Kind**: static class of <code>[Errors](#Errors)</code>  
**Extends:** <code>Error</code>  

* [.SocketUnavailable](#Errors.SocketUnavailable) ⇐ <code>Error</code>
    * [new SocketUnavailable()](#new_Errors.SocketUnavailable_new)
    * [.setMessage(socketPath, [scope])](#Errors.SocketUnavailable.setMessage) ⇒ <code>String</code>

<a name="new_Errors.SocketUnavailable_new"></a>
#### new SocketUnavailable()
Error for when an expected socket is not available

<a name="Errors.SocketUnavailable.setMessage"></a>
#### SocketUnavailable.setMessage(socketPath, [scope]) ⇒ <code>String</code>
**Kind**: static method of <code>[SocketUnavailable](#Errors.SocketUnavailable)</code>  
**Returns**: <code>String</code> - compiled error message  

| Param | Type | Description |
| --- | --- | --- |
| socketPath | <code>Any</code> | name of parameter |
| [scope] | <code>Any</code> | optional value with information on the socket or constructor |

**Example**  
```javascript
const ipc=require('node-ipc');
        const Errors=require('node-error-classes');
        ipc.config.id   = 'hello';
        ipc.config.maxRetries = 3;
        ipc.config.silent=true;

        ipc.connectTo(
            'world',
            function(){
                ipc.of.world.on(
                    'destroy',
                    function(data){
                        const err=new Errors.SocketUnavailable;
                        err.setMessage(
                            ipc.of.world.path,
                            ipc.of.world
                        );
                        throw err;
                    }
                );
            }
        );
```
**Example**  
```sh


        SocketUnavailable: Socket of '/tmp/app.world' Unavailable

        at SocketUnavailable (/home/bmiller/git/node-error-classes/lib/SocketUnavailable.js:11:1)
        at Object.<anonymous> (/home/bmiller/git/node-error-classes/example/socketUnavailable.js:14:27)
        at Object.pub (/home/bmiller/git/node-error-classes/node_modules/node-ipc/node_modules/event-pubsub/event-pubsub.js:69:19)
        at Object.trigger (/home/bmiller/git/node-error-classes/node_modules/node-ipc/node_modules/event-pubsub/event-pubsub.js:111:21)
        at Socket.connectionClosed (/home/bmiller/git/node-error-classes/node_modules/node-ipc/dao/client.js:157:24)
        at emitOne (events.js:77:13)
        at Socket.emit (events.js:169:7)
        at Pipe._onclose (net.js:469:12)

```
<a name="Errors.Type"></a>
### Errors.Type ⇐ <code>TypeError</code>
**Kind**: static class of <code>[Errors](#Errors)</code>  
**Extends:** <code>TypeError</code>  

* [.Type](#Errors.Type) ⇐ <code>TypeError</code>
    * [new Type()](#new_Errors.Type_new)
    * [.setMessage(parameterName, type, value, [scope])](#Errors.Type.setMessage) ⇒ <code>String</code>

<a name="new_Errors.Type_new"></a>
#### new Type()
Used for normalizing the message of a type error

<a name="Errors.Type.setMessage"></a>
#### Type.setMessage(parameterName, type, value, [scope]) ⇒ <code>String</code>
**Kind**: static method of <code>[Type](#Errors.Type)</code>  
**Returns**: <code>String</code> - compiled error message  

| Param | Type | Description |
| --- | --- | --- |
| parameterName | <code>Any</code> | name of parameter |
| type | <code>String</code> | Type String |
| value | <code>Any</code> | value that caused error |
| [scope] | <code>Any</code> | optional value where the parameter came from like an object or array |

**Example**  
```javascript
let test={a:1,b:0};

if(typeof test.b!=='object'){
    err=new Errors.Type;
    err.setMessage(
        'b',
        'Object',
        test.b,
        test
    );
    throw err;
}
```
**Example**  
```sh

git/node-error-classes/example/typeError.js:19
        throw err;
        ^

        TypeError: 'numberOne' Expects String but got number : 6

        at Type (/home/bmiller/git/node-error-classes/lib/Type.js:12:1)
        at multiplyNumbers (/home/bmiller/git/node-error-classes/example/typeError.js:13:13)
```
<a name="Errors.UndefinedValue"></a>
### Errors.UndefinedValue ⇐ <code>Error</code>
**Kind**: static class of <code>[Errors](#Errors)</code>  
**Extends:** <code>Error</code>  

* [.UndefinedValue](#Errors.UndefinedValue) ⇐ <code>Error</code>
    * [new UndefinedValue()](#new_Errors.UndefinedValue_new)
    * [.setMessage(variableName, variable, [scope])](#Errors.UndefinedValue.setMessage) ⇒ <code>String</code>

<a name="new_Errors.UndefinedValue_new"></a>
#### new UndefinedValue()
Error for undefined values

<a name="Errors.UndefinedValue.setMessage"></a>
#### UndefinedValue.setMessage(variableName, variable, [scope]) ⇒ <code>String</code>
**Kind**: static method of <code>[UndefinedValue](#Errors.UndefinedValue)</code>  
**Returns**: <code>String</code> - compiled error message  

| Param | Type | Description |
| --- | --- | --- |
| variableName | <code>String</code> | varible name |
| variable | <code>Any</code> | varible |
| [scope] | <code>Any</code> | scope in which the variable should exist |

**Example**  
```javascript
const user={
       name:'bob'
    }

    if(!user.age){
      const err = new Errors.UndefinedValue;
      err.setMessage(
          'age',
          user.age,
          user
      );
      throw err;
    }
```
**Example**  
```sh

    git/node-error-classes/example/undefinedValue.js:14
       throw err;
       ^

    Undefined: 'string'
```
