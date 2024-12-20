# Barbershop MEVN Application

## 📄 Description
This project is a web application for managing a barbershop, developed using the MEVN stack (MongoDB, Express, Vue.js, Node.js). It offers features such as user authentication, appointment scheduling, and dynamic service management, providing a seamless and efficient user experience.

---

## Functionality

### **Frontend**
1. **Authentication:**
   - User login and registration with token-based state management.
   - Display "Iniciar Sesión" or personalized greetings based on the authentication state.

2. **Service Display:**
   - Dynamically fetch and render available services using Pinia and Axios.
   - Responsive grid layout with service descriptions, prices, and icons.

3. **Appointment Management:**
   - Intuitive interface for booking, viewing, and canceling appointments.
   - Redirection to the login page if unauthenticated.

4. **Navigation:**
   - Conditional navigation items based on user roles:
     - Unauthenticated: "Reservar Ahora."
     - Authenticated: "Mis Citas" and "Nueva Cita."

5. **Styling:**
   - Built with Tailwind CSS for modern, responsive, and mobile-first design.
   - Custom theming for a professional and cohesive appearance.

---

### **Backend**
1. **Authentication:**
   - Secure user authentication using JSON Web Tokens (JWT).
   - Middleware to protect routes and validate tokens.

2. **Services API:**
   - Endpoints to fetch all services dynamically from MongoDB.
   - Easily extensible to add, update, or delete services.

3. **Appointment API:**
   - Endpoints for creating, updating, viewing, and deleting appointments.
   - Email notifications to users and administrators upon booking or cancellation.

4. **User API:**
   - CRUD operations for managing user profiles.
   - Validation for strong password enforcement (customizable).

5. **Error Handling:**
   - Global error middleware to provide consistent and meaningful error messages.
   - Validation and error management for all incoming requests.

6. **Database:**
   - MongoDB used for storing user, service, and appointment data.
   - Schemas designed for scalability and ease of querying.

7. **Environment Variables:**
   - Configuration for database connection, JWT secret, and email notifications.

---

## 💻 Technologies Used

### **Frontend**
- Vue.js: Core framework for building the user interface.
- Pinia: State management for authentication and service data.
- Axios: HTTP client for API communication.
- Tailwind CSS: Styling framework for responsive and modern design.

### **Backend**
- Node.js: Runtime for server-side scripting.
- Express.js: Framework for building RESTful APIs.
- MongoDB: Database for data storage.
- JSON Web Tokens (JWT): For secure user authentication.
- Nodemailer: For email notifications.

---

## 📋 Requirements
- **Node.js:** Version 16 or higher.
- **MongoDB:** Running locally or via a cloud service.
- **NPM or Yarn:** For dependency management.

---

## 🛠️ Installation

### **1. Clone the repository:**
```bash
git https://github.com/eze-ms/Barbershop-MEVN-Backend
