import React, { useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ForumWindow } from "../../components";
import "./styles.css";

export default function Forum() {
  useEffect(() => {}, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="forum bg-dark">
        <ForumWindow />
      </section>
    </motion.div>
  );
}
