import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { FiLogOut } from "react-icons/fi";
import { authService } from '../services/api'

export default function Header() {
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const res = await authService.logout(); // ← parentheses added

      toast.success('Logout successful!');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      const message = error.response?.data?.message || 'Logout failed';
      toast.error(message);
    }
  };
  return (
    <header className="bg-slate-200 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ancentian</h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/myposts" className="hover:underline">My Posts</a></li>
            {/* <li><a href="/login" className="hover:underline">Login</a></li>
            <li><a href="/signup" className="hover:underline">Sign Up</a></li> */}
            <li>
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              >
                <FiLogOut /> Logout
              </button>
            </li>
          </ul>
        </nav>
        
      </div>
    </header>
  );
}