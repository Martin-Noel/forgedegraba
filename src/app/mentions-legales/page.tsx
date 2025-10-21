import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | La forge de Graba",
  description:
    "Mentions légales, informations sur l'éditeur, l'hébergement et la protection des données personnelles de La forge de Graba.",
  alternates: {
    canonical: "/mentions-legales",
  },
};

export default function MentionsLegales() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-md">
        <h1 className="text-3xl font-cinzel mb-4 text-copper">
          Mentions légales
        </h1>

        <div className="space-y-6 text-steel">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-copper">
              Éditeur du site
            </h2>
            <p className="leading-relaxed">
              Le site &quot;La forge de graba&quot; est édité par :
            </p>
            <ul className="mt-2 list-none text-sm text-gray-300">
              <li>Nom / Enseigne : Valentin ADAM - La forge de Graba</li>
              <li>Responsable de la publication : Valentin ADAM</li>
              <li>Adresse : Hameau des Genêts, 24620 Tursac</li>
              <li>Téléphone : 06 27 89 95 93</li>
              <li>
                Email :{" "}
                <a href="mailto:grabaistos@gmail.com" className="underline">
                  grabaistos@gmail.com
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-copper">
              Hébergement
            </h2>
            <p className="leading-relaxed text-sm text-gray-300">
              Le site est hébergé par Vercel Inc. — 340 S Lemon Ave, Ste 4133
              Walnut, CA 91789, USA
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-copper">
              Propriété intellectuelle
            </h2>
            <p className="leading-relaxed text-sm text-gray-300">
              Tous les contenus présents sur ce site (textes, images, logos,
              illustrations) sont la propriété de leurs auteurs ou sont utilisés
              avec permission. Toute reproduction totale ou partielle est
              interdite sans accord préalable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-copper">
              Données personnelles
            </h2>
            <p className="leading-relaxed text-sm text-gray-300">
              Les informations collectées via les formulaires de contact sont
              utilisées uniquement pour répondre à vos demandes. Conformément au
              Règlement Général sur la Protection des Données (RGPD), vous
              disposez d&apos;un droit d&apos;accès, de rectification et de
              suppression de vos données. Pour exercer ce droit, contactez-nous
              à{" "}
              <a href="mailto:martin.noel.dev@gmail.com" className="underline">
                martin.noel.dev@gmail.com
              </a>
              .
            </p>
          </section>

          {/* <section>
            <h2 className="text-xl font-semibold mb-2 text-copper">Cookies</h2>
            <p className="leading-relaxed text-sm text-gray-300">
              Le site peut utiliser des cookies destinés à améliorer
              l&apos;expérience utilisateur et des outils d&apos;analyse (par
              exemple pour mesurer la fréquentation). Vous pouvez gérer les
              cookies via les paramètres de votre navigateur.
            </p>
          </section> */}

          <section>
            <h2 className="text-xl font-semibold mb-2 text-copper">
              Responsabilité
            </h2>
            <p className="leading-relaxed text-sm text-gray-300">
              Les informations publiées sur ce site le sont à titre informatif.
              La responsabilité de l&apos;éditeur ne peut être engagée en cas
              d&apos;erreur ou d&apos;omission. Les contenus peuvent être mis à
              jour sans préavis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-copper">
              Droit applicable
            </h2>
            <p className="leading-relaxed text-sm text-gray-300">
              Le présent site est soumis au droit français. Tout litige sera de
              la compétence des tribunaux français.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-copper">
              Crédits photographiques
            </h2>
            <p className="leading-relaxed text-sm text-gray-300">
              Photo principale (hero) : Raphaël Hinojosa
            </p>
            <p className="leading-relaxed text-sm text-gray-300">
              Photos des créations / couteaux : Valentin Adam
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-copper">
              Crédits — Conception et développement
            </h2>
            <p className="leading-relaxed text-sm text-gray-300">
              Conception et développement :{" "}
              <span className="font-medium">NOËL Martin</span> —{" "}
              <a
                href="https://github.com/Martin-Noel"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                github.com/Martin-Noel
              </a>{" "}
              —{" "}
              <a href="mailto:martin.noel.dev@gmail.com" className="underline">
                martin.noel.dev@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
