import './style.css'
import { App } from './src/store/todos/app'
import todoStore from './src/store/store';

todoStore.initStore();

App('#app');