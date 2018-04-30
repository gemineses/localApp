myApp.db_object = {

	db : openDatabase("AppDB", "1.0", "jessie app database", 2 * 1024 * 1024),

	createDatabase : function(db){
		db.transaction(function (tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS REQUEST (id, name)');
		});
	},

	execute_insert : function(insert_data){
		query = 'INSERT INTO REQUEST VALUES (0, "'
				+ this.data_format(getting_data)
				+ '")';
		console.log(query)
		this.db.transaction(function (tx) {
			tx.executeSql(query);
		});
	},

	execute_select : function(){
		var txt_out = [];
		this.db.transaction(function (tx) {
			console.log('SELECT * FROM REQUEST')
			tx.executeSql('SELECT * FROM REQUEST', [], function (tx, results) {
			var len = results.rows.length, i;
			if(len>0){
				for (i = 0; i < len; i++) { 
					txt_out.push(results.rows.item(i));
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
	},

	data_format: function(text){
		formatted = text.title+"---"
		+ text.category+"---"
		+ text.remarks+"---"
		+ text.status+"---"
		+ text.date_expired+"---"
		+ text.cost+"---"
		+ text.number+"---"
		+ text.type_card+"---"
		+ text.bank+"---"
		+ text.security_questions+"---"
		+ text.answer+"---"
		+ text.title_select+"---"
		+ text.middle_name+"---"
		+ text.last_name+"---"
		+ text.dba_name+"---"
		+ text.street+"---"
		+ text.city+"---"
		+ text.state+"---"
		+ text.zipcode+"---"
		+ text.country+"---"
		+ text.phone+"---"
		+ text.email+"---"
		+ text.fax+"---"
		+ text.dob+"---"
		+ text.prescription+"---"
		+ text.frecuency+"---"

		return formatted;
	},

	parseSelectToJson : function(selectData){
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
}