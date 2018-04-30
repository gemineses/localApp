var data_names = 'id_request, name, category, remarks, status, date_expired, cost, number, type_card, bank, security_question, answer, title, first_name, middle_name, last_name, dba_name, street, city, state, zipcode, country, phone, email, fax, date_of_birth, prescription, frecuency';

var data_questions= '?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?'; 

var db = openDatabase("AppDB", "1.0", "jessie app database", 2 * 1024 * 1024);

var createDatabase = function(db){
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS REQUEST ('+data_names+')');
	});
}

var execute_insert = function(insert_data){
	tx.executeSql('INSERT INTO REQUEST' 
		+ data_names
		+ ' VALUES ('
		+ data_questions
		+ '), ('
		+ insert_data
		+')');
}

var execute_select = function(){
	var txt_out = [];
	db.transaction(function (tx) {
		console.log('SELECT * FROM REQUEST')
		tx.executeSql('SELECT * FROM REQUEST', [], function (tx, results) {
		var len = results.rows.length, i;
		if(len>0){
			for (i = 0; i < len; i++) { 
				txt_out.push(parseSelectToJson(results.rows.item(i)));
			}
			myApp.services.fixtures = txt_out
		}else{
			txt_out = [{
				title: 'Costco',
				category: 'Memberships',
				description: 'Card No. 0001',
				highlight: false,
				urgent: false
			}]
			myApp.services.fixtures = txt_out
		}
	}, null); 
	});
}

var parseJSONToInsert = function(jsonText){
	var txtToInsert = '(0, '
		+ '"' + jsonText.name + '", '
		+ '"' + jsonText.category + '", '
		+ '"' + jsonText.remarks + '", '
		+ '"' + jsonText.status + '", '
		+ '"' + jsonText.date_expired + '", '
		+ '"' + jsonText.cost + '", '
		+ '"' + jsonText.number + '", '
		+ '"' + jsonText.type_card + '", '
		+ '"' + jsonText.bank + '", '
		+ '"' + jsonText.security_question + '", '
		+ '"' + jsonText.answer + '", '
		+ '"' + jsonText.title + '", '
		+ '"' + jsonText.first_name + '", '
		+ '"' + jsonText.middle_name + '", '
		+ '"' + jsonText.last_name + '", '
		+ '"' + jsonText.dba_name + '", '
		+ '"' + jsonText.street + '", '
		+ '"' + jsonText.city + '", '
		+ '"' + jsonText.state + '", '
		+ '"' + jsonText.zipcode + '", '
		+ '"' + jsonText.country + '", '
		+ '"' + jsonText.phone + '", '
		+ '"' + jsonText.email + '", '
		+ '"' + jsonText.fax + '", '
		+ '"' + jsonText.date_of_birth + '", '
		+ '"' + jsonText.prescription + '", '
		+ '"' + jsonText.frecuency + '"'
		+ ')';

		return txtToInsert;
}

var parseSelectToJson = function(selectData){
	var jsonReturn = {
		id_request: selectData.id_request,
		name: selectData.name,
		category: selectData.category,
		remarks: selectData.remarks,
		status: selectData.status,
		date_expired: selectData.date_expired,
		cost: selectData.cost,
		number: selectData.number,
		type_card: selectData.type_card,
		bank: selectData.bank,
		security_question: selectData.security_question,
		answer: selectData.answer,
		title: selectData.title,
		first_name: selectData.first_name,
		middle_name: selectData.middle_name,
		last_name: selectData.last_name,
		dba_name: selectData.dba_name,
		street: selectData.street,
		city: selectData.city,
		state: selectData.state,
		zipcode: selectData.zipcode,
		country: selectData.country,
		phone: selectData.phone,
		email: selectData.email,
		fax: selectData.fax,
		date_of_birth: date_of_birth,
		prescription: prescription,
		frecuency: frecuency
	}
	return jsonReturn;
}
createDatabase(db);
execute_select()
