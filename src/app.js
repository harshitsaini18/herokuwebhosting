const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
var exceljs = require('exceljs');


const d = new Date();

require('./db/conn');
const dpp = require('./models/dpp');
const test = require('./models/test');
const { json } = require('express');
const { log } = require('console');

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');
//using script 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);
hbs.registerPartial('nav', '{{nav}}');


// sendFile will go here
app.get('/', function(req, res) {
    res.render('index')
});

app.get('/submitResult', function(req, res) {
    res.render('submit')
});


let mymonth = (d.getMonth() + 1).toString()
let month;
if (mymonth.length == 1) {
    month = '0' + (d.getMonth() + 1).toString()
} else { month = mymonth; }
//post data
app.post('/submitResult', async(req, res) => {
    try {
        const dppData = new dpp({
            subject: req.body.subject,
            score: req.body.marks,
            complete: req.body.complete,
            date: d.getDate().toString() + month
        })
        const dppit = await dppData.save();
        res.status(201).render("index");

    } catch (error) {
        res.status(400).send(error);
    }
});
app.post('/submitResults', async(req, res) => {
    try {
        const testData = new test({
            physics: {
                score: req.body.pmarks,
                complete: req.body.pcomplete
            },
            chemistry: {
                score: req.body.cmarks,
                complete: req.body.ccomplete
            },
            maths: {
                score: req.body.mmarks,
                complete: req.body.mcomplete
            },
            date: d.getDate().toString() + month
        })
        const testit = await testData.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(400).send(error);
    }
});



app.get('/analysis', async(req, res) => {
    try {
        var subjectArr = [];
        var scoreArr = [];
        var completeArr = [];
        var dateArr = [];
        var getTestData = [];
        let cursor = await dpp.find();
        let cursor2 = await test.find();
        cursor.forEach((doc, err) => {
            subjectArr.push(doc.subject);
            scoreArr.push(doc.score);
            completeArr.push(doc.complete);
            dateArr.push(doc.date);
        })
        cursor2.forEach((doc, err) => {
            let kk = JSON.stringify(doc)
            getTestData.push(kk);
        })

        res.status(201).render("analysis", { subjectArr: subjectArr, scoreArr: scoreArr, completeArr: completeArr, dateArr: dateArr, TestData: getTestData });
    } catch (error) {
        res.status(400).send(error);
    }
});


app.get('/downloaddppdata', async function(req, res) {
    try {
        const xddata = await dpp.find();
        const xtdata = await test.find();
        const workbook = new exceljs.Workbook();
        const dworksheet = workbook.addWorksheet("DPP DATA");
        const tworksheet = workbook.addWorksheet("Test DATA");
        workbook.creator = 'Priyanshu Saini';
        workbook.lastModifiedBy = 'Bot';
        dworksheet.columns = [
            { header: "S.no", key: "_id", width: 10 },
            { header: "Date", key: "mydate", width: 10 },
            { header: "Subject", key: "subject", width: 10 },
            { header: "Score", key: "score", width: 10 },
            { header: "Completed", key: "complete", width: 10 }
        ];
        tworksheet.columns = [
            { header: "S.no", key: "_id", width: 10 },
            { header: "Date", key: "mydate", width: 10 },
            { header: "Physics", key: "physics.score", width: 10 },
            { header: "physics comp", key: "physics.complete", width: 10 },
            { header: "Chemistry", key: "chemistry.score", width: 10 },
            { header: "chemistry comp", key: "chemistry.complete", width: 10 },
            { header: "Maths", key: "maths.score", width: 10 },
            { header: "maths comp", key: "maths.complete", width: 10 }
        ];

        xddata.forEach(dtata => {
            dworksheet.addRow(dtata);
        });
        xtdata.forEach(dtata => {
            tworksheet.addRow(dtata);
        });
        dworksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
        const nddata = await workbook.xlsx.writeFile("dpp_data.xlsx")
        const file = './dpp_data.xlsx';
        res.download(file);
    } catch (error) {
        res.status(500).send(error);
    }
});



app.listen(port);
console.log('Server started at http://localhost:' + port);