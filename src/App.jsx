import React from "react";
import UsersPanel from "./components/UsersPanel";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-6">
        <div className="max-w-5xl mx-auto">
          <header className="mb-6">
            <h1 className="text-4xl font-extrabold text-amber-900">Pennywise — Users</h1>
            <p className="text-amber-800/80">Manage people — cozy UI</p>
          </header>

          <main>
            <UsersPanel />
          </main>
        </div>
      </div>

      <Toaster position="top-right" />
    </>
  );
}