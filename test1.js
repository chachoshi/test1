/************************ Client *********************************************/
if (Meteor.isClient) {
  Template.form.events({
    "submit form": function(e, tmpl) {
      e.preventDefault();

      var fileInput = tmpl.find('input[type=file]');

      var form = e.currentTarget;

      // We'll assign each file in the loop to this variable
      var file;

      for (var i = 0; i < fileInput.files.length; i++) {

        file = fileInput.files[i];

        // Read the file into memory
        MeteorFile.read(file, function(err, meteorFile) {

          // Make a Meteor method call passing a meteorFile
          Meteor.call("uploadFile", meteorFile, function(err) {
            if (err) {
              console.log("call uploadFile err");
              throw err;
            }
            else {
              console.log('uploaded: ' + meteorFile.name);
              form.reset();
            }
          });
        });
      }
    }
  });
}
/*****************************************************************************/

/************************ Server *********************************************/
if (Meteor.isServer) {
  Meteor.methods({
    uploadFile: function(file) {

      // database
      var o = {
        filename: null
      };
      Meteor.call("addEntry", o, function(err, r) {
        if (err) {
          console.log("call addEntry err");
          console.log(err);
          return;
        }
        console.log('call addEntry successful.');
        console.log(r);
        o.newId = r;
      });
      var criteria = {
        _id: o.newId
      };
      var change = {
        filename: this.userId + '-' + o.newId + '.' + getExtension(file.name)
      };
      var action = {
        action: 'file uploaded',
        filename: file.name,
        updated: new Date()
      }
      Meteor.call('updateEntry', criteria, change, action, function(err, r) {
        if (err) {
          console.log("call updateEntry err");
          console.log(err);
          return;
        } else {
          console.log('call updateEntry successful.');
        }
      });

      // save files
      var dirPath = '/Users/ise/tmp/uploads';
      file.save(dirPath, {});
      file.rename(dirPath, file.name, change.filename);

    }
  });
}

/*****************************************************************************/

var getExtension = function(filename) {
  var dot = filename.lastIndexOf('.');
  return filename.substring(dot + 1);
};

