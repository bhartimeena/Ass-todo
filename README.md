# **Task Manager App**

The Task Manager App is a application where i have used ReactJs for the frontend and Python (Djnago Rest API) for the backend this application for managing tasks efficiently. It allows users to add, edit, delete, and mark tasks as complete Also, the status of the task and priority of the task. This app is organizing tasks.

---

## **Features**
- **Add Tasks:** Create new tasks effortlessly to keep track of your activities.  
- **Edit Tasks:** Update task details as needed.  
- **Delete Tasks:** Remove tasks that are no longer required.  
- **Mark as Complete:** Mark tasks as done with a single click.
- **Priorty** Add the priority as High, Medium and Low.
- **Status** Add the status of the task as pending or completed.
- **Sort and Filter the tasks** In the application we can filter the tasks as all,pending and completed Also can sort the tasks on the basics of the task priority.

---

## **Setup and Run Instructions**

### **Frontend Setup**
1. **Clone the Repository:**
   ```bash
   git clone git@github.com:bhartimeena/Ass-todo.git
   cd Ass-todo
   cd Ass-todo
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Install Axios:**
   ```bash
   npm install axios
   ```

4. **Install React Icons:**
   ```bash
   npm install react-icons
   ```

5. **Install Web Vitals:**
   ```bash
   npm install web-vitals
   ```

6. **Run the Development Server:**
   ```bash
   npm start
   ```

7. **Open the App in Your Browser:**  
   http://localhost:3000

---

### **Backend Setup**
1. **Install Django and Django REST Framework (DRF):**
   ```bash
   pip install django djangorestframework
   ```

2. **Create and Apply Migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

3. **Run the Backend Server:**
   ```bash
   python manage.py runserver
   ```
   
7. **Open the App in Your Browser:**  
   http://localhost:3000
---

With these steps, The App should be up and running seamlessly! 😊




## **Assumptions and Limitations**
- **Assumptions:**
  - Users will enter valid input (e.g., non-empty task names).
  - The application is intended for single-user usage and does not include multi-user authentication or a backend server.

- **Limitations:**
  - **Limitation:** Only a task's status is updated to "Completed." There’s no way to change the status back to "Pending" or add other statuses.
  - **Solution:** Add more status options (e.g., "In Progress") or allow toggling between "Pending" and "Completed."


---

## **Libraries/Tools Used**
- **React:** To build a dynamic and interactive user interface.
- **React-Icons:** For task-related icons like edit, delete, and complete.
- **axios:** For making API calls to the backend.
- **web-vitals:**  For measuring and optimizing key web performance metrics.
- **djangorestframework**  For building and managing backend APIs efficiently

---
