import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-200 py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
        <p className="text-sm">
          © {new Date().getFullYear()} Ancentian. All rights reserved.
        </p>
        <p className="text-xs text-gray-600 mt-2 sm:mt-0">
          Built with ❤️ using MERN Stack
        </p>
      </div>
    </footer>
  );
}
