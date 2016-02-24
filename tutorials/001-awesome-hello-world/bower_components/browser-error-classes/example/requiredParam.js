'use strict';

const Errors=require(`${__dirname}/../Errors.js`);

console.log(multiplyNumbers());

function multiplyNumbers(numberOne,numberTwo){
    let err;
    numberOne=Number(numberOne);
    numberTwo=Number(numberTwo);

    if(!numberOne){
        err=new Errors.RequiredParameter;
        err.setMessage(
            'numberOne'
        );
        throw err;
    }

    if(!numberTwo){
        err=new Errors.RequiredParameter;
        err.setMessage(
            'numberTwo'
        );
        throw err;
    }

    return numberOne*numberTwo;
}
