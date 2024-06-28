const express = require("express")
const app = express()
const port = 3000

const config = {
    host: "db",
    user: "root",
    password: "root",
    database: "nodedb"
}
const mysql = require("mysql")

const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) VALUES('alef')`;
connection.query(sql)

let peopleHtml
connection.query(`SELECT * FROM people`, (error, results, fields) => {
    if (error) {
        return;
    }

    peopleHtml = results.map(element => `<p>${element.name}</p>`).join('');

    /* peopleHtml = `<p> ${results[1].name}</p>` */

});
connection.end()

app.get("/", async (req, res) => {

    res.send(`<div><h1>Full Cycle Rocks!</h1>${peopleHtml}</div>`);
})


app.listen(port, () => {
    console.log("PORT", port);
})