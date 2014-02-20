// $Id$
Meteor.subscribe('entries');
Meteor.subscribe('userinfo');

Template.monthly.events({
  'keyup #monthly_start': function(e, t) {
    var txt = t.find('#monthly_start').value;
    var d = Date.parseYYYYMMDD(txt).getYYYYMM();
    if (0 < d.length) {
      Session.set('monthly_start', d);
    }
  },
  'keyup #monthly_end': function(e, t) {
    var txt = t.find('#monthly_end').value;
    var d = Date.parseYYYYMMDD(txt).getYYYYMM();
    if (0 < d.length) {
      Session.set('monthly_end', d);
    }
  },
  'click #monthly_table': function(e, t) {
    console.log('click in monthly table');

    var cell = e.target;

    var r = undefined;
    if ('rowname' in cell.attributes) {
      // headers are excluded.
      r = cell.attributes['rowname'].value;
      if (!Session.equals('monthly_row', r)) {
        Session.set('monthly_row', r);

        var s = Date.parseYYYYMMDD(r).setMonthStart().getYYYYMMDD();
        Session.set('summary_start', s);
        var e = Date.parseYYYYMMDD(r).setMonthEnd().getYYYYMMDD();
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
    var dstr = Date.parseYYYYMMDD(d).getYYYYMM();
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

/*
 * @arg start - 6 digits string
 * @arg end - 6 digits string
 */
var monthlyCriteria = function(start, end) {
  if (start != undefined) {
    start = Date.parseYYYYMMDD(start).setMonthStart().getYYYY_MM_DD();
  }
  if (end != undefined) {
    end = Date.parseYYYYMMDD(end).setMonthEnd().getYYYY_MM_DD();
  }

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

