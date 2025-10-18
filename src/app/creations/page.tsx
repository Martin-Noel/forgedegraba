import creations from "../../data/creations.json";
import OpenContactButton from "../../../src/components/OpenContactButton";
import ImagePreview from "../../../src/components/ImagePreview";

type Creation = {
  id: string;
  title: string;
  blade_length_cm: number;
  handle_length_cm: number;
  width_cm: number;
  handle_material: string;
  description: string;
  image: string;
};

export default function CreationsPage() {
  return (
    <main
      className="max-w-6xl mx-auto px-6 py-24"
      style={{ scrollMarginTop: 80 }}
    >
      <header className="text-center mb-12">
        <h1 className="text-5xl font-cinzel text-copper">Les créations</h1>
        <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
          Une sélection de couteaux forgés à la main — pièces uniques et
          finitions soignées.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {(creations as Creation[]).map((c) => (
          <article key={c.id} className="creation-card">
            <div className="card-media">
              <ImagePreview src={c.image} alt={c.title} className="" />
            </div>

            <div className="card-body">
              <h3 className="creation-title font-cinzel">{c.title}</h3>
              <p className="creation-meta">
                Lame {c.blade_length_cm}cm · Manche {c.handle_length_cm}cm ·{" "}
                {c.width_cm}cm
              </p>
              <p className="mt-2 text-gray-300 text-sm">{c.handle_material}</p>
              <p className="mt-2 text-gray-300 text-sm">{c.description}</p>

              <div className="mt-4">
                <OpenContactButton
                  className="btn-primary"
                  subject={`Info ${c.title}`}
                >
                  Demande info
                </OpenContactButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
