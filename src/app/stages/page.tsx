import type { Metadata } from "next";
import Image from "next/image";
import OpenContactButton from "../../../src/components/OpenContactButton";

export const metadata: Metadata = {
  title: "Stages de coutellerie artisanale | La forge de Graba",
  description:
    "Apprenez la forge de couteaux en stage d'initiation ou d'immersion : trempe, montage de manche, finitions. Petits groupes, pédagogie pratique et sécurisée en Dordogne.",
  alternates: {
    canonical: "/stages",
  },
};

export default function StagesPage() {
  return (
    <main
      className="max-w-6xl mx-auto px-6 py-24"
      style={{ scrollMarginTop: 80 }}
    >
      <header className="text-center mb-12">
        <h1 className="text-5xl font-cinzel text-copper">Stages</h1>
        <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
          Découvrez nos stages de coutellerie — forge, trempe, montage de manche
          et finitions. Petits groupes, pédagogie pratique et sécurisée.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2 items-stretch">
        {/* Card 1 */}
        <article className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6 shadow-sm flex flex-col">
          {/* Logo on top */}
          <div className="w-20 h-20 relative opacity-80 mx-auto">
            <Image
              src="/stamps/stamp_white.png"
              alt="Poinçon de La forge de Graba"
              fill
              className="object-contain"
            />
          </div>

          {/* Title and meta */}
          <div className="mt-3 text-center">
            <h2 className="text-2xl font-cinzel mb-1">
              Stage d&apos;initiation à la coutellerie
            </h2>
            <p className="text-sm text-steel">
              Couteau brut de forge · 1 à 2 personnes · 1j (5–6h)
            </p>
          </div>

          <div className="flex-1 mt-6">
            <p className="text-gray-300 text-justified stage-summary">
              Lors d&apos;une journée immersive, laissez-vous envoûter par le
              feu de la forge, où vous aurez le privilège de façonner votre
              propre couteau médiéval (un couteau brut de forge sans manche en
              bois). Au terme de la journée, vous repartirez avec votre superbe
              couteau médiéval, prêt à devenir votre parfait compagnon.
            </p>

            <h3 className="mt-6 font-cinzel">
              Jour 1 — Initiation &amp; Couteau brut de forge
            </h3>
            <ul className="list-disc ml-5 mt-2 text-gray-300">
              <li>Présentation du matériel et des règles de sécurité</li>
              <li>Découverte des outils : enclume, marteau, forge</li>
              <li>Gestes fondamentaux : étirer, écraser, façonner, torsader</li>
              <li>Réalisation d’un couteau brut de forge, forgé et trempé</li>
            </ul>
          </div>
          {/* Price then button centered */}
          <div className="mt-6 text-center">
            <div className="text-copper font-semibold text-lg">240€</div>
            <div className="mt-3 flex justify-center">
              <OpenContactButton
                className="btn-primary"
                subject="Réservation Stage initiation"
              >
                Réserver
              </OpenContactButton>
            </div>
          </div>
        </article>

        {/* Card 2 */}
        <article className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6 shadow-sm flex flex-col">
          {/* Logo on top */}
          <div className="w-20 h-20 relative opacity-80 mx-auto">
            <Image
              src="/stamps/stamp_white.png"
              alt="Poinçon de La forge de Graba"
              fill
              className="object-contain"
            />
          </div>

          {/* Title and meta */}
          <div className="mt-3 text-center">
            <h2 className="text-2xl font-cinzel mb-1">
              Stage d&apos;initiation à la coutellerie 2
            </h2>
            <p className="text-sm text-steel">
              Réalisation d&apos;un couteau droit · 1 à 2 personnes · 1j (6–7h)
            </p>
          </div>

          <div className="flex-1 mt-6">
            <p className="text-gray-300 text-justified stage-summary">
              Dès votre arrivée, vous explorerez l&apos;atelier et prendrez en
              main les machines et outils traditionnels. Une introduction
              théorique précédera la réalisation complète d&apos;un couteau
              droit.
            </p>

            <h3 className="mt-6 font-cinzel">
              Jour 1 — Initiation &amp; Couteau droit
            </h3>
            <ul className="list-disc ml-5 mt-2 text-gray-300">
              <li>Présentation du matériel et des règles de sécurité</li>
              <li>Découverte des outils : enclume, marteau, forge</li>
              <li>Gestes fondamentaux : étirer, écraser, façonner, torsader</li>
              <li>Réalisation de la lame, forgée et trempée</li>
              <li>Façonnage du manche en bois — finition et aiguisage</li>
            </ul>
          </div>
          {/* Price then button centered */}
          <div className="mt-6 text-center">
            <div className="text-copper font-semibold text-lg">320€</div>
            <div className="mt-3 flex justify-center">
              <OpenContactButton
                className="btn-primary"
                subject="Réservation Stage couteau droit"
              >
                Réserver
              </OpenContactButton>
            </div>
          </div>
        </article>

        {/* Card 3 spans full width on small screens */}
        <article className="md:col-span-2 bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6 shadow-sm flex flex-col">
          {/* Logo on top */}
          <div className="w-20 h-20 relative opacity-80 mx-auto">
            <Image
              src="/stamps/stamp_white.png"
              alt="Poinçon de La forge de Graba"
              fill
              className="object-contain"
            />
          </div>

          {/* Title and meta */}
          <div className="mt-3 text-center">
            <h2 className="text-2xl font-cinzel mb-1">
              Stage immersion individuel
            </h2>
            <p className="text-sm text-steel">
              2j · 1 personne · 2 couteaux (brut + cuisine)
            </p>
          </div>

          <div className="flex-1 mt-6">
            <p className="text-gray-300 text-justified">
              Plongez dans l’univers fascinant de la coutellerie artisanale le
              temps de deux jours. Ce stage est ouvert à tous, débutants comme
              amateurs éclairés.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-cinzel">
                  Jour 1 — Initiation &amp; Couteau brut de forge
                </h4>
                <ul className="list-disc ml-5 mt-2 text-gray-300">
                  <li>Présentation du matériel et des règles de sécurité</li>
                  <li>Découverte des outils et gestes fondamentaux</li>
                  <li>
                    Réalisation d’un couteau brut de forge, forgé et trempé
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-cinzel">
                  Jour 2 — Couteau de cuisine personnalisé
                </h4>
                <ul className="list-disc ml-5 mt-2 text-gray-300">
                  <li>Approfondissement des techniques de forge</li>
                  <li>Mise en forme de la lame et traitement thermique</li>
                  <li>
                    Travail du manche (bois ou autre selon disponibilités)
                  </li>
                  <li>Finitions et aiguisage final</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Price then button centered */}
          <div className="mt-6 text-center">
            <div className="text-copper font-semibold text-lg">440€</div>
            <div className="mt-3 flex justify-center">
              <OpenContactButton
                className="btn-primary"
                subject="Réservation Stage immersion individuel"
              >
                Réserver
              </OpenContactButton>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
