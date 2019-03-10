const express = require('express');
const DB = require('./DB');
const bodyParser = require('body-parser');
const app = express();
const db = new DB();
app.use(bodyParser.json());

const router = express.Router();

router.route('/').get(
    (req, res) => {
        res.send('<html><head><title>Bluegrid task</title></head><body><h1>Bluegrid task</h1><h3><a href="/users">Users</a></h3></body></html>');
    }
)

router.route('/users').get(
    async (req, res) => {
        const limit = req.query.limit;
        const sortBy = req.query.sortBy;
        const search = req.query.search;
        let users;
        if(Object.keys(req.query).length > 1){
            users = await db.getUsersByMultipleCriteria(req.query);
        }
        else if(limit){
            users = await db.getUsersLimit(limit);
        }
        else if(sortBy){
            users = await db.getUsersSorted(sortBy);
        }
        else if(search){
            users = await db.getUsersBySearch(search);
        }
        else{
            users = await db.getAllUsers();
        }
        res.json(users);
    }
);

app.use('/', router);

app.listen(8000, () => {
    console.log('Express server listening on port 8000');
});