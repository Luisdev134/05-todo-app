import { Todo } from "./todos/models/todo-model";


export const Filtros = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}


const state = {
    todos: [
        new Todo('Jordan 1'),
        new Todo('Jordan 2'),
        new Todo('Jordan 3'),
        
    ],
    
    filter: Filtros.All,

}



const initStore = () => {
    loadStore(); 
    console.log('initStore 🍓');

}

const loadStore = () => {
     if (!localStorage. getItem('state')) return;

     const {todos = [], filter = Filtros.All} = JSON.parse(localStorage. getItem('state'));
     state.todos = todos;
     state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (filter = Filtros.All) => {
 switch (filter) {
    case Filtros.All:
        return[...state.todos];

    case Filtros.Completed: 
        return state.todos.filter(todo => todo.done)

    case Filtros.Pending: 
        return state.todos.filter(todo => todo.done === false) 

        default: throw new Error(`Option ${Filtros} is not valid`);
 }
}

const addTodo = (description) => {
    if (!description) throw new Error('Description is requiered')
    state.todos.push( new Todo(description))
    saveStateToLocalStorage();
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStateToLocalStorage();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done);
    saveStateToLocalStorage();
}

const setFilter = (newFilter = filter.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getOcurrentFilter = () => {
    return state.filter;
}


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getOcurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo, 
}

