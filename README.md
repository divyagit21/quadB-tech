# 🌤️ React To-Do App with Weather & Authentication

This is a responsive and modern To-Do List Application built with **React**, featuring:

- ✅ Task management with indoor/outdoor categorization
- ✅ Weather integration for outdoor tasks using **OpenWeatherMap API**
- ✅ Mock user authentication (Login/Sign Up) 
- ✅ Protected To-Do page accessible only to logged-in users
- ✅ Persistent data storage using **localStorage** and **sessionStorage**
- ✅ Clean, modern, and responsive UI

---

## 🚀 Features

- Add indoor and outdoor tasks
- Fetch weather for outdoor tasks anytime
- Set and edit task details
- Delete tasks
- Sign up and log in with local authentication
- Logout functionality with session reset
- Protected routes (To-Do list hidden from non-authenticated users)

                                 Signin page

![image](https://github.com/user-attachments/assets/dc42f0c0-4ca8-45f9-9d98-c519d31188d1)

                                Login page
                                
![image](https://github.com/user-attachments/assets/0af47c93-e352-4d27-b574-3f5be16b92a7)

                  after login user will be able to add,delete,edit tasks
                  
![image](https://github.com/user-attachments/assets/dcea909e-858f-4998-ae4f-85e88cad5f12)

---

## ⚙️ Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/your-username/my-todo-app.git
cd my-todo-app

Install Dependencies
npm install

Create a .env file in the root directory:
REACT_APP_WEATHER_API=your_openweather_api_key_here

Run app
npm start
