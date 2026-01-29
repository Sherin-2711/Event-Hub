import React from "react";
import { motion } from "framer-motion";
import { FiBell, FiCalendar, FiStar, FiUser } from "react-icons/fi";

const notificationItems = [
  { id: 1, title: "New Event", icon: <FiStar />, color: "bg-purple-500" },
  { id: 2, title: "RSVP Reminder", icon: <FiBell />, color: "bg-indigo-600" },
  { id: 3, title: "Speaker Added", icon: <FiUser />, color: "bg-blue-500" },
];

export const OurStory = ({ id = "our-story" }) => {
  return (
    <section
      id={id}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-lavender-50 to-lavender-100"
      style={{ backgroundColor: '#f0e6ff', perspective: "2000px" }} // Fallback soft lavender background with perspective
    >
      {/* Background 3D shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-lg bg-purple-200/20 backdrop-blur-sm"
            style={{
              width: Math.random() * 80 + 40,
              height: Math.random() * 80 + 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transformStyle: "preserve-3d",
              transform: `rotateX(${Math.random() * 60 - 30}deg) rotateY(${Math.random() * 60 - 30}deg) translateZ(${Math.random() * 50}px)`,
            }}
            animate={{
              rotateX: [Math.random() * 50 - 25, Math.random() * 50 - 25],
              rotateY: [Math.random() * 50 - 25, Math.random() * 50 - 25],
              translateZ: [Math.random() * -10, Math.random() * 30],
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column: Text block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6 relative"
            style={{ perspective: "1000px" }}
          >
            {/* Floating 3D elements */}
            <motion.div
              className="absolute -right-5 -top-8 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center z-10 hidden md:flex"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 10px 25px -5px rgba(147, 114, 193, 0.3)",
                transform: "translateZ(20px) rotateX(10deg) rotateY(-10deg)"
              }}
              animate={{
                y: [0, -10, 0],
                rotateY: [-10, 10, -10],
                transition: {
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                }
              }}
            >
              <FiStar className="text-xl text-purple-600" />
            </motion.div>

            <motion.div
              className="absolute -left-8 top-1/3 w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center z-10 hidden md:flex"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.3)",
                transform: "translateZ(15px) rotateX(-5deg) rotateY(15deg)"
              }}
              animate={{
                y: [0, 10, 0],
                rotateZ: [0, 5, 0, -5, 0],
                transition: {
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotateZ: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L14 14" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 2H14" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute right-10 bottom-10 w-16 h-16 rounded-md bg-teal-50 flex items-center justify-center z-10 hidden md:flex"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.2)",
                transform: "translateZ(25px) rotateX(10deg) rotateY(-5deg)"
              }}
              animate={{
                y: [0, -15, 0],
                rotateZ: [0, -5, 0],
                transition: {
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  rotateZ: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                }
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#310C7E] to-[#9372C1] bg-clip-text text-transparent"
              initial={{ opacity: 0, z: -50 }}
              whileInView={{
                opacity: 1,
                z: 0,
                transition: {
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.4
                }
              }}
              viewport={{ once: true }}
              style={{ transform: "translateZ(0)" }}
            >
              Our Story
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0, z: -30 }}
              whileInView={{
                opacity: 1,
                z: 0,
                transition: {
                  duration: 0.8,
                  delay: 0.1,
                  type: "spring"
                }
              }}
              style={{ transform: "translateZ(0)" }}
              viewport={{ once: true }}
            >
              EventHub was born from a shared passion for bringing people together through unique, memorable experiences. What started as a simple calendar app has evolved into a comprehensive platform that helps event organizers create, manage, and promote their events to engaged audiences.
            </motion.p>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0, z: -30 }}
              whileInView={{
                opacity: 1,
                z: 0,
                transition: {
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring"
                }
              }}
              style={{ transform: "translateZ(0)" }}
              viewport={{ once: true }}
            >
              Founded in 2023, we've helped thousands of organizers host successful events across multiple industries - from tech conferences to music festivals, workshops to networking mixers. Our platform combines powerful tools with intuitive design to make event management accessible to everyone.
            </motion.p>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0, z: -30 }}
              whileInView={{
                opacity: 1,
                z: 0,
                transition: {
                  duration: 0.8,
                  delay: 0.3,
                  type: "spring"
                }
              }}
              style={{ transform: "translateZ(0)" }}
              viewport={{ once: true }}
            >
              Today, we're a team of 30 passionate individuals working remotely across the globe, united by our mission to transform how people connect through events.
            </motion.p>
          </motion.div>

          {/* Right column: Calendar visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <motion.div
              initial={{ y: 20, rotateY: -15 }}
              whileInView={{ y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{
                scale: 1.03,
                rotateY: 5,
                transition: { duration: 0.4 }
              }}
              className="relative z-20 w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-xl bg-white border border-purple-300/50"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1200px",
                boxShadow: "0 15px 35px rgba(147, 114, 193, 0.2), 0 5px 15px rgba(0, 0, 0, 0.05)"
              }}
            >
              {/* 3D Event icon */}
              <motion.div
                className="absolute -right-8 -top-8 w-16 h-16 bg-white rounded-full shadow-xl border border-purple-200 flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(40px)",
                  boxShadow: "0 10px 30px -5px rgba(49, 12, 126, 0.3)"
                }}
                animate={{
                  rotateY: [0, 360],
                  transition: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-2xl text-purple-600">
                  <FiCalendar />
                </div>
              </motion.div>

              {/* 3D Document icon */}
              <motion.div
                className="absolute -left-6 bottom-10 w-14 h-14 bg-white rounded-lg shadow-xl border border-purple-200 flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(30px) rotateZ(-10deg)",
                  boxShadow: "0 10px 30px -5px rgba(49, 12, 126, 0.2)"
                }}
                animate={{
                  rotateZ: [-10, 5, -10],
                  y: [0, -10, 0],
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ scale: 1.1, rotateZ: 0 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 2V8H20" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 13H8" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 17H8" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 9H9H8" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>

              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-[#310C7E] to-[#9372C1] px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FiCalendar className="text-white" />
                  <h3 className="text-white font-medium">April 2025</h3>
                </div>
                <div className="flex space-x-2">
                  <button className="text-white hover:text-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button className="text-white hover:text-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="bg-white p-4">
                {/* Weekdays */}
                <div className="grid grid-cols-7 text-center mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={index} className="text-gray-500 text-sm">{day}</div>
                  ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Previous month days (grayed out) */}
                  {[28, 29, 30].map((day) => (
                    <div key={`prev-${day}`} className="h-10 flex items-center justify-center rounded text-gray-400">{day}</div>
                  ))}

                  {/* Current month days */}
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                    const hasEvent = [3, 7, 12, 15, 21, 28].includes(day);
                    return (
                      <div
                        key={day}
                        className={`h-10 flex items-center justify-center rounded-md ${hasEvent ? 'bg-gradient-to-br from-purple-400/40 to-indigo-400/40 text-purple-900' : 'text-gray-700 hover:bg-gray-100'} relative`}
                      >
                        {day}
                        {hasEvent && (
                          <span className="absolute bottom-1 w-1 h-1 bg-purple-500 rounded-full"></span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Floating notification badges */}
            {notificationItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 100, z: -50 }}
                whileInView={{ opacity: 1, x: 0, z: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + (index * 0.15),
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }}
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 2, 0, -2, 0],
                  transition: {
                    y: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                    rotate: { duration: 6, repeat: Infinity, repeatType: "reverse" }
                  }
                }}
                whileHover={{
                  scale: 1.1,
                  z: 20,
                  boxShadow: "0 10px 25px rgba(147, 114, 193, 0.3)",
                  transition: { duration: 0.3 }
                }}
                className={`absolute z-10 ${getNotificationPosition(index)} max-w-xs`}
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                <motion.div
                  className="flex items-center p-3 rounded-lg shadow-md bg-white border border-purple-300/50"
                  style={{
                    boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1)",
                    transformStyle: "preserve-3d"
                  }}
                >
                  <motion.div
                    className={`${item.color} p-2 rounded-md mr-3 text-white`}
                    style={{ transform: "translateZ(25px)" }}
                    whileHover={{
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <motion.div style={{ transform: "translateZ(15px)" }}>
                    <h4 className="font-medium text-gray-800">{item.title}</h4>
                    <p className="text-xs text-gray-500">Tap to see details</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};


function getNotificationPosition(index) {
  const positions = [
    "top-0 right-0 md:right-0 md:top-10",
    "bottom-0 right-20 md:right-10 md:top-40",
    "bottom-10 left-0 md:bottom-20 md:right-40",
  ];

  return positions[index % positions.length];
}