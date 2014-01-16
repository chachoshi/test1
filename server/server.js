// $Id$

Meteor.publish('userinfo', function() {
	return UserInfo.find({
		userId : this.userId
	});
});
Meteor.publish('entries', function() {
	return Entries.find({
		userId : this.userId
	});
});

