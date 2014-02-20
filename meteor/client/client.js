// $Id$
Meteor.subscribe('entries');
Meteor.subscribe('userinfo');

Template.entries_board.entries = function() {
  return Entries.find({});
};

Template.entries_board.events({
  'click': function() {
    console.log('click this._id=' + this._id);
    Session.set('selected_entry', this._id);

    var e = Entries.findOne({
      _id: this._id
    });
    $('#entry_update_shop').val(e.shop);
    $('#entry_update_total').val(e.total);
    $('#entry_update_category').val(e.category);
    $('#entry_update_memo').val(e.memo);
  }
});

Template.entry_update.events({
  'click input[type=submit]': function(e, tmpl) {
    e.preventDefault();
    console.log('submit');

    var id = Session.get('selected_entry');

    var criteria = {
      _id: id
    };
    console.log(criteria);
    var changes = {
      shop: tmpl.find('#entry_update_shop').value,
      total: tmpl.find('#entry_update_total').value,
      category: tmpl.find('#entry_update_category').value,
      memo: tmpl.find('#entry_update_memo').value
    };
    var action = {
      action: 'manual update',
      updated: new Date(),
      shop: tmpl.find('#entry_update_shop').value,
      total: tmpl.find('#entry_update_total').value,
      category: tmpl.find('#entry_update_category').value,
      memo: tmpl.find('#entry_update_memo').value
    };
    Meteor.call('updateEntry', criteria, changes, action, function(err, r) {
      if (err) {
        console.log("call updateEntry err");
        console.log(err);
        return;
      } else {
        console.log('call updateEntry successful.');
      }
    });
  }
});

var currentText = '';

Template.entry_history.history_items = function() {
  var id = Session.get('selected_entry');
  if (id) {
    //    if (typeof Entries.findOne !='function') {
    //      return new Array();
    //    }
    var h = Entries.findOne({
      _id: id
    }).history;

    //    console.log(h);
    var ret = new Array(h.length);
    for (var i = 0; i < h.length; i++) {
      ret[i] = new Array();
      for (k in h[i]) {
        //        console.log(k);
        //        console.log(h[i][k]);
        var n = ret[i].length;
        ret[i][n] = {};
        ret[i][n]['key'] = k;
        ret[i][n]['value'] = h[i][k];
      }
    }
    //    console.log(ret);
    return ret;
  } else {
    return new Array();
  }
}

