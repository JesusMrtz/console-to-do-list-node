import { inquirerMenu, inquirerTasksToRemove, inquirerPause, inquirerReadInput, inquirerConfirm, inquirerCheckListTask } from './helpers/inquirer.js';
import { Tasks } from './models/Tasks.js';
import { readDB, saveDatabase } from './helpers/saveFile.js';


const main = async () => {
    let option = '';
    const tasks = new Tasks();
    const tasksDB = readDB();

    if ( tasksDB ) tasks.loadTasks(tasksDB);

    do {
        console.clear();
        option = await inquirerMenu();

        switch (option) {
            case '1': // Crear una tarea
                const description = await inquirerReadInput('Descriptión: ');
                tasks.createTask(description);
                break;
            case '2': // Listar tarea
                console.log(tasks.listAllTasks);
                break;
            case '3': // Listar tareas completadas
                console.log(tasks.listCompletedTasks);
                break;
            case '4': // Listar tareas pendientes
                console.log(tasks.listPendingTasks);
                break;
            case '5': // Completar tareas
                let ids = await inquirerCheckListTask(tasks.listPendingTaskInArrayFormat);
                if ( !ids.length ) break;

                const confirmCompleted = await inquirerConfirm('¿Estás seguro de completar las tareas seleccionadas?');
                if ( confirmCompleted ) tasks.completeTasks(ids);
                break;
            case '6': // Dejar pendiente tareas
                const idsPending = await inquirerCheckListTask(tasks.listCompletedTaskInArrayFormat, 'Seleccione las tareas que dejará pendientes');
                if ( !idsPending.length ) break;

                const confirmPending = await inquirerConfirm('¿Estás seguro de dejar en pendiente las tareas seleccionadas?');
                if ( confirmPending ) tasks.pendingTasks(idsPending);
                break;
            case '7': // Borrar tarea
                const id = await inquirerTasksToRemove(tasks.allTasks);
                const confirmDelete = await inquirerConfirm('¿Estás seguro?');

                if (confirmDelete) tasks.deleteTask(id);
                break;
        }

        saveDatabase(tasks.allTasks);

        if ( option !== '0' ) await inquirerPause();
    } while( option !== '0' );

    console.clear();
}


main();