var userId;

if (Meteor.isClient) {
  Deps.autorun(function(){
    if(Meteor.userId()){
      userId = Meteor.userId();
      console.log('login userId=' + userId);
      $('input').removeAttr('disabled');
    }
  });
  Deps.autorun(function(){
    if(!Meteor.userId()){
      console.log('logoff userId=' + userId);
      userId = null;
      $('input').attr('disabled', 'true');
    }
  });

}

