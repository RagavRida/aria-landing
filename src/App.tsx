/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// Mock App component for deep linking
function MockApp() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <h1 className="font-serif text-4xl mb-4">Research Node Active</h1>
      <p className="text-muted-foreground mb-8">This is where the actual ARIA research interface would live.</p>
      <button
        onClick={() => { localStorage.removeItem("aria_token"); window.location.href = "/"; }}
        className="text-accent-cyan hover:underline"
      >
        Sign out
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/app" element={<MockApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
