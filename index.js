"use strict";
let __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let __generator = (this && this.__generator) || function (thisArg, body) {
    let _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
let classes_1 = require("./classes");
let sqlite3 = require('sqlite3').verbose();
let file = 'contactinformation.db';
let db = new sqlite3.Database(file);
let sqlHandler = new classes_1.dbHandler(sqlite3, file);
//instrunctionsdb('DELETE FROM employee')
//instrunctionsdb('DROP TABLE hobbies')
let readlineSync = require('readline-sync');
let creatorMode;
let userSearchResults = [];
let dbId;
let newEmployee;
let continueAdd;
//calls function for Creatormode
getcm();
if (creatorMode == 0) {
    console.log("\x1b[35m", 'beginn of handler');
    sqlHandler.createDatabase('hobbies', ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'hobbie TEXT', 'hobbie_location TEXT']);
    sqlHandler.createDatabase('employee', ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'first_name TEXT', 'last_name TEXT', 'salary TEXT', 'hobbie INTEGER', 'FOREIGN KEY (id) REFERENCES hobbies(hobbie)']);
    console.log("\x1b[35m", 'end of handler');
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
    let sqlnames = "INSERT INTO employee (first_name, last_name, salary) VALUES (\"" + newEmployee.firstName + "\",\"" + newEmployee.lastName + "\",\"" + newEmployee.salary + "\")";
    instrunctionsdb(sqlnames);
    let weiterMachen_1;
    console.log(JSON.stringify(newEmployee));
    setTimeout(function () {
        do {
            findOutHobbie();
            console.log('Do you want to continue adding hobbies? ');
            weiterMachen_1 = readlineSync.keyInSelect(['Yes', 'No']);
        } while (weiterMachen_1 == 0);
    }, 2000);
}
//SEE
if (choice == 1) {
    let dbfirstName_1;
    let dblastName_1;
    let dbsalary_1;
    let id_1 = readlineSync.question('What is your employees id? ');
    let selectById = "SELECT * FROM employee WHERE id = (\"" + id_1 + "\") LIMIT 1";
    db.get(selectById, [], function (error, rows) {
        if (error) {
            return console.log(error.message);
        }
        dbfirstName_1 = rows.first_name;
        dblastName_1 = rows.last_name;
        dbsalary_1 = rows.salary;
    });
    setTimeout(function () {
        if (typeof dbsalary_1 === undefined) {
            console.log('Your employees name is ' + dbfirstName_1 + ' ' + dblastName_1 + ' and their hobby-id is ' + id_1);
        }
        else {
            console.log('Your employees name is ' + dbfirstName_1 + ' ' + dblastName_1 + ' and their hobby-id is ' + id_1 + ' .Their salary is ' + dbsalary_1);
        }
    }, 1000);
}
//DELETE
if (choice == 2) {
    deleteById();
}
//SEARCH
if (choice == 3) {
    console.log('What do you want to search by?');
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
            console.log("\x1b[35m", 'Do you want to add a hobby? ');
            let choice_1 = readlineSync.keyInSelect(['Yes', 'No']);
            if (choice_1 == 0) {
                let hobbie = readlineSync.question("\x1b[35m", 'What hobbie do you want to add? ');
                let hobbielocation = readlineSync.question("\x1b[35m", 'Where is the hobbie being done? ');
                let sqlHobbie = "INSERT INTO hobbies (hobbie, hobbie_location) VALUES (\"" + hobbie + "\", \"" + hobbielocation + "\")";
                instrunctionsdb(sqlHobbie);
                console.log("\x1b[35m", 'Okay done! The hobbie ' + hobbie + ' is added.', "\x1b[0m");
                continueAdd = readlineSync.keyInSelect(['Yes', 'No']);
                console.log("\x1b[0m");
            }
            else {
                return console.log("\x1b[35m", 'Alright no new hobbys.');
            }
        } while (continueAdd == 0);
    }
}
//Creating a Profile
function instrunctionsdb(inst) {
    db.run(inst, [], function (error) {
        if (error) {
            return console.log(error.message);
        }
        if (creatorMode == 0) {
            console.log('Inserting of extra data was succesful! ');
        }
    });
}
function getId() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            db.get('SELECT seq FROM sqlite_sequence WHERE name = "employee"', [], function (error, rows) {
                if (error) {
                    return console.log(error.message);
                }
                dbId = rows.seq + 1;
                console.log('rows', dbId);
            });
            return [2 /*return*/];
        });
    });
}
function findOutProfile() {
    let firstName = readlineSync.question('Whats your employees first name? ');
    let lastName = readlineSync.question('Whats your employees last name? ');
    newEmployee = new classes_1.Employee(firstName, lastName);
    newEmployee.salary = readlineSync.question('Whats your employees salary? ');
    console.log('Your employee has the id' + dbId);
}
function findOutHobbie() {
    let hobbieId = readlineSync.question('Whats your employees hobbie ID? ');
    instrunctionsdb("UPDATE employee SET hobbie = \"" + hobbieId + "\" WHERE id = \"" + dbId + "\" AND EXISTS (SELECT 1 FROM hobbies WHERE id = \"" + hobbieId + "\")");
}
//Delete an employee
//Delete an employee
function deleteById() {
    let id = readlineSync.question('Whats your employees id? ');
    let deleteEmpl = "DELETE FROM employee WHERE id = (\"" + id + "\")";
    instrunctionsdb(deleteEmpl);
    console.log('Deleting the employee with the id ' + id + ' was successful');
}
//search for an Employee
function searchByHob() {
    let hobbie = readlineSync.question('What hobbie are we looking for? ');
    db.serialize(function () {
        db.each("SELECT a.id FROM employee a INNER JOIN hobbies b ON (a.hobbie = b.id) WHERE (b.hobbie = \"" + hobbie + "\")", [], function (error, rows) {
            if (error) {
                return console.log(error.message);
            }
            userSearchResults.push(rows.id, 1);
            console.log('Add id ' + rows.id);
        });
    });
    setTimeout(function () {
        console.log(JSON.stringify(userSearchResults));
        console.log("Quantity of Results: " + userSearchResults.length);
        userSearchResults.forEach(function (res) {
            console.log('The employees with the id: ' + res + ' are doing their hobbie ' + hobbie);
        });
    }, 2000);
}
function searchByLoc() {
    let locationHobbie = readlineSync.question('Where are they doing their hobbie? ');
    db.serialize(function () {
        db.each("SELECT a.id FROM employee a INNER JOIN hobbies b ON (a.hobbie = b.id) WHERE (b.hobbie_location = \"" + locationHobbie + "\")", [], function (error, rows) {
            if (error) {
                return console.log(error.message);
            }
            console.log('Add id ' + rows.id);
            userSearchResults.push(rows.id, 1);
        });
        console.log("Quantity of Results: " + userSearchResults.length);
        userSearchResults.forEach(function (res) {
            console.log('The employees with the id: ' + res + ' are doing their hobbie ' + locationHobbie);
        });
    });
}
function searchByBoth() {
    let hobbie = readlineSync.question('What hobbie are we looking for? ');
    let locationHobbie = readlineSync.question('And where are they doing their hobbie? ');
    db.serialize(function () {
        db.each("SELECT a.id FROM employee a INNER JOIN hobbies b ON (a.hobbie = b.id)  WHERE (b.hobbie = \"" + hobbie + "\") AND (b.hobbie_location = \"" + locationHobbie + "\")", [], function (error, rows) {
            if (error) {
                return console.log(error.message);
            }
            userSearchResults.push(rows.id, 1);
            console.log('Add id ' + rows.id);
        });
        console.log("Quantity of Results: " + userSearchResults.length);
        userSearchResults.forEach(function (res) {
            console.log('The employees with the id: ' + res + ' are doing ' + hobbie + ' ' + locationHobbie);
        });
    });
}
