import {search} from "../controllers/users.controller.js";

export function addSearchRoutes(app){
    app.get('/search', search);
}