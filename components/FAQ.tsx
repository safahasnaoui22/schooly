"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "Quel est l’âge minimum pour inscrire mon enfant ?",
    answer:
      "Nous accueillons les enfants à partir de 3 ans dans un environnement pédagogique stimulant favorisant leur développement et leur créativité."
  },
  {
    question: "Quels sont les horaires de l’école ?",
    answer:
      "Les cours commencent à 8h30 et se terminent à 16h00 avec des activités parascolaires proposées en fin de journée."
  },
  {
    question: "Comment se déroule l’inscription ?",
    answer:
      "Vous pouvez remplir le formulaire d’inscription en ligne ou prendre rendez-vous avec notre administration pour visiter l’école."
  },
  {
    question: "Les repas sont-ils inclus ?",
    answer:
      "Oui, nous proposons des repas équilibrés adaptés aux besoins nutritionnels des enfants."
  },
  {
    question: "Proposez-vous des activités parascolaires ?",
    answer:
      "Nous proposons des activités comme le sport, la musique, les arts créatifs et des ateliers éducatifs interactifs."
  }
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="relative py-28 px-6 overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-green-50 via-white to-green-50"></div>

      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Questions Fréquentes
        </motion.h2>

        <div className="space-y-5">

          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl p-[1px] bg-gradient-to-r from-green-400 via-emerald-400 to-green-500"
            >

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl">

                <button
                  onClick={() => toggle(index)}
                  className="w-full px-7 py-6 flex justify-between items-center text-left font-semibold text-lg"
                >
                  {faq.question}

                  <motion.span
                    animate={{ rotate: active === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl text-green-600"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {active === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="px-7 pb-7 text-gray-600 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}