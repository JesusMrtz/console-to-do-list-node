import 'colors';
import inquirer from 'inquirer';
import { menuChoices, menuTasksChoices } from '../messages/options.js';


const menuOptions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: menuChoices
    }
];

let menuTasksOptions = [
    {
        type: 'list',
        name: 'id',
        message: '¿Que tarea desea remover?',
    }
]


export async function inquirerMenu () {
    console.log('========================='.green);
    console.log('  Seleccione una opción  ');
    console.log('========================='.green);

    const { opcion } =  await inquirer.prompt(menuOptions);
    return opcion;
}

export async function inquirerReadInput(message) {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate: (value) => {
                if ( !value.length ) return 'Por favor ingrese un valor';
                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt(question);
    return description;
}

export async function inquirerTasksToRemove(tasks) {
    menuTasksOptions[0].choices = menuTasksChoices(tasks);
    const { id } = await inquirer.prompt(menuTasksOptions);
    return id;
}

export async function inquirerCheckListTask(tasks, message = 'Seleccione las tareas ha completar') {
    const { ids } = await inquirer.prompt([{
        type: 'checkbox',
        name: 'ids',
        checked: false,
        message,
        choices: menuTasksChoices(tasks)
    }]);

    return ids;
}

export async function inquirerPause() {
    const { pause } = await inquirer.prompt([
        {
            type: 'input',
            name: 'pause',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]);

    return pause;
}

export async function inquirerConfirm(message) {
    const { confirmQuestion } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmQuestion',
            message
        }
    ]);

    return confirmQuestion;
}