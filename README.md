# 📌 Job Tracker

A full-stack **Job Application Tracking System** that helps users log, track, and manage job applications with advanced features like pagination, sorting, filtering, and secure authentication.

## 🚀 Live Demo  
🔗 **Frontend:** https://anjali-job-tracker.netlify.app/

---

## ✨ Features

- **🔑 Authentication** – Register, Login, Forgot Password, Reset Password  
- **📄 Job Management** – Create, Edit, Delete, and View job applications  
- **🔍 Search & Filter** – Filter jobs by status, type, and search keywords  
- **📊 Pagination & Sorting** – Efficient data handling for large lists  
- **📱 Responsive Design** – Works on desktop, tablet, and mobile  
- **🔒 Secure Password Handling** – Encrypted passwords and JWT-based auth  

---

## 🛠 Tech Stack

**Frontend:**  
- React.js  
- Axios  
- Tailwind CSS  
- React Router DOM  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Nodemailer (Gmail SMTP for password reset)  

---

## 📂 Project Structure

job-tracker/
│── backend/ # Express.js API
│── frontend/ # React.js UI
│── .env.example # Example environment variables
│── README.md # Project documentation

## ⚙️ Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/your-username/job-tracker.git
cd job-tracker


2️⃣ Backend Setup

cd backend
npm install
Create .env file inside backend and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
Start backend:npm start


3️⃣ Frontend Setup

cd ../frontend
npm install
Create .env file inside frontend and add:


VITE_API_BASE_URL=http://localhost:5000/api
Start frontend: npm run dev

📸 Screenshots

<img width="984" height="439" alt="image" src="https://github.com/user-attachments/assets/f8d8238a-5ad9-4837-a610-270b50bf4df0" />
<img width="990" height="475" alt="image" src="https://github.com/user-attachments/assets/6164e4da-77b3-40b5-9aff-4c225618e1df" />
<img width="937" height="321" alt="image" src="https://github.com/user-attachments/assets/405908d6-7730-41c3-b99a-b6581224d22a" />
<img width="1327" height="438" alt="image" src="https://github.com/user-attachments/assets/5885f8d6-1392-4b5c-b5ff-6a6a6489d395" />
<img width="1315" height="605" alt="image" src="https://github.com/user-attachments/assets/ca686b54-36a6-4fc2-9cbf-2cf28d425502" />
<img width="589" height="602" alt="image" src="https://github.com/user-attachments/assets/69fb0c6c-46c6-458b-a909-1d2e4280d34f" />
<img width="641" height="609" alt="image" src="https://github.com/user-attachments/assets/a9f737de-757d-4c34-bdde-8630ad046d18" />






📌 Deployment
Frontend: Deployed on Netlify / Vercel

Backend: Deployed on Render / Railway

Database: MongoDB Atlas

🧑‍💻 Author
Anjali


