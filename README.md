# System Features

1. **Task Display:** View your list of tasks with an easy-to-use interface.
2. **Add New Tasks:** Simply enter task details and click 'Add.'
3. **Edit Tasks:** Click on a task to edit it in a user-friendly field.
4. **Delete Tasks:** Remove tasks easily with a dedicated delete button.
5. **Sort Tasks:** Organize your list by name or update time.
6. **Visual Cues:** Completed tasks have a strike-through text for quick identification. Navigation tabs further enhance visibility.

This system is separated into frontend (React) and backend (Laravel).



## Backend App
directory name: `todo-app`

Build with PHP Laravel provide Todo List API (Create, List, Detail, Update, Delete).

### Version and TechStack
- PHP 8.0
- Laravel 9
- MySQL

### Get Started
Open your terminal on this directory and type:
> `php artisan:migrate`

migrate the database, please make sure you have no databases name `aqi_todo` or you can change your database name on `.env` file.


> `php db:seed`

seeding some data on database.


> `php artisan serve`

run app, default host is `localhost:8000`.

### Test
Open your terminal on this directory and type:
> `php artisan test`

The test case is for functionality of all todo API.



## FrontEnd Web
directory name: `todo-web`

Build with React + Vite provide display responsive single page application for CRUD Todo List.

### Version and Tech
- React v18.2.0
- Node v16.16.0
- NPM v8.11.0

### Get Started 
Open your terminal on this directory and type:
> `npm run dev`

Run the web on dev environtment. Please check the `src/config.js` file and replace it with the correct api host.


