// $Id$
Meteor.subscribe('entries');
Meteor.subscribe('userinfo');

Template.summary.events({
  'keyup #summary_start': function(e, t) {
    var txt = t.find('#summary_start').value;
    var d = normalizeDateStr(txt);
    if (0 < d.length) {
      Session.set('summary_start', d);
    }
  },
  'keyup #summary_end': function(e, t) {
    var txt = t.find('#summary_end').value;
    var d = normalizeDateStr(txt);
    if (0 < d.length) {
      Session.set('summary_end', d);
    }
  },
  'click': function(e, t) {
    console.log('click in summary table');

    var cell = e.target;

    var r = undefined;
    if ('rowname' in cell.attributes) {
      // headers are excluded.
      r = cell.attributes['rowname'].value;
      if (!Session.equals('summary_row', r)) {
        Session.set('summary_row', r);
        Session.set('breakdown_start', r);
        Session.set('breakdown_end', r);
      }
    }

    var c = cell.attributes['columnname'].value;
    if (!Session.equals('summary_column', c)) {
      Session.set('summay_colmun', c);
      if (c == 'date') {
        Session.set('breakdown_category', undefined);
      } else {
        Session.set('breakdown_category', c);
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

Template.summary.summary = function() {

  var ss = Session.get('summary_start');
  var se = Session.get('summary_end');
  var c = summaryCriteria(ss, se);
  var es = Entries.find(c, {
    sort: {
      created: 1
    }
  });

  var s = {};
  es.forEach(function(e) {
    var c = e.category;
    var d = e.created;
    var dstr = getYYYYMMDD(d);
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

var summaryCriteria = function(start, end) {
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

var getYYYYMMDD = function(dt) {
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
  return yy + mm + dd;
}

