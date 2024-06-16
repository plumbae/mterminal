// Call for todoist api
import { TodoistApi } from './node_modules/@doist/todoist-api-typescript';

const api = new TodoistApi("6e24253342b2279b14b798e97added61e4741896")

api.getProjects()
    .then((projects) => console.log(projects))
    .catch((error) => console.log(error))