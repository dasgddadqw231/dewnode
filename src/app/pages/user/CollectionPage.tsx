import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { db, Collection } from "../../utils/mockDb";
import { WireframePlaceholder } from "../../components/WireframePlaceholder";

export function CollectionPage() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    setCollections(db.collections.getAll());
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-20 bg-brand-black">
      <h1 className="text-2xl font-light tracking-[0.4em] text-center mb-20 uppercase text-brand-light">COLLECTION</h1>
      
      <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 2}}>
        <Masonry gutter="60px">
          {collections.map((col) => (
            <div key={col.id} className="space-y-6">
              <div className="w-full aspect-[4/5] overflow-hidden">
                <WireframePlaceholder label={col.title} />
              </div>
              <div className="space-y-2">
                <h3 className="text-[12px] font-medium uppercase tracking-[0.2em] text-brand-light">{col.title}</h3>
                <p className="text-[11px] text-brand-light/40 uppercase tracking-widest mt-1">{col.description}</p>
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}