var sqlite3 = require('sqlite3');

var db = new sqlite3.Database(':memory:');

db.serialize(function(){
    db.run('CREATE TABLE Contacts(fname TEXT, lname TEXT, age INTEGER)');

    db.run('INSERT INTO Contacts VALUES("Anant", "Kabra", 22)');
    db.run('INSERT INTO Contacts VALUES("Tanmay", "Maheshwari", 12)');
    db.run('INSERT INTO Contacts VALUES("Billy", "Russo", 32)');

    db.all('SELECT * FROM Contacts', processRows);
    db.each('SELECT * FROM Contacts', processRows1);
    db.each('SELECT * FROM Contacts WHERE lname = "Russo"', processRows1);

    var firstName = 'Anant' ;
    db.get('SELECT * FROM Contacts WHERE fname = ?', [firstName], function(err, rows){
        console.log("Get Anant's age : ");
        if(err){
            console.log('Error : ' + err.message);
        }
        else{
            console.log(rows.age);
        }
    });

});

function processRows(err, rows){
    if(err){
        console.log('Error : ' + err.message);
    }
    else{
        for(var i=0 ; i<rows.length; i++)
        {
            console.log(rows[i].name);
        }
    }
}

function processRows1(err, rows){
    if(err){
        console.log('Error : ' + err.message);
    }
    else{
        console.log(rows.name);
    }
}

db.close();