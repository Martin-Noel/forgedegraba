"use client";

import Image from "next/image";
import OpenContactButton from "@/components/OpenContactButton";
import ImagePreview from "@/components/ImagePreview";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useCallback } from "react";
import type { ShopifyProduct } from "@/lib/shopify";

function CarouselControls({ selector }: { selector: string }) {
  const scrollToCard = useCallback(
    (indexDir: number) => {
      const container = document.querySelector(selector) as HTMLElement | null;
      if (!container) return;

      const cards = Array.from(
        container.querySelectorAll<HTMLElement>(".creation-card")
      );
      if (cards.length === 0) return;

      const centers = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        return (
          rect.left -
          containerRect.left +
          rect.width / 2 +
          container.scrollLeft
        );
      });

      const viewportCenter = container.scrollLeft + container.clientWidth / 2;

      let nearest = 0;
      let nearestDistance = Infinity;
      centers.forEach((c, i) => {
        const d = Math.abs(c - viewportCenter);
        if (d < nearestDistance) {
          nearestDistance = d;
          nearest = i;
        }
      });

      const targetIndex = Math.min(
        Math.max(0, nearest + indexDir),
        cards.length - 1
      );
      const maxScroll = container.scrollWidth - container.clientWidth;
      const desiredScroll = Math.round(
        centers[targetIndex] - container.clientWidth / 2
      );
      container.scrollTo({
        left: Math.min(Math.max(0, desiredScroll), Math.max(0, maxScroll)),
        behavior: "smooth",
      });
    },
    [selector]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollToCard(-1);
      else if (e.key === "ArrowRight") scrollToCard(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollToCard]);

  return (
    <>
      <button
        aria-label="Précédent"
        onClick={() => scrollToCard(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 sm:hidden bg-black/60 text-white p-3 rounded-full z-20"
      >
        ‹
      </button>
      <button
        aria-label="Suivant"
        onClick={() => scrollToCard(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 sm:hidden bg-black/60 text-white p-3 rounded-full z-20"
      >
        ›
      </button>
    </>
  );
}

type Props = {
  featuredProducts: ShopifyProduct[];
};

export default function HomeClient({ featuredProducts }: Props) {
  const { scrollY } = useScroll();
  const yStampSavoir = useTransform(scrollY, [0, 500], [0, 0]);
  const yStampContact = useTransform(scrollY, [0, 500], [0, 0]);
  const stamp_white = "/stamps/stamp_white.png";

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden" id="hero">
        <div className="absolute inset-0">
          <Image
            src="/background/bg-main.jpg"
            alt="Forgeron à l'œuvre"
            fill
            priority
            className="object-cover brightness-[1]"
            style={{ objectPosition: "center 35%" }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-start pt-30 md:justify-center text-center px-6 md:pt-0">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-cinzel mb-4 md:mb-6 text-white leading-tight"
          >
            La forge de <span className="text-copper">Graba</span>
            <span className="sr-only">
              {" "}
              - Artisan coutelier en Dordogne, couteaux forgés à la main
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-xl md:text-2xl lg:text-3xl font-light mb-8 md:mb-10 text-gray-100 max-w-4xl lg:max-w-5xl leading-relaxed tracking-wide"
          >
            <p className="mb-24 md:mb-4">
              Bienvenue dans mon atelier de coutellerie artisanale.
            </p>
            <p>
              Ici, chaque couteau est forgé à la main avec passion, précision et
              savoir-faire.
            </p>
          </motion.div>
          <motion.a
            href="/creations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="btn-primary text-lg md:text-xl px-8 py-4 shadow-lg hover:shadow-xl transition-shadow"
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
        aria-labelledby="savoir-faire-title"
      >
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
          style={{ y: yStampSavoir }}
          aria-hidden="true"
        >
          <Image src={stamp_white} alt="" fill className="object-contain" />
        </motion.div>

        <h2
          id="savoir-faire-title"
          className="text-5xl font-cinzel text-center mb-10 text-copper"
        >
          Le Savoir-Faire
        </h2>
        <div className="text-lg leading-relaxed text-center text-gray-300 max-w-3xl mx-auto space-y-4">
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
        aria-labelledby="creations-title"
      >
        <h2
          id="creations-title"
          className="text-5xl font-cinzel text-center mb-10 text-copper"
        >
          Les Créations
        </h2>

        <div className="max-w-6xl mx-auto px-6 relative">
          <div
            id="creations-carousel"
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-3 sm:overflow-visible sm:snap-none items-stretch"
            role="list"
          >
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                role="listitem"
                className="creation-card snap-center sm:snap-none block h-full"
              >
                {p.featuredImage && (
                  <div className="card-media">
                    <ImagePreview
                      src={p.featuredImage.url}
                      alt={p.featuredImage.altText ?? p.title}
                      rotate90
                    />
                  </div>
                )}
                <div className="card-body">
                  <div className="text-center">
                    <h3 className="creation-title font-cinzel">{p.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CarouselControls selector="#creations-carousel" />

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
        aria-labelledby="contact-title"
      >
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
          style={{ y: yStampContact }}
          aria-hidden="true"
        >
          <Image src={stamp_white} alt="" fill className="object-contain" />
        </motion.div>

        <h2
          id="contact-title"
          className="text-5xl font-cinzel mb-10 text-copper"
        >
          Contact
        </h2>
        <p className="text-gray-300 mb-6">
          Pour toute demande d&apos;information, réservation de stage et autre,
          contactez-moi :
        </p>
        <OpenContactButton className="btn-primary text-white px-6 py-3 rounded-xl relative z-10">
          Envoyer un message
        </OpenContactButton>
      </section>
    </>
  );
}
