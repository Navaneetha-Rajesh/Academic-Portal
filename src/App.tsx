import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';

// --- INITIAL USER DATA ---
const initialUsers = [
  { id: 'S001', name: 'Nava', role: 'student', email: 'nava@example.com', password: 'password123' },
  { id: 'S002', name: 'Aryan', role: 'student', email: 'aryan@example.com', password: 'password123' },
  { id: 'S001', name: 'Vishnu', role: 'student', email: 'vishnu@example.com', password: 'password123' },
  { id: 'S001', name: 'Niloofer', role: 'student', email: 'niloofer@example.com', password: 'password123' },
  { id: 'S001', name: 'Rashid', role: 'student', email: 'rashid@example.com', password: 'password123' },
  { id: 'S001', name: 'George', role: 'student', email: 'george@example.com', password: 'password123' },
  { id: 'T001', name: 'Nilakshi', role: 'teacher', email: 'nilakshi@example.com', password: 'password456' },
  { id: 'A001', name: 'Nitha', role: 'admin', email: 'nitha@example.com', password: 'password789' },
];
// --- END INITIAL USER DATA ---

type UserRole = 'student' | 'teacher' | 'admin';

interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  password?: string;
}

export default function App() {
  // MODIFICATION 1: The list of users is now managed by React state.
  const [registeredUsers, setRegisteredUsers] = useState(initialUsers);
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('home');

  const handleLogin = ({ id, password }: { id: string; password: string }) => {
    const userFound = registeredUsers.find(user => user.id === id);

    if (userFound && userFound.password === password) {
      const { password, ...userToSet } = userFound;
      setCurrentUser(userToSet);
      setCurrentPage('home');
    } else {
      alert('Login failed: Invalid User ID or Password.');
    }
  };

  // MODIFICATION 2: Update state correctly instead of using .push()
  const handleSignup = (newUserData: User) => {
    console.log('New user signed up:', newUserData);
    
    // This is the immutable way to add an item to an array in state.
    // It creates a new array with all the old users plus the new one.
    setRegisteredUsers(currentUsers => [...currentUsers, newUserData]);
    
    alert(`User ${newUserData.name} with ID ${newUserData.id} signed up!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'student':
        return (
          <StudentDashboard
            user={currentUser}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onLogout={handleLogout}
          />
        );
      case 'teacher':
        return (
          <TeacherDashboard
            user={currentUser}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onLogout={handleLogout}
          />
        );
      case 'admin':
        return (
          <AdminDashboard
            user={currentUser}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onLogout={handleLogout}
          />
        );
      default:
        return <div>Invalid user role</div>;
    }
  };

  return <div className="min-h-screen bg-background">{renderDashboard()}</div>;
}