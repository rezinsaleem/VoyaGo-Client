import {motion} from 'framer-motion'

const SafetySection = () => {
  return (
    <div>
      {/* Top Section */}
      <motion.section
      className=" flex items-center bg-blue-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
   
        <div className="w-full md:w-1/2 ml-[70px]">
          <motion.h1
            className="text-3xl text-white font-bold mb-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Help us keep you safe from scams
          </motion.h1>
          
          <motion.p
            className="text-slate-100 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
           At VoyaGo, we're working hard to make our platform as secure as it can be. But when scams do happen, we want you to know exactly how to avoid and report them. Follow our tips to help us keep you safe.
          </motion.p>

          <motion.div
            className="flex space-x-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              className="bg-white text-blue-500 font-medium py-2 px-4 w-[140px] shadow-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

        <div className="hidden md:block w-full md:w-1/2">
          <motion.img
            src="/safety.svg"
            alt=""
            className="w-[500px] ml-[70px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />
        </div>
      </div>
    </motion.section>
    </div>
  );
};

export default SafetySection;
