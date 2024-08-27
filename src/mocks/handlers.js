import { http, HttpResponse } from "msw";
import todo from "./todo.json";

export const handlers = [
    http.get("/todo", async (req, res, ctx) => {
        return HttpResponse.json(todo)
    }),
];
