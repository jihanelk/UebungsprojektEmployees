"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Hobbies = exports.dbHandler = exports.Employee = void 0;
var readlineSync = require('readline-sync');
var Employee = /** @class */ (function () {
    function Employee(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return Employee;
}());
exports.Employee = Employee;
var dbHandler = /** @class */ (function () {
    function dbHandler(sqliteHandler, file) {
        this.sh = sqliteHandler;
        this.file = file;
        this.initializeDb();
    }
    dbHandler.prototype.initializeDb = function () {
        this.db = new this.sh.Database(this.file);
    };
    /* public showdb() {
         this.db.all('SELECT * FROM hobbies').then(rows => {
             rows.array.forEach(row => {
                 console.log(row)
             });
         }).catch(err => {
             console.log(err)
         })
     }*/
    dbHandler.prototype.createDatabase = function (tableName, columns, additionalSQL) {
        var columnsReplacement = '(';
        columnsReplacement = columnsReplacement + columns.toString() + ')';
        console.log('columns: ', columnsReplacement);
        if (additionalSQL !== undefined) { //val
            console.log('running db run');
            this.db.run("CREATE TABLE IF NOT EXISTS " + tableName + " " + columnsReplacement + " " + additionalSQL, [], function (error) {
                if (error) {
                    return console.log(error.message);
                }
                else {
                    console.log('Inserting of extra data was succesful! ');
                }
            });
        }
        else {
            this.db.run("CREATE TABLE IF NOT EXISTS " + tableName + " " + columnsReplacement, [], function (error) {
                if (error) {
                    return console.log(error.message);
                }
                else {
                    console.log('Inserting of extra data was succesful! ');
                }
            });
        }
    };
    dbHandler.prototype.rundb = function () {
    };
    return dbHandler;
}());
exports.dbHandler = dbHandler;
var Hobbies = /** @class */ (function (_super) {
    __extends(Hobbies, _super);
    function Hobbies(id, location, hobbie, employeeId) {
        var _this = _super.call(this, employeeId, hobbie) || this;
        _this.id = id;
        _this.location = location;
        return _this;
    }
    return Hobbies;
}(Employee));
exports.Hobbies = Hobbies;
