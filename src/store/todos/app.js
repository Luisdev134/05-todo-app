import html from './app.html?raw';
import todoStore, { Filtros } from '../store';
import { renderTodos, renderPending } from './use-cases';


const ElementIDs = {
    ClearCompletedButton: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilter: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementId 
 */


export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getOcurrentFilter());
        renderTodos(ElementIDs.TodoList, todos); 
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending (ElementIDs.PendingCountLabel);
    }


// Cuando la funcion app() se llama
    (()=> {

        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();
 
    // Referencias HTML 

    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompletedButton);
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilter);

    //Listeners 
    newDescriptionInput.addEventListener('keyup', (event) => {
     if (event.keyCode !== 13) return; 
    if (event.target.value.trim().length === 0) return;
    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = '';
    });  


             todoListUL.addEventListener('click', (event) => {
                const element = event.target.closest('[data-id]');
                todoStore.toggleTodo(element.getAttribute('data-id'));
                displayTodos();
             });

             todoListUL.addEventListener('click', (event) => {
                const isDestroyedElement = event.target.className === 'destroy';
                const element = event.target.closest('[data-id]');
                if (!element || !isDestroyedElement) return;

                todoStore.deleteTodo(element.getAttribute('data-id'));
                displayTodos();
             });

             clearCompletedButton.addEventListener('click', () => {
                todoStore.deleteCompleted();
                displayTodos();
             })

             filtersLIs.forEach(element => {
                element.addEventListener('click', (element)=> {
                    filtersLIs.forEach(el => el.classList.remove('selected'));
                    element.target.classList.add('selected');

                    switch (element.target.text) {
                        case 'Todos': 
                                todoStore.setFilter(Filtros.All)
                                break;
                        case 'Pendientes': 
                                todoStore.setFilter(Filtros.Pending)
                                break;

                        case 'Completados': 
                                todoStore.setFilter(Filtros.Completed)
                                break;
                    }
                        displayTodos();
                });
             });

}