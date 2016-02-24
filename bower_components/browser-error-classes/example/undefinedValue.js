'use strict';

const Errors = require('../Errors.js');

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
