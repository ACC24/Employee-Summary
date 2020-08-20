const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
// const { Console } = require("console");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

console.log("To build your team, please answer the prompts below");

getManager = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is you manager's name?",
            },
            {
                type: 'input',
                name: 'id',
                message: "What is your manager's id?",
            },
            {
                type: 'input',
                name: 'email',
                message: "What is your manager's email?",
                validate: (email) => {
        
                    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        
                    if (valid) {
                        return true;
                    } else {
                        return 'Please enter a valid email';
                    }
                }
            },
            {
                type: 'input',
                name: 'number',
                message: "What is your menager's office number?",
                validate: (value) => {
                    let pass = value.match(
                        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
                    );
                    if (pass) {
                        return true;
                    } else
                        return 'Please enter a valid phone number';
                },
            },
        ])
        .then(answers => {
            let manager = new Manager(answers.name, answers.id, answers.email, answers.number);
            team.push(manager);
            addMembers();
        });
};
        
addMembers = () =>{
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: 'Which type of team member would you like to add?',
                choices: ["Engineer", "Intern", "I don't want to add any more team members."],
            },
        ])
        .then(answers => {
            if (answers.choices === "Engineer"){
                getEngineer();
            } else if (answers.choices === "Intern"){
                getIntern();
            }
            else {
                return buildTeam();
            }
        });
};

getEngineer = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is you engineer's name?",
            },
            {
                type: 'input',
                name: 'id',
                message: "What is your engineer's id?",
            },
            {
                type: 'input',
                name: 'email',
                message: "What is your engineer's email?",
                validate: (email) => {

                    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

                    if (valid) {
                        return true;
                    } else {
                        return 'Please enter a valid email';
                    }
                }
            },
            {
                type: 'input',
                name: 'github',
                message: "What is your engineer's GitHub username?",
            }
        ])
        .then(answers => {
            let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            team.push(engineer);
            addMembers();
        });
};

getIntern = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is you intern's name?",
            },
            {
                type: 'input',
                name: 'id',
                message: "What is your interns's id?",
            },
            {
                type: 'input',
                name: 'email',
                message: "What is your intern's email?",
                validate: (email) => {
        
                    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                    if (valid) {
                        return true;
                    } else {
                        return 'Please enter a valid email';
                    }
                }
            },
            {
                type: 'input',
                name: 'school',
                message: "What is your intern's school?",
            },
        ])
        .then(answers =>{
            let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            team.push(intern);
            addMembers();
        });
};
    
buildTeam = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    };
    fs.writeFileSync(outputPath, render(team), "utf-8");
};

getManager();
  







