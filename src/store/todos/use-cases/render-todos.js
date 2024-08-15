
/**
 * 
 * @param {string} elementId 
 * @param {Todo} todos  
 */

    let element;

import { Todo } from "../models/todo-model";
import { createTodoHTML } from "./create-todo-html";

export const renderTodos = (elementId, todos = []) => {
   
        if (!element)
            element = document.querySelector(elementId);

        if (!element) throw new Error(`${elementId} not found`);

        element.innerHTML = '';

    todos.forEach(todo => {
        element.append(createTodoHTML(todo))
    });

}