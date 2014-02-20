// $Id$
Meteor.subscribe('entries');
Meteor.subscribe('userinfo');

Template.monthly.events({
  'keyup #monthly_start': function(e, t) {
    var txt = t.find('#monthly_start').value;
    var d = normalizeDateStr(txt);
    if (0 < d.length) {
      Session.set('monthly_start', d);
    }
  },
  'keyup #monthly_end': function(e, t) {
    var txt = t.find('#monthly_end').value;
    var d = normalizeDateStr(txt);
    if (0 < d.length) {
      Session.set('monthly_end', d);
    }
  },
  'click': function(e, t) {
    console.log('click in monthly table');

    var cell = e.target;

    var r = undefined;
    if ('rowname' in cell.attributes) {
      // headers are excluded.
      r = cell.attributes['rowname'].value;
      if (!Session.equals('monthly_row', r)) {
        Session.set('monthly_row', r);

var s = getYYYY_MM_DD(getMonthStart(r));
        Session.set('summary_start', r);
var e = getYYYY_MM_DD(getMonthEnd(r));
        Session.set('summary_end', e);
      }
    }

    var c = cell.attributes['columnname'].value;
    if (!Session.equals('monthly_column', c)) {
      Session.set('summay_colmun', c);
      if (c == 'date') {
        Session.set('summary_category', undefined);
      } else {
        Session.set('summary_category', c);
      }
    }
    console.log('cell ' + r + ' ' + c);

    // put color to a selected cell
    t.findAll(".selected").forEach(function(e) {
      e.className = "";
    });
    cell.className = "selected";
  }
});

var normalizeDateStr = function(datestr) {
  var m = datestr.match(/\d/g);
  var r = m[0] + m[1] + m[2] + m[3] + '-' + m[4] + m[5] + '-' + m[6] + m[7];
  d = Date.parse(r);
  if (!isNaN(d)) {
    return r;
  }
  return '';
}

Template.monthly.monthly = function() {

  var ss = Session.get('monthly_start');
  var se = Session.get('monthly_end');
  var c = monthlyCriteria(ss, se);
  var es = Entries.find(c, {
    sort: {
      created: 1
    }
  });

  var s = {};
  es.forEach(function(e) {
    var c = e.category;
    var d = e.created;
    var dstr = getYYYYMM(d);
    var n = new Number(e.total).valueOf();
    if (typeof n != 'number') {
      n = 0;
    }

    if (typeof s[dstr] == 'undefined') {
      s[dstr] = {};
    }
    if (typeof s[dstr][e.category] == 'undefined') {
      s[dstr][e.category] = 0;
    }

    s[dstr][e.category] += n;
  });

  for (var k in s) {
    //    console.log(k);
    //    console.log(s[k]);
  }

  var a = new Array();
  var i = 0;
  for (var k in s) {
    s[k]['date'] = k;
    a[i] = s[k];
    // console.log(s[k]);
    i++;
  }
  return a;
}

var monthlyCriteria = function(start, end) {
  if (start === undefined && end === undefined) {
    console.log('criteria undefined undefined');
    return {};
  } else if (start !== undefined && end === undefined) {
    console.log('criteria ' + start + ' undefined');
    return {
      purchased: {
        $gte: new Date(start + 'T00:00:00Z')
      }
    };
  } else if (start === undefined && end !== undefined) {
    console.log('criteria undefined ' + end);
    return {
      purchased: {
        $lt: new Date(end + 'T23:59:59Z')
      }
    };
  } else {
    console.log('criteria ' + start + ' ' + end);
    return {
      purchased: {
        $gte: new Date(start + 'T00:00:00Z'),
        $lt: new Date(end + 'T23:59:59Z')
      }
    };
  }
}

var getYYYYMM = function(dt) {
  yy = dt.getYear();
  mm = dt.getMonth() + 1;
  if (yy < 2000) {
    yy += 1900;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return yy + mm;
}
var getYYYY_MM_DD = function(dt) {
  yy = dt.getYear();
  mm = dt.getMonth() + 1;
  dd = dt.getDate();
  if (yy < 2000) {
    yy += 1900;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (dd < 10) {
    dd = "0" + dd;
  }
  return yy + '-' + mm + '-' + dd;
}

var getMonthStart = function(yyyymm) {
  return normalizeDateStr(yyyymm + '01');
}
var getMonthEnd = function(yyyymm) {
  var dt = normalizeDateStr(yyyymm + '01');
  dt.setMonth(dt.getMonth() + 1);
  dt.setDate(dt.getDate() - 1);
  return dt;
}

var normalizeDateStr = function(datestr) {
  if (datestr === undefined) {
    return datestr;
  }

  var m = datestr.match(/\d/g);
  var r = m[0] + m[1] + m[2] + m[3] + '-' + m[4] + m[5] + '-' + m[6] + m[7];
  d = Date.parse(r);
  if (!isNaN(d)) {
    return r;
  }
  return '';
}

