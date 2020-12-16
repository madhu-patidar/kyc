import  express from 'express';
import  { Client }  from 'pg';
import { localConfig } from './config';
import bodyParser from 'body-parser';
import cors from 'cors'
const connectionString = `postgres://${localConfig.user}:${localConfig.password}@${localConfig.server}:${localConfig.port}/${localConfig.database}`;
console.log(connectionString)

// const client = new Client({
//     connectionString: connectionString
// });
// client.connect();
const app = express();
import accounts from './routes/accounts';
// var routes = require('./routes')
var http = require('http').createServer(app);
var https = require('https');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.set('port', process.env.PORT || 4000);
app.get('/', function (req, res, next) {
    client.query('SELECT * FROM getaccounts8()', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});

app.use('/accounts', accounts);
http.listen(process.env.PORT || 4000, "0.0.0.0", () => console.log(`Kyc Middeware Api is listening on port ${process.env.PORT || 4000} and environment:${process.env.NODE_ENV ||4000}!`))