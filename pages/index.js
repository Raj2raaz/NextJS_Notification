import { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";
import { motion } from "framer-motion";

export default function Home() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) =>
        console.error("Service Worker Registration Failed:", error)
      );
    }

    const savedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
    setNotifications(savedNotifications);
  }, []);

  const sendNotification = async () => {
    if (!message.trim()) {
      alert("Please enter a notification message!");
      return;
    }

    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(message);
      } else if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          new Notification(message);
        } else {
          alert("Notifications are blocked. Enable them in your browser settings.");
        }
      } else {
        alert("Notifications are blocked. Enable them in your browser settings.");
      }
    } else {
      alert("Your browser does not support notifications.");
    }

    if ("vibrate" in navigator) {
      navigator.vibrate(200);
    }

    // ✅ Fixed: State update should be inside the function
    const newNotifications = [{ message, timestamp: new Date().toISOString() }, ...notifications];
    setNotifications(newNotifications);
    localStorage.setItem("notifications", JSON.stringify(newNotifications));

    setMessage(""); // ✅ Clears input after sending
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-6">
      <h1 className="text-lg mb-4">Hola!</h1>

      <div className="relative flex items-center justify-center w-48 h-48">
        <motion.div
          className="absolute w-40 h-40 bg-purple-500 rounded-full opacity-30"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-32 h-32 bg-purple-500 rounded-full opacity-40"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-5xl">🔔</span>
        </motion.div>
      </div>

      <NotificationCard message={message || "Default Notification"} />

      {/* ✅ Fixed Input Visibility by Adding `bg-white text-black` */}
      <input
        type="text"
        className="mt-4 p-3 border border-gray-500 rounded-lg bg-purple text-white placeholder-white placeholder-opacity-75 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Enter notification message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <motion.button
        className="mt-4 bg-purple-600 text-white p-2 rounded"
        onClick={sendNotification}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Send Notification
      </motion.button>
    </div>
  );
}
