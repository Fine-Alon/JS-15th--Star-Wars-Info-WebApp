import { getCurrentStorage } from "./js_modules/switchBtn/switchStorageTypeApi.js";

export async function createTodoApp(container, title = 'TODO-LIST', keyWord) {

  const moduleType = await getCurrentStorage()

  moduleType.initializeTodoApp(container,title,keyWord)

}

// window.createTodoApp = createTodoApp
