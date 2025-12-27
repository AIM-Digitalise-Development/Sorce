import React from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaLightbulb, FaHandsHelping, FaCogs } from "react-icons/fa";

const CommunicationSection = () => {
  const goals = [
    { icon: <FaBullseye />, title: "Patient‑Centered Care", text: "Design and deliver facilities that prioritise patient safety, comfort and outcomes." },
    { icon: <FaCogs />, title: "Operational Excellence", text: "Streamline processes, ensure regulatory compliance and reliable operations." },
    { icon: <FaLightbulb />, title: "Innovative Solutions", text: "Integrate modern medical technology and smart design for efficient care delivery." },
    { icon: <FaHandsHelping />, title: "Community Impact", text: "Build sustainable hospitals that serve and uplift local communities." },
  ];

  const techniques = [
    { title: "Regulatory Expertise", desc: "End‑to‑end licensing & compliance management to keep projects audit‑ready." },
    { title: "Smart Design", desc: "Evidence‑based layouts for optimal patient flow and staff efficiency." },
    { title: "Turnkey Delivery", desc: "From civil works to equipment procurement and commissioning." },
    { title: "Lifecycle Care", desc: "Preventive maintenance, calibration and long‑term support." },
  ];

  return (
    <section className="relative py-16 px-6 sm:px-10 lg:px-20 bg-gradient-to-b from-white to-sky-50">
      <div className="max-w-6xl mx-auto">
        <motion.header initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Our Mission & Approach
          </h2>
          <p className="mt-4 text-slate-700 max-w-3xl mx-auto text-sm sm:text-base">
            We create safe, compliant and future‑ready healthcare facilities — combining regulatory know‑how, smart design and dependable delivery to transform healthcare access for communities.
          </p>
        </motion.header>

        {/* Goals - updated card colours */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {goals.map((g, i) => (
            <div
              key={i}
              className="flex gap-4 items-start rounded-2xl p-6 shadow-lg transition hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(239,246,255,0.8))", border: "1px solid rgba(99,102,241,0.08)" }}
            >
              <div className="flex-none text-2xl text-indigo-500 mt-1">{g.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{g.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{g.text}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Techniques / How we work - updated card colours */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold text-slate-900 mb-4">How we deliver</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techniques.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="rounded-xl p-5 shadow transition"
                style={{ background: "linear-gradient(180deg, #ffffff, #fffaf6)", border: "1px solid rgba(249,115,22,0.06)" }}
              >
                <h5 className="font-semibold text-slate-900">{t.title}</h5>
                <p className="text-sm text-slate-600 mt-2">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button className="bg-gradient-to-r from-rose-600 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-[1.02] transition">
            Talk to an Expert
          </button>
          <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-semibold border border-gray-200 shadow-sm hover:bg-gray-50 transition">
            Request a Proposal
          </button>
        </div>

        {/* Bottom 3-column list - updated card colours */}

      </div>
    </section>
  );
};

export default CommunicationSection;
