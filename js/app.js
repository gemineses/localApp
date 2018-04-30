// App logic.
window.myApp = {};

document.addEventListener('init', function(event) {
  var page = event.target;


  //create dabase
  
  myApp.db_object.createDatabase(myApp.db_object.db)

  myApp.db_object.execute_select();

  // Each page calls its own initialization controller.
  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

  // Fill the lists with initial data when the pages we need are ready.
  // This only happens once at the beginning of the app.
  if (page.id === 'menuPage' || page.id === 'pendingTasksPage') {
    if (document.querySelector('#menuPage')
      && document.querySelector('#pendingTasksPage')
      && !document.querySelector('#pendingTasksPage ons-list-item')
    ) {
      myApp.services.fixtures.forEach(function(data) {
        myApp.services.tasks.create(data);
      });
    }
  }
});


/*
var basetest = openDatabase("basetest", "1.0", "basetest database", 2 * 1024 * 1024);
basetest.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS REQUEST (id, name)');
  });

basetest.transaction(function (tx) {
    tx.executeSql('INSERT INTO REQUEST VALUES (0, "weew")');
  });*/