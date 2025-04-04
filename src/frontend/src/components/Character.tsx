import * as motion from "motion/react-client";

// Character
const Character = () => {
  return (
    <motion.div
      className="m-auto p-10 group cursor-pointer"
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 1 }}
      transition={{
        duration: 0.5,
        scale: {
          type: "spring",
          visualDuration: 0.5,
          bounce: 0.4,
        },
      }}
    >
      <img
        className="h-96 drop-shadow-2xl transition drop-shadow-indigo-600/30 group-hover:drop-shadow-indigo-600/50"
        src="/public/motogotchi.webp"
        alt="/"
      />
    </motion.div>
  );
};

export default Character;
