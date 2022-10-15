import 'colors';
import { Task } from "./Task.js";

export class Tasks {
    #taskList = {};

    constructor() {}

    get allTasks() {
        const tasks = []
        Object.keys(this.#taskList).forEach( key => tasks.push(this.#taskList[key]) );

        return tasks;
    }
    
    get listAllTasks() {
        const getTasks = this.allTasks;
        return this.showTasksInStringFormat(getTasks);
    }

    get listCompletedTasks() {
        const getCompletedTasks = this.allTasks.filter(task => task.dateCompleted !== null);
        return this.showTasksInStringFormat(getCompletedTasks);
    }

    get listCompletedTaskInArrayFormat() {
        return this.allTasks.filter(task => task.dateCompleted !== null)
    }

    get listPendingTasks() {
        const getCompletedTasks = this.allTasks.filter(task => task.dateCompleted === null);
        return this.showTasksInStringFormat(getCompletedTasks);
    }

    get listPendingTaskInArrayFormat() {
        return this.allTasks.filter(task => task.dateCompleted === null)
    }

    loadTasks(tasks) {
        tasks.forEach( task => this.#taskList[task.id] = task );
    }

    createTask(description) {
        const task = new Task(description);
        this.#taskList[task.id] = task;
    }

    completeTasks(ids) {
        ids.forEach( id => this.#taskList[id].dateCompleted = new Date().toString() );
    }

    pendingTasks(ids) {
        ids.forEach( id => this.#taskList[id].dateCompleted = null );
    }

    deleteTask(id) {
        delete this.#taskList[id];
    }

    showTasksInStringFormat(tasks) {
        let showTasks = '';

        tasks.forEach( (task, index) => {
            let isCompleted = 'Pendiente'.red;
            if (task.dateCompleted) isCompleted = 'Completada'.green;

            showTasks += `${ String((index + 1)).green }. ${ task.description } : ${ isCompleted }\n`;
        });

        return showTasks;
    }
}