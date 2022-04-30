# Angular-Project
Angular Project 04.2022g.

Before you start this project you need to install and run MongoDB.
You are provided also with REST API. To bring life on that API you should first install the dependencies with the command "npm install". After that, type the command "npm start". After the backend is ready to use, you should run the project in folder salon with comand "ng serve".

This application is designed to be used in hair salons. In case of unlogged user, it provides information about the list of procedures in procedure page and the possibility of contacts in contacts page.
Login, register and edit profil page have data fleld validators which do not allow invalid data to be sent to the backend. When you try to register or change the username or email in the edit profile page with the already registered name or email displays an error, which comes from the backend.
When the user registers and logs in the application a logout button and a username' profile button appear in the upper right corner. In the profile page you can see the data with which you are registered and change them. The logged in user can to see not only the list of procedures, but also their prices. It is also possible to make a reservation for a specific procedure in reservation page. When choosing a time, free hours are green and busy hours are red. The hours that have passed are gray. In my-reservations page you can see a list of yours reservations and delete a reservation if you wish.
There is a possibility for registration and login with username: admin (for salon owner) and you can see the reservations of all users with their email and telephon. Reservations that have passed have the inscription "Отминали" in red. The list of reservations is sorted by date and time.