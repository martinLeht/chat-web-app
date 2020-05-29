import { Router } from 'express';



export default class UserRoute {

    private router: Router;

    constructor() {
        this.routes();
    }

    private routes(): void {
        this.router.get('/', );
    }

}