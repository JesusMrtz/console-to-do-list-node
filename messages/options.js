import 'colors'

export const menuChoices = [
    {
        value: '1',
        name: `${ '1.'.green } Crear una tarea`
    },
    {
        value: '2',
        name: `${ '2.'.green } Listar tarea`
    },
    {
        value: '3',
        name: `${ '3.'.green } Listar tareas completadas`
    },
    {
        value: '4',
        name: `${ '4.'.green } Listar  tareas pendientes`
    },
    {
        value: '5',
        name: `${ '5.'.green } Completar tarea(s)`
    },
    {
        value: '6',
        name: `${ '6.'.green } Dejar pendiente tarea(s)`
    },
    {
        value: '7',
        name: `${ '7.'.green } Borrar tarea`
    },
    {
        value: '0',
        name: `${ '0.'.green } Salir`
    }
]

export function menuTasksChoices(tasks) {
    const choices = tasks.map((task, index) => ({ value: task.id, name: `${String(index + 1).green}. ${ task.description }`}));
    return choices;
}