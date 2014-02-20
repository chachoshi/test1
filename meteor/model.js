// $Id$
UserInfo = new Meteor.Collection('userinfo');
Entries = new Meteor.Collection('entries');

Meteor.methods({

  addEntry: function(e) {
    console.log('addEntry');
    e.userId = this.userId;
    e.created = new Date();
    return Entries.insert(e);
  },

  updateEntry: function(criteria, changes, action) {
    console.log('updateEntry');
    Entries.find(criteria).forEach(function(e) {
      Entries.update({
        _id: e._id
      },
      {
        $set: changes
      });

      e.history = e.history || new Array();
      e.history.push(action || {
        action: 'undefined action',
        updated: new Date()
      });
      Entries.update({
        _id: e._id
      },
      {
        $set: {
          history: e.history
        }
      });
    });
  }
});

