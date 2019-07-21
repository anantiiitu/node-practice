var trophies = [
    {
        id: 1,
        trophy:"Serie A",
        team: "Juventus",
        year: 2014
    },
    {
        id: 2,
        trophy:"La Liga",
        team: "Real Madrid",
        year: 2015
    },
    {
        id: 3,
        trophy:"EPL",
        team: "Manchester City",
        year: 2016
    }

];

var express = require('express'); //npm install express --save 
var bodyParser = require('body-parser'); //npm install --save body-parser
var sqlite3 = require('sqlite3'); //npm install sqlite3 --save
var app = express();

var db = new sqlite3.Database('trophies.db');
var port = 3000;

app.listen(port, function(){
    console.log('Express App listening to port ' + port);
});

app.use(bodyParser.urlencoded({extended : true})) ;

app.post('/trophies', function(req, res){
    console.log('Insert a new trophy: ' + req.body.trophy) ;
    db.run('INSERT INTO trophies VALUES(?, ?, ?, ?)', [req.body.trophy, req.body.team, req.body.year, req.body.id], function(err, row){
        if(err){
            console.log('Error : ' + err.message);
        }
        else{
            res.send('Inserted trophy by id: ' + this.lastID);
        }
    });
});

app.get('/', function(req, res){
    res.send('Get request received at "/"');
});

app.get('/trophies', function(req, res){
    if(req.query.year){
        db.all('SELECT * FROM trophies WHERE year = ?', [req.query.year], function(err, row){
            if(err){
                res.send('Error : ' + err.message);
            }
            else{
                console.log('Return a list of trophies from the year : ' + req.query.year);
                res.json(row) ;
            }
        });
        // localhost:3000/trophies?year=2014
    }
    else{
        db.all('SELECT * FROM trophies', function processRows(err, row){
            if(err){
                res.send('Error : ' + err.message);
            }
            else{
                for(var i=0 ; i<row.length ; i++)
                {
                    console.log(row[i].trophy);
                }
                res.json(row);
            }
        });
    }
});

app.get('/trophies/:id', function(req, res){
    console.log('Return the trophies by id : ' + req.params.id);
    db.get('SELECT * FROM trophies WHERE id = ?', [req.params.id], function(err, row){
        if(err){
            console.log(err.message);
        }
        else{
            res.json(row);
        }
    });
    //res.send('Return trophy by ID: ' + req.params.id);
});

