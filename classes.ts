import { setDefaultOptions } from "readline-sync";

const readlineSync = require('readline-sync');

export class Employee {
    firstName: string
    lastName: string
    hobbie: string
    locationhobbie: string
    salary: number
    employeeId: number
    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export class dbHandler {
    private sh: any;
    private db: any;
    private file: String;

    constructor(sqliteHandler: any, file: string) {
        this.sh = sqliteHandler;
        this.file = file;
        this.initializeDb();
    }

    private initializeDb() {
        this.db = new this.sh.Database(this.file);
    }
   /* public showdb() {
        this.db.all('SELECT * FROM hobbies').then(rows => {
            rows.array.forEach(row => {
                console.log(row)
            });
        }).catch(err => {
            console.log(err)
        })
    }*/
    public createDatabase(tableName: String, columns: String[], additionalSQL?: String) {
        let columnsReplacement: String = '(';
        columnsReplacement = columnsReplacement + columns.toString() + ')';
        console.log('columns: ', columnsReplacement);

        if (additionalSQL !== undefined) {//val
            console.log('running db run')
            this.db.run(`CREATE TABLE IF NOT EXISTS ${tableName} ${columnsReplacement} ${additionalSQL}`, [], function (error) {
                if (error) {
                    return console.log(error.message)
                }
                else { console.log('Inserting of extra data was succesful! ') }
            })

        }
        else {
            this.db.run(`CREATE TABLE IF NOT EXISTS ${tableName} ${columnsReplacement}`, [], function (error) {
                if (error) {
                    return console.log(error.message)
                }
                else { console.log('Inserting of extra data was succesful! ') }
            })
        }
    }

    private rundb() {

    }
}

export class Hobbies extends Employee {
    id: number
    location: string
    hobbie: string
    employeeId: number
    constructor(id: number, location: string, hobbie: string, employeeId) {
        super(employeeId, hobbie)
        this.id = id;
        this.location = location
    }
}