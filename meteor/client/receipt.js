// $Id$
Meteor.subscribe('entries');
Meteor.subscribe('userinfo');

Template.receipt.receipt_id = function() {
  return Session.get('receipt_id');
}

Template.receipt.receipt = function() {

  var id = Session.get('receipt_id');
  var es = Entries.find({
    "_id": id
  });

  return es;
};

