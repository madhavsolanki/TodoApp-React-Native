# 📌 React Native To-Do App

Welcome to my **React Native To-Do App**! 🚀 This is a simple and intuitive task management app built using **React Native & Expo**. As a **beginner in React Native**, this project has helped me explore key concepts like **state management, AsyncStorage, UI interactions, and search functionality**.

---

## 🛠️ Features

✅ **Add new tasks** with a simple input field ✍️  
✅ **Mark tasks as completed** using a checkbox ✅  
✅ **Delete tasks** with a confirmation dialog 🗑️  
✅ **Search tasks dynamically** to filter the list 🔍  
✅ **Persistent storage** with AsyncStorage for saving tasks 💾  
✅ **Toast notifications** for success and error handling 🔔  
✅ **Smooth UI & modern design** for a great user experience 🎨  

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
 git clone https://github.com/madhavsolanki/TodoApp-React-Native.git
 cd react-native-todo-app
```

### 2️⃣ Install Dependencies

```bash
 npm install
```

### 3️⃣ Start the Application

```bash
 npx expo start
```

In the output, you'll find options to open the app in a:
- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

---

## 🏗️ Project Structure

```
📂 react-native-todo-app
│-- 📂 app
│   │-- 📜 Index.tsx  # Main screen with todo list
│   │-- 📜 TodoItem.tsx  # Todo item component
│-- 📂 assets  # App assets like images
│-- 📂 components  # Reusable components
│-- 📜 App.tsx  # Root of the application
│-- 📜 package.json  # Project dependencies
│-- 📜 README.md  # Documentation
```

---

## 🛠️ Technologies Used

- **React Native** - Framework for building native apps
- **Expo** - Easy setup and development tools
- **AsyncStorage** - Persistent local storage for saving tasks
- **React Hooks** - State management with `useState` and `useEffect`
- **React Native Elements** - UI components

---

## 📌 Challenges Faced & Solutions

🔹 **Handling search and dynamic UI updates** - Used `useEffect` to update the todo list dynamically based on search input.  
🔹 **Persisting data** - Implemented `AsyncStorage` to save tasks even after app restarts.  
🔹 **Managing UI visibility while searching** - Ensured that the `Add New Todo` field is hidden while searching.  
🔹 **Adding a delete confirmation dialog** - Used `Alert.alert()` to confirm task deletion.

---

## 🎯 Future Improvements

📌 Add animations for task transitions 🎞️  
📌 Implement categories & due dates 🗂️  
📌 Add authentication for personalized task management 🔐  
📌 Dark mode support 🌙  

---

## 📩 Contact Me

📧 Email: madhav09solanki@gmail.com  
💻 LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/your-profile)  
📂 GitHub: [Your GitHub](https://github.com/your-username)  

🚀 If you found this project helpful, feel free to give it a ⭐ on GitHub! Happy coding! 😊

