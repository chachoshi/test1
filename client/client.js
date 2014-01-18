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
      shop: $('#entry_update_shop').val(),
      total: $('#entry_update_total').val(),
      category: $('#entry_update_category').val(),
      memo: $('#entry_update_memo').val()
    };
    var action = {
      action: 'manual update',
      updated: new Date(),
      shop: $('#entry_update_shop').val(),
      total: $('#entry_update_total').val(),
      category: $('#entry_update_category').val(),
      memo: $('#entry_update_memo').val()
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

