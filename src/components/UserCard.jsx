import React from "react";
import Avatar from "./Avatar";
import { motion } from "framer-motion";

export default function UserCard({ user }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="user-card shadow-sm"
    >
      <div className="flex items-center gap-4">
        <Avatar name={user.full_name || user.email} size={56} />
        <div className="min-w-0">
          <div className="text-lg font-semibold text-slate-100 truncate">
            {user.full_name ?? "(no name)"}
          </div>
          <div className="text-sm text-slate-300 truncate">{user.email}</div>
        </div>
        <div className="ml-auto text-xs text-slate-400">ID #{user.id}</div>
      </div>
    </motion.article>
  );
}