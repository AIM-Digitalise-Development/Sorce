import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaHospitalAlt, FaTools, FaClipboardCheck, FaStethoscope, FaTruck, FaUserMd } from "react-icons/fa";

const ChooseYourPlaceSection = () => {
  const video = "/assets/video.mp4"; // public\assets\video.mp4
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let mounted = true;

    const tryPlay = () => {
      v.play()
        .then(() => {
          if (!mounted) return;
          console.info("video playing");
        })
        .catch((err) => {
          console.warn("video play failed:", err);
        });
    };

    const onCanPlay = () => tryPlay();
    const onPlaying = () => console.info("video onPlaying");
    const onPause = () => console.warn("video paused");
    const onError = (e) => {
      console.error("video error", e);
      if (mounted) setVideoError(true);
    };

    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("pause", onPause);
    v.addEventListener("error", onError);

    // try immediately (some browsers are already ready)
    tryPlay();

    return () => {
      mounted = false;
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("error", onError);
    };
  }, []);

  // Services carousel (show 3 at a time, auto-advance)
  const services = [
    { icon: <FaHospitalAlt className="text-red-400" />, title: "Design & Build", desc: "Optimized hospital layouts & turnkey construction" },
    { icon: <FaClipboardCheck className="text-yellow-400" />, title: "Licensing & Compliance", desc: "All statutory approvals & audits" },
    { icon: <FaStethoscope className="text-green-400" />, title: "Medical Equipment", desc: "Radiology, ICU, OT & diagnostic systems" },
    { icon: <FaUserMd className="text-indigo-400" />, title: "Trained Manpower", desc: "Permanent & contractual clinical/administrative staff" },
    { icon: <FaTools className="text-teal-400" />, title: "Annual Maintenance", desc: "Preventive maintenance & calibration" },
    { icon: <FaTruck className="text-orange-400" />, title: "Logistics & Supply", desc: "Procurement, installation & spare parts" },
    // add more as needed
  ];

  const [carIndex, setCarIndex] = useState(0);
  useEffect(() => {
    if (services.length <= 3) return;
    const id = setInterval(() => setCarIndex(i => (i + 1) % services.length), 3500);
    return () => clearInterval(id);
  }, [services.length]);

  const getVisible = (start) => {
    const out = [];
    for (let i = 0; i < 3; i++) {
      out.push(services[(start + i) % services.length]);
    }
    return out;
  };

  const headingVariant = { hidden: { opacity: 0, y: -12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const textVariant = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.15, duration: 0.6 } } };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20 px-6 lg:px-20">
      {/* Background video (use non-negative z-index; fallback to poster on error) */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <video
            ref={videoRef}
            src={video}
            poster="/assets/video-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
            onError={() => setVideoError(true)}
          />
        ) : (
          <img
            src="/assets/video-poster.jpg"
            alt="background fallback"
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden
          />
        )}

        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
      </div>

      {/* Content (above video) */}
      <div className="relative z-10 w-full max-w-5xl">
        <motion.div initial="hidden" animate="show" variants={headingVariant} className="bg-black/45 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-center mb-4">
            Building Modern, Compliant Healthcare Spaces
          </motion.h1>

          <motion.p variants={textVariant} className="text-sm md:text-base text-gray-200 max-w-3xl mx-auto text-center mb-6 leading-relaxed">
            We deliver end-to-end healthcare projects — from licensing and design to equipment supply, trained staff and lifecycle maintenance. Our goal: safe, compliant and patient-centered facilities that serve communities reliably.
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <motion.button whileHover={{ scale: 1.03 }} className="bg-gradient-to-r from-red-600 to-pink-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg">
              Contact Us
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} className="bg-white text-gray-900 font-semibold py-3 px-6 rounded-full shadow-lg border border-white/20">
              Make an Enquiry
            </motion.button>
          </div>

          {/* Services carousel (three columns) */}
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {getVisible(carIndex).map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-2xl mt-1">{s.icon}</div>
                  <div>
                    <div className="text-sm font-semibold text-white">{s.title}</div>
                    <div className="text-xs text-gray-300">{s.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* small pager dots */}
            <div className="flex justify-center gap-2 mt-4">
              {services.map((_, idx) => (
                <button key={idx} onClick={() => setCarIndex(idx)} aria-label={`go to ${idx}`} className={`w-2 h-2 rounded-full ${idx === carIndex ? "bg-white" : "bg-white/40"}`} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChooseYourPlaceSection;
