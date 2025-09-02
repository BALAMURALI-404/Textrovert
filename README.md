# 💬 Textrovert 

A full-stack real-time chat application built with **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO** for instant messaging.  
This project demonstrates user authentication, protected routes, and real-time communication with a modern UI.


## 🚀 Features
- 🔑 User Authentication (JWT + Cookies)
- 👤 Sign up / Login
- 💬 Real-time messaging with **Socket.IO**
- 📱 Responsive UI with modern design
- 🌐 Deployed on **Vercel (Frontend)** and **Render (Backend)**


## 🛠️ Tech Stack
- **Frontend**: React, Zustand (state management), Daisy UI, Tailwind CSS
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB + Mongoose
- **Deployment**: Vercel (client) & Render (server)


## 🔗 Live Demo
### [Go Online](https://textrovert.vercel.app/)


## 📂 Project Structure
    ├── backend
    │ ├── .env
    | ├── src
    │ │ ├── index.js
    │ │ ├── config
    │ │ ├── controllers
    │ │ ├── middleware
    │ │ ├── models
    │ │ ├── routes
    │ │ └── lib
    ├── frontend
    │ ├── public
    │ ├── src
    │ │ ├── components
    │ │ ├── costants
    │ │ ├── lib
    │ │ ├── pages
    │ │ ├── store (Zustand)
    │ │ └── App.js




## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/BALAMURALI-404/Textrovert.git
cd Textrovert
```
### 2. Backend setup
```bash
cd backend
npm install
npm run dev
```
### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```
### 4. Environment variables
Create a .env file in backend/
``` 
PORT = 
MONGO_URI = 
JWT_SECRET = 
CLOUDINARY_CLOUD_NAME = 
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET =
EMAIL_USER =
EMAIL_PASS =
CLIENT_URL = <Frontend link>
```


## 🧾 License

This project is licensed under the [MIT License](LICENSE).



## 🙌 Author
``` 
Made with ❤️ by BALAMURALI-404
📧 bbalamurali2004@gmail.com
💼 LinkedIn: https://linkedin.com/in/balamurali12
