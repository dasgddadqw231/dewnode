import { useState, useEffect } from "react";
import { db, HeroImage } from "../../utils/mockDb";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import { WireframePlaceholder } from "../../components/WireframePlaceholder";

export function AdminHero() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    setImages(db.hero.getAll());
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage) return;
    db.hero.add(newImage);
    setImages(db.hero.getAll());
    setNewImage("");
    toast.success("Image added", {
      style: { backgroundColor: '#383838', color: '#00E2E3', borderRadius: '0', border: '1px solid #00E2E3' }
    });
  };

  const handleDelete = (id: string) => {
    db.hero.delete(id);
    setImages(db.hero.getAll());
    toast.success("Image deleted", {
      style: { backgroundColor: '#383838', color: '#E2E3E4', borderRadius: '0' }
    });
  };

  return (
    <div className="space-y-12">
      <h1 className="text-xl font-light tracking-[0.4em] uppercase text-brand-cyan">HERO IMAGES</h1>

      <form onSubmit={handleAdd} className="flex gap-4 max-w-2xl">
        <Input 
          value={newImage} 
          onChange={(e) => setNewImage(e.target.value)} 
          placeholder="UNSPLASH IMAGE URL" 
          className="bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest rounded-none h-14"
        />
        <Button type="submit" className="bg-brand-cyan text-brand-black hover:bg-brand-light rounded-none h-14 px-10 text-[11px] font-bold tracking-widest uppercase transition-colors">Add</Button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {images.map(img => (
          <div key={img.id} className="relative group aspect-video overflow-hidden">
            <WireframePlaceholder label="HERO" />
            <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <button 
                onClick={() => handleDelete(img.id)}
                className="text-[10px] font-bold tracking-widest uppercase text-brand-cyan hover:text-brand-light transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}