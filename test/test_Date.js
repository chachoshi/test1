// $Id$
var assert = require('assert');
var sample = require('../meteor/lib/Date.js');

var dt = new Date();

console.log(dt.getYYYYMMDD());
console.log(dt.getYYYYMM());
console.log(dt.getYYYY_MM_DD());

dt.setMonthStart();
console.log(dt.getYYYYMMDD());

dt.setMonthEnd();
console.log(dt.getYYYYMMDD());

{
  var teststr = '20130202';
  var d = dt.parseYYYYMMDD(teststr);
  assert.equal(teststr, d.getYYYYMMDD());
}
{
  var teststr = '20000101';
  var d = dt.parseYYYYMMDD(teststr);
  assert.equal(teststr, d.getYYYYMMDD());
}
{
  var teststr = '20991231';
  var d = dt.parseYYYYMMDD(teststr);
  assert.equal(teststr, d.getYYYYMMDD());
}
{
  var teststr = '199912';
  var d = dt.parseYYYYMMDD(teststr);
  assert.equal(teststr, d.getYYYYMM());
}

// console.log('Checking module');
// assert.ok(sample);
//
// console.log('Testing add() medthod');
// assert.equal(sample.add(1, 1), 2);
// assert.notEqual(sample.add(1, 1), 1);
// assert.equal(sample.add('1', 1), 2);
//

