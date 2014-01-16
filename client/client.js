// $Id$

Meteor.subscribe('entries');
Meteor.subscribe('userinfo');

Template.entries_board.entries = function() {
	return Entries.find({});
};

