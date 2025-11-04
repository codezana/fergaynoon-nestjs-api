# 🚀 Backend API for Noon School Website  

### 💡 Description  
I developed the **backend system** for the **Fergay Noon** website using **NestJS (REST API)**.  
The system manages user authentication, exams with **automatic scoring**, and **randomized question display** to ensure fairness for all users.  

It also supports a **secure admin dashboard** for managing projects, exams, and content efficiently.  
The backend emphasizes **data security**, **daily backups**, and **optimized performance** for reliability and scalability.  

The **frontend** of the website was built by my teammate using **Next.js**, integrated seamlessly with this backend API.

---

### ⚙️ Tech Stack  
- **Backend Framework:** NestJS (REST API)  
- **Language:** TypeScript  
- **Database:** PostgreSQL  
- **Authentication:** JWT (JSON Web Token)  
- **Tools:** Postman / VS Code / Render / Railway  

---

### 📦 Features  
✅ RESTful API Endpoints  
✅ Authentication & Authorization  
✅ Automatic exam scoring logic  
✅ Randomized question display per user  
✅ Admin dashboard support (Projects, Exams, Content)  
✅ Secure data storage & daily backup mechanism  
✅ Optimized queries for fast performance  

---

### 🧠 How to Run  
```bash
# install dependencies
npm install

# create and configure environment file
cp .env.example .env

# run database migrations
npm run migration:run

# start the local development server
npm run start:dev
