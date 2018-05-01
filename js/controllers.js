/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

myApp.controllers = {

  //////////////////////////
  // Tabbar Page Controller //
  //////////////////////////
  tabbarPage: function(page) {
    // Set button functionality to open/close the menu.
    page.querySelector('[component="button/menu"]').onclick = function() {
      document.querySelector('#mySplitter').left.toggle();
    };

    // Set button functionality to push 'new_task.html' page.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/new-task"]'), function(element) {
      element.onclick = function() {
        document.querySelector('#myNavigator').pushPage('html/new_task.html');
      };

      element.show && element.show(); // Fix ons-fab in Safari.
    });

    // Change tabbar animation depending on platform.
    page.querySelector('#myTabbar').setAttribute('animation', ons.platform.isAndroid() ? 'slide' : 'none');
  },

  ////////////////////////
  // Menu Page Controller //
  ////////////////////////
  menuPage: function(page) {
    // Set functionality for 'No Category' and 'All' default categories respectively.
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item[category-id=""]'));
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item:not([category-id])'));

    // Change splitter animation depending on platform.
    document.querySelector('#mySplitter').left.setAttribute('animation', ons.platform.isAndroid() ? 'overlay' : 'reveal');
  },

  ////////////////////////////
  // New Task Page Controller //
  ////////////////////////////
  newTaskPage: function(page) {
    // Set button functionality to save a new task.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/save-task"]'), function(element) {
      element.onclick = function() {
        var newTitle = page.querySelector('#name-input').value;


        getting_data = {
                title: newTitle,
                category: page.querySelector('#category-select-input').value,
                date_created: page.querySelector('#date-created-input').value,
                date_expired: page.querySelector('#date-expired-input').value,
                remarks: page.querySelector('#remarks-input').value,
                status: page.querySelector('#status-input').value,
                cost: page.querySelector('#cost-input').value,
                number: page.querySelector('#number-input').value,
                type_card: page.querySelector('#type-card-select-input').value,
                bank: page.querySelector('#bank-input').value,
                security_questions: page.querySelector('#security-questions-input').value,
                answer: page.querySelector('#answer-input').value,
                title_select: page.querySelector('#title-select-input').value,
                middle_name: page.querySelector('#middle-name-input').value,
                last_name: page.querySelector('#last-name-input').value,
                dba_name: page.querySelector('#dba-name-input').value,
                gender: page.querySelector('#gender-input').value,
                street: page.querySelector('#street-input').value,
                city: page.querySelector('#city-input').value,
                state: page.querySelector('#state-input').value,
                zipcode: page.querySelector('#zipcode-input').value,
                country: page.querySelector('#country-input').value,
                phone: page.querySelector('#phone-input').value,
                email: page.querySelector('#email-input').value,
                fax: page.querySelector('#fax-input').value,
                dob: page.querySelector('#dob-input').value,
                prescription: page.querySelector('#prescription-input').value,
                frecuency: page.querySelector('#frecuency-input').value,
                highlight: false,
                urgent: false
            }
        
        myApp.db_object.execute_insert(getting_data)
        
        // If input title is not empty, create a new task.
        
        //myApp.services.tasks.create(getting_data);

        // Set selected category to 'All', refresh and pop page.
        /*document.querySelector('#default-category-list ons-list-item ons-radio').checked = true;
        document.querySelector('#default-category-list ons-list-item').updateCategoryView();*/
        //document.querySelector('#myNavigator').popPage();
        location.reload();

      };
    });
  },

  ////////////////////////////////
  // Details Task Page Controller //
  ///////////////////////////////
  detailsTaskPage: function(page) {
    // Get the element passed as argument to pushPage.
    var element = page.data.element;

    console.log("en detalles")
    /*console.log(myApp.services.fixtures)
    console.log(element.data.title)
    console.log(element.data.remarks)*/
    // Fill the view with the stored data.

    console.log(element.data);
    console.log(page.querySelector);

    page.querySelector('#name-input').value = element.data.title;
    page.querySelector('#remarks-input').value = element.data.remarks;
    page.querySelector('#category-select-input').value = element.data.category;
    page.querySelector('#date-created-input').value = element.data.date_created;
    page.querySelector('#date-expired-input').value = element.data.date_expired;
    page.querySelector('#remarks-input').value = element.data.remarks;
    page.querySelector('#status-input').value = element.data.status;
    page.querySelector('#cost-input').value = element.data.cost;
    page.querySelector('#number-input').value = element.data.number;
    page.querySelector('#type-card-select-input').value = element.data.type_card;
    page.querySelector('#bank-input').value = element.data.bank;
    page.querySelector('#security-questions-input').value = element.data.security_questions;
    page.querySelector('#answer-input').value = element.data.answer;
    page.querySelector('#title-select-input').value = element.data.title_select;
    page.querySelector('#middle-name-input').value = element.data.middle_name;
    page.querySelector('#last-name-input').value = element.data.last_name;
    page.querySelector('#dba-name-input').value = element.data.dba_name;
    page.querySelector('#gender-input').value = element.data.gender;
    page.querySelector('#street-input').value = element.data.street;
    page.querySelector('#city-input').value = element.data.city;
    page.querySelector('#state-input').value = element.data.state;
    page.querySelector('#zipcode-input').value = element.data.zipcode;
    page.querySelector('#country-input').value = element.data.country;
    page.querySelector('#phone-input').value = element.data.phone;
    page.querySelector('#email-input').value = element.data.email;
    page.querySelector('#fax-input').value = element.data.fax;
    page.querySelector('#dob-input').value = element.data.dob;
    page.querySelector('#prescription-input').value = element.data.prescription;
    page.querySelector('#frecuency-input').value = element.data.frecuency;


    //page.querySelector('#highlight-input').checked = element.data.highlight;
    //page.querySelector('#urgent-input').checked = element.data.urgent;

    // Set button functionality to save an existing task.
    /*page.querySelector('[component="button/save-task"]').onclick = function() {
      var newTitle = page.querySelector('#name-input').value;

      if (newTitle) {
        // If input title is not empty, ask for confirmation before saving.
        ons.notification.confirm(
          {
            title: 'Save changes?',
            message: 'Previous data will be overwritten.',
            buttonLabels: ['Discard', 'Save']
          }
        ).then(function(buttonIndex) {
          if (buttonIndex === 1) {
            // If 'Save' button was pressed, overwrite the task.

            //myApp.db_object.parseJSONToInsert(getting_data)
            myApp.services.tasks.update(element,getting_data);

            // Set selected category to 'All', refresh and pop page.
            //document.querySelector('#default-category-list ons-list-item ons-radio').checked = true;
            //document.querySelector('#default-category-list ons-list-item').updateCategoryView();
            //document.querySelector('#myNavigator').popPage();
          }
        });

      } else {
        // Show alert if the input title is empty.
        ons.notification.alert('You must provide a task title.');
      }
    };*/
  },

  category_input: function(){
    console.log(document.querySelector('#category-input'));
  }
};
