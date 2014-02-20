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
  var d = Date.parseYYYYMMDD(teststr);
  assert.equal(teststr, d.getYYYYMMDD());
}
{
  var teststr = '20000101';
  var d = Date.parseYYYYMMDD(teststr);
  assert.equal(teststr, d.getYYYYMMDD());
}
{
  var teststr = '20991231';
  var d = Date.parseYYYYMMDD(teststr);
  assert.equal(teststr, d.getYYYYMMDD());
}
{
  var teststr = '199912';
  var d = Date.parseYYYYMMDD(teststr);
  assert.equal(teststr, d.getYYYYMM());
}

{
  var teststr = '199912';
  var d = Date.parseYYYYMMDD(teststr).setMonthStart().getYYYYMMDD();
  assert.equal('19991201', d);
}
{
  var teststr = '199912';
  var d = Date.parseYYYYMMDD(teststr).setMonthEnd().getYYYYMMDD();
  assert.equal('19991231', d);
}

