'use strict';

if(!window.Errors){
    window.Errors={};
}

/**
 * Error for Immutable variables
 *
 * @extends Error
 * @class Errors.Immutable
 * */
window.Errors.Immutable = class Immutable extends Error{
    /**
    * @example
    *

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

     * @example
     *
     * ```sh
     *

immutable.html:39 Uncaught Immutable: "name" is Immutable and may not be modified.
    Scope : {
    "age": 42,
    "name": "bob"
}


     * ```
     *
     * @method Errors.Immutable.setMessage
     * @param {String} varaibleName name of immutable variable
     * @param {Any} scope     Scope of varaible
     * @returns {String}    compiled error message
     */
    setMessage(varaibleName, scope){
        this.name = 'Immutable';
        this.message = `${JSON.stringify(varaibleName,null,4)} is Immutable and may not be modified.
        ${(scope)?
            `Scope : ${JSON.stringify(scope,null,4)}`:
            ''
        }`;
        return this.message;
    }
}
