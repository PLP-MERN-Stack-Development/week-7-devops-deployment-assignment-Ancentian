import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow p-4 max-w-4xl mx-auto">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
