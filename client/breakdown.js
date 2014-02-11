// $Id$
Meteor.subscribe('entries');
Meteor.subscribe('userinfo');

Template.breakdown.breakdown_start = function() {
  return Session.get('breakdown_start');
}

Template.breakdown.breakdown_end = function() {
  return Session.get('breakdown_end');
}

Template.breakdown.breakdown_category = function() {
  return Session.get('breakdown_category');
}

Template.breakdown.events({
  'keyup #breakdown_start': function(e, t) {
    e.preventDefault();
    var txt = t.find('#breakdown_start').value;
    var d = normalizeDateStr(txt);
    if (0 < d.length) {
      Session.set('breakdown_start', d);
    }
  },
  'keyup #breakdown_end': function(e, t) {
    e.preventDefault();
    var txt = t.find('#breakdown_end').value;
    var d = normalizeDateStr(txt);
    if (0 < d.length) {
      Session.set('breakdown_end', d);
    }
  },
  'keyup #breakdown_category': function(e, t) {
    e.preventDefault();
    var txt = t.find('#breakdown_category').value;
    Session.set('breakdown_category', d);
  },
  'click': function(e, t) {
    console.log('click in breakdown table');

    var cell = e.target;
    if (! ('rowname' in cell.attributes)) {
      console.log('cell: not prepared cell');
      return;
    }

    var r = cell.attributes['rowname'].value;
    var c = cell.attributes['columnname'].value;
    console.log('cell ' + r + ' ' + c);
    if (!Session.equals('breakdown_row', r)) {
      Session.set('breakdown_row', r);
      Session.set('receipt_id', r);
    }
    if (!Session.equals('breakdown_column', c)) {
      Session.set('breakdown_column', c);
    }
  }
});

Template.breakdown.breakdown = function() {
  console.log('breakdown.breakdown');
  var start = Session.get('breakdown_start');
  var end = Session.get('breakdown_end');
  var category = Session.get('breakdown_category');
  var c = breakdownCriteria(start, end, category);
  var es = Entries.find(c, {
    sort: {
      created: 1
    }
  });

  return es;
}

var breakdownCriteria = function(start, end, category) {
  start = normalizeDateStr(start);
  end = normalizeDateStr(end);

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

Template.breakdown.helpers({
  formatYYYYMMDD: function(dt) {
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
});

