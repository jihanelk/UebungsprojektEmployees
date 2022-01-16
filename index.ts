
import { dbHandler, Employee } from "./classes";
const sqlite3 = require('sqlite3').verbose();
let file = 'contactinformation.db'
const db = new sqlite3.Database(file);
const sqlHandler = new dbHandler(sqlite3, file);
//instrunctionsdb('DELETE FROM employee')
//instrunctionsdb('DROP TABLE hobbies')
const readlineSync = require('readline-sync');
let creatorMode: number;
let userSearchResults = [];
let dbId;
let newEmployee: Employee;
let continueAdd: any;
//calls function for Creatormode
getcm();
if (creatorMode == 0) {
    console.log("\x1b[35m", 'beginn of handler')
    sqlHandler.createDatabase('hobbies', ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'hobbie TEXT', 'hobbie_location TEXT']);
    sqlHandler.createDatabase('employee', ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'first_name TEXT', 'last_name TEXT', 'salary TEXT', 'hobbie INTEGER', 'FOREIGN KEY (id) REFERENCES hobbies(hobbie)']);
    console.log("\x1b[35m", 'end of handler')
}
else {
    sqlHandler.createDatabase('hobbies', ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'hobbie TEXT', 'hobbie_location TEXT']);
    sqlHandler.createDatabase('employee', ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'first_name TEXT', 'last_name TEXT', 'salary TEXT', 'hobbie INTEGER', 'FOREIGN KEY (id) REFERENCES hobbies(hobbie)']);
}
//Getting the current id
getId();
console.log("\x1b[0m");
//choice of path
let choice = readlineSync.keyInSelect(['Create new employee', 'See your employee', 'Delete an employee', 'Search employee by Properties']);
//CREATE
if (choice == 0) {
    findOutProfile();
    let sqlnames = `INSERT INTO employee (first_name, last_name, salary) VALUES ("${newEmployee.firstName}","${newEmployee.lastName}","${newEmployee.salary}")`;
    instrunctionsdb(sqlnames);

    let weiterMachen: number;
    console.log(JSON.stringify(newEmployee));
    setTimeout(function () {
        do {
            findOutHobbie();
            console.log('Do you want to continue adding hobbies? ');
            weiterMachen = readlineSync.keyInSelect(['Yes', 'No']);
        } while (weiterMachen == 0);
    }, 2000);
}
//SEE
if (choice == 1) {
    let dbfirstName;
    let dblastName;
    let dbsalary;
    let id = readlineSync.question('What is your employees id? ');
    const selectById = `SELECT * FROM employee WHERE id = ("${id}") LIMIT 1`;
    db.get(selectById, [], function (error, rows) {
        if (error) {

            return console.log(error.message);
        }
        dbfirstName = rows.first_name;
        dblastName = rows.last_name;
        dbsalary = rows.salary;
    })

    setTimeout(function () {
        if (typeof dbsalary === undefined) {
            console.log('Your employees name is ' + dbfirstName + ' ' + dblastName + ' and their hobby-id is ' + id);
        }
        else {
            console.log('Your employees name is ' + dbfirstName + ' ' + dblastName + ' and their hobby-id is ' + id + ' .Their salary is ' + dbsalary);
        }
    }, 1000);
}
//DELETE
if (choice == 2) {
    deleteById();
}
//SEARCH
if (choice == 3) {
    console.log('What do you want to search by?')
    let searchBy = readlineSync.keyInSelect(['Hobbie', 'Location', 'Both']);
    switch (searchBy) {
        case (0):
            searchByHob();
            break;
        case (1):
            searchByLoc();
            break;
        case (2):
            searchByBoth();
            break;
    }
}
//FUNCTIONS
//Setting the Creatormode
function getcm() {
    console.log('Creatormode:');
    let creatorMode = readlineSync.keyInSelect(['On', 'Off']);
    if (creatorMode == 0) {
        do {
            console.log("\x1b[35m", 'Do you want to add a hobby? ')
            let choice = readlineSync.keyInSelect(['Yes', 'No'])
            if (choice == 0) {
                let hobbie = readlineSync.question("\x1b[35m", 'What hobbie do you want to add? ');
                let hobbielocation = readlineSync.question("\x1b[35m", 'Where is the hobbie being done? ');
                let sqlHobbie = `INSERT INTO hobbies (hobbie, hobbie_location) VALUES ("${hobbie}", "${hobbielocation}")`;
                instrunctionsdb(sqlHobbie);
                console.log("\x1b[35m", 'Okay done! The hobbie ' + hobbie + ' is added.', "\x1b[0m");

                continueAdd = readlineSync.keyInSelect(['Yes', 'No'])
                console.log("\x1b[0m");
            }
            else {
                return console.log("\x1b[35m", 'Alright no new hobbys.')
            }
        } while (continueAdd == 0)
    }
}
//Creating a Profile
function instrunctionsdb(inst) {
    db.run(inst, [], function (error) {
        if (error) {
            return console.log(error.message)
        }
        if (creatorMode == 0) { console.log('Inserting of extra data was succesful! ') }
    })
}
async function getId() {
    db.get('SELECT seq FROM sqlite_sequence WHERE name = "employee"', [], function (error, rows) {
        if (error) {
            return console.log(error.message);
        }
        dbId = rows.seq + 1;
        console.log('rows', dbId);
    })
}
function findOutProfile() {
    let firstName = readlineSync.question('Whats your employees first name? ');
    let lastName = readlineSync.question('Whats your employees last name? ');
    newEmployee = new Employee(firstName, lastName);
    newEmployee.salary = readlineSync.question('Whats your employees salary? ');
    console.log('Your employee has the id' + dbId);
}
function findOutHobbie() {
    let hobbieId = readlineSync.question('Whats your employees hobbie ID? ');
    instrunctionsdb(`UPDATE employee SET hobbie = "${hobbieId}" WHERE id = "${dbId}" AND EXISTS (SELECT 1 FROM hobbies WHERE id = "${hobbieId}")`);
}
//Delete an employee

//Delete an employee
function deleteById() {
    let id = readlineSync.question('Whats your employees id? ')
    const deleteEmpl = `DELETE FROM employee WHERE id = ("${id}")`;
    instrunctionsdb(deleteEmpl);
    console.log('Deleting the employee with the id ' + id + ' was successful');
}
//search for an Employee
function searchByHob() {
    let hobbie = readlineSync.question('What hobbie are we looking for? ')
    db.serialize(function () {
        db.each(`SELECT a.id FROM employee a INNER JOIN hobbies b ON (a.hobbie = b.id) WHERE (b.hobbie = "${hobbie}")`, [], function (error, rows) {
            if (error) {
                return console.log(error.message)
            }
            userSearchResults.push(rows.id, 1)
            console.log('Add id ' + rows.id);
        })
    })
    setTimeout( function(){
    console.log(JSON.stringify(userSearchResults));
    console.log("Quantity of Results: " + userSearchResults.length);
    userSearchResults.forEach(res => {
        console.log('The employees with the id: ' + res + ' are doing their hobbie ' + hobbie)
    })
},2000)
}
function searchByLoc() {
    let locationHobbie = readlineSync.question('Where are they doing their hobbie? ')
    db.serialize(function () {
        db.each(`SELECT a.id FROM employee a INNER JOIN hobbies b ON (a.hobbie = b.id) WHERE (b.hobbie_location = "${locationHobbie}")`, [], function (error, rows) {
            if (error) {
                return console.log(error.message)
            }
            console.log('Add id ' + rows.id);
            userSearchResults.push(rows.id, 1)
        })
        setTimeout( function(){
        console.log("Quantity of Results: " + userSearchResults.length);
        userSearchResults.forEach(res => {
            console.log('The employees with the id: ' + res + ' are doing their hobbie ' + locationHobbie)
        })
    },2000)
    })
}
function searchByBoth() {
    let hobbie = readlineSync.question('What hobbie are we looking for? ')
    let locationHobbie = readlineSync.question('And where are they doing their hobbie? ')
    db.serialize(function () {
        db.each(`SELECT a.id FROM employee a INNER JOIN hobbies b ON (a.hobbie = b.id)  WHERE (b.hobbie = "${hobbie}") AND (b.hobbie_location = "${locationHobbie}")`, [], function (error, rows) {
            if (error) {
                return console.log(error.message)
            }
            userSearchResults.push(rows.id, 1)
            console.log('Add id ' + rows.id);
        })
        setTimeout( function(){
        console.log("Quantity of Results: " + userSearchResults.length);
        userSearchResults.forEach(res => {
            console.log('The employees with the id: ' + res + ' are doing ' + hobbie + ' ' + locationHobbie)
        })
    },2000)
    })
}


