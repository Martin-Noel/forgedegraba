"use client";

import Image from "next/image";
import creations from "../data/creations.json";

type Creation = {
  id: string;
  title: string;
  blade_length_cm: number;
  handle_length_cm: number;
  width_cm: number;
  handle_material: string;
  description: string;
  image: string;
  featured?: boolean;
};
import { motion, useScroll, useTransform } from "framer-motion";

export default function HomePage() {
  const { scrollY } = useScroll();

  // Parallaxe pour les sections
  const yStampSavoir = useTransform(scrollY, [0, 500], [0, 0]);
  const yStampContact = useTransform(scrollY, [0, 500], [0, 0]);

  const stamp_white = "/stamps/stamp_white.png";

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden" id="hero">
        {/* Background principal avec parallaxe */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: useTransform(scrollY, [0, 500], [0, -50]),
          }}
        >
          {/* TODO: descendre la photo : cf ancienne version du projet */}
          <Image
            src="/background/bg-main.jpg"
            alt="Forgeron à l'œuvre"
            fill
            priority
            className="object-cover brightness-[0.65]"
          />
        </motion.div>

        {/* Contenu Hero */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-cinzel mb-6 text-white"
          >
            Le feu façonne l’âme du métal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-lg md:text-2xl font-light mb-8 text-gray-200 max-w-2xl"
          >
            Créations forgées à la main — entre tradition et modernité.
          </motion.p>
          <motion.a
            href="/creations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="bg-copper text-white px-6 py-3 rounded-xl text-lg hover:bg-copper/80 transition"
          >
            Découvrir les créations
          </motion.a>
        </div>
      </section>

      {/* SAVOIR-FAIRE */}
      <section
        id="savoir-faire"
        className="relative max-w-6xl mx-auto py-20 px-6 overflow-hidden"
        style={{ scrollMarginTop: "60px" }}
      >
        {/* Poinçon filigrane */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
          style={{ y: yStampSavoir }}
        >
          <Image
            src={stamp_white}
            alt="stamp_savoir_faire"
            fill
            className="object-contain"
          />
        </motion.div>

        <h2 className="text-5xl font-cinzel text-center mb-10 text-copper">
          Le Savoir-Faire
        </h2>
        <div className="text-lg leading-relaxed text-center text-gray-300 max-w-3xl mx-auto space-y-4">
          <p>
            Bienvenue dans mon atelier de coutellerie artisanale. Ici, chaque
            couteau de cuisine est forgé à la main avec passion, précision et
            savoir-faire.
          </p>

          <p>
            Ancien cuisinier professionnel, c&apos;est en cuisine que j&apos;ai
            compris l&apos;importance d&apos;un bon couteau. Mon objectif :
            proposer des outils à la fois performants, durables et esthétiques,
            qui répondent aux exigences des professionnels comme des amateurs
            passionnés.
          </p>

          <p>
            Toutes les lames de mes couteaux sont forgées dans mon atelier, en
            sélectionnant des aciers carbone de qualité. Chaque manche est
            façonné artisanalement, avec des matériaux variés (bois stabilisé,
            essence locale) pour offrir une prise en main confortable et un
            équilibre parfait. Chaque pièce est unique, conçue pour durer et
            pour être utilisée tous les jours.
          </p>

          <p>
            Que vous soyez chef, passionné de cuisine ou collectionneur, vous
            trouverez ici un couteau forgé sur mesure, pensé pour vous
            accompagner au quotidien en cuisine.
          </p>
        </div>
      </section>

      {/* CRÉATIONS */}
      <section
        id="creations"
        className="py-20 bg-[#141414]"
        style={{ scrollMarginTop: "60px" }}
      >
        <h2 className="text-5xl font-cinzel text-center mb-10 text-copper">
          Les Créations
        </h2>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {(creations as Creation[])
              .filter((c: Creation) => c.featured)
              .slice(0, 3)
              .map((c) => (
                <div key={c.id} className="creation-card block">
                  <div className="card-media">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="next-image"
                    />
                  </div>
                  <div className="card-body">
                    <h3 className="creation-title font-cinzel">{c.title}</h3>
                    <p className="creation-meta">
                      Lame {c.blade_length_cm}cm  Manche {c.handle_length_cm}cm
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="text-center mt-8">
            <a href="/creations" className="btn-primary">
              Voir toutes les créations
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative max-w-3xl mx-auto py-20 px-6 text-center overflow-hidden"
      >
        {/* Poinçon filigrane */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
          style={{ y: yStampContact }}
        >
          <Image
            src={stamp_white}
            alt="stamp_contact"
            fill
            className="object-contain"
          />
        </motion.div>

        <h2 className="text-5xl font-cinzel mb-10 text-copper">Contact</h2>
        <p className="text-gray-300 mb-6">
          Pour toute demande de création sur mesure ou de collaboration,
          contactez-moi :
        </p>
        <a
          href="mailto:contact@forge-artisanale.fr"
          className="bg-copper text-white px-6 py-3 rounded-xl hover:bg-copper/80 transition"
        >
          Envoyer un message
        </a>
      </section>
    </>
  );
}
