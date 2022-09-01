import React, { useEffect } from "react";
import { Dashboard } from "../../components";
import { motion } from "framer-motion";

const draw = (context) => {};

export default function Home() {
  useEffect(() => {}, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
    >
      <Dashboard
        draw={draw}
        height={window.innerHeight}
        width={window.innerWidth}
      />
    </motion.div>
  );
}
