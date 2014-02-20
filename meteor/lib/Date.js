// $Id$
Date.prototype.getYYYYMMDD = function() {
  var yy = this.getFullYear();
  var mm = this.getMonth() + 1;
  var dd = this.getDate();
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (dd < 10) {
    dd = "0" + dd;
  }
  return yy + '' + mm + '' + dd;
}

Date.prototype.getYYYYMM = function() {
  var yy = this.getFullYear();
  var mm = this.getMonth() + 1;
  if (mm < 10) {
    mm = "0" + mm;
  }
  return yy + '' + mm;
}

Date.prototype.getYYYY_MM_DD = function() {
  var yy = this.getFullYear();
  var mm = this.getMonth() + 1;
  var dd = this.getDate();
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (dd < 10) {
    dd = "0" + dd;
  }
  return yy + '-' + mm + '-' + dd;
}

Date.prototype.setMonthStart = function() {
//  this.setTime(this.getTime() - (this.getTime() % (86400 * 1000)));
  console.log('setMonthStart');
  console.log(this.toString());
  this.setDate(1);
  return this;
}

Date.prototype.setMonthEnd = function() {
  this.setMonthStart();

  this.setMonth(this.getMonth() + 1);
  this.setTime(this.getTime() - (86400 * 1000));
  return this;
}


/* Static methods */

Date.parseYYYYMMDD = function(datestr) {
  if (datestr === undefined) {
    return datestr;
  }
  if (typeof datestr === 'object') {
    if (datestr.constructor.name == 'Date') {
      return datestr;
    }
  }

  var d = new Date(2000, 0, 1);
  var m = datestr.match(/\d/g);
  if (8 <= m.length) {
    d.setDate(parseInt(m[6] + m[7]));
  }
  if (6 <= m.length) {
    d.setMonth(parseInt(m[4] + m[5]) - 1);
  }
  if (4 <= m.length) {
    d.setFullYear(m[0] + m[1] + m[2] + m[3]);
  } else {
    return undefined;
  }

  if (!isNaN(d)) {
    // console.log('parsed=' + d.toString());
    return d;
  }
  return undefined;
}

