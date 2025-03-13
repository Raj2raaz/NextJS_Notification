import { motion } from "framer-motion";

export default function NotificationCard({ message }) {
  return (
    <motion.div 
      className="bg-black border border-gray-700 rounded-lg text-center mt-8 p-4 w-full max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold">{message}</h2>
      <p className="text-gray-400 text-sm">Notification received.</p>
    </motion.div>
  );
}
