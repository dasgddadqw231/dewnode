import { useState, useEffect } from "react";
import { db, Collection } from "../../utils/mockDb";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { WireframePlaceholder } from "../../components/WireframePlaceholder";

export function AdminCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const { register, handleSubmit, reset } = useForm<Omit<Collection, 'id'>>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCollections(db.collections.getAll());
  }, []);

  const onSubmit = (data: Omit<Collection, 'id'>) => {
    db.collections.add(data);
    setCollections(db.collections.getAll());
    setIsOpen(false);
    reset();
    toast.success("Collection added", {
      style: { backgroundColor: '#383838', color: '#00E2E3', borderRadius: '0', border: '1px solid #00E2E3' }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure?")) {
      db.collections.delete(id);
      setCollections(db.collections.getAll());
      toast.success("Collection deleted", {
        style: { backgroundColor: '#383838', color: '#E2E3E4', borderRadius: '0' }
      });
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-light tracking-[0.4em] uppercase text-brand-cyan">COLLECTIONS</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-cyan text-brand-black hover:bg-brand-light rounded-none text-[11px] font-bold tracking-widest uppercase px-8 h-12">Add Collection</Button>
          </DialogTrigger>
          <DialogContent className="bg-brand-black border-brand-gray text-brand-light rounded-none max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[12px] font-medium tracking-[0.2em] uppercase text-brand-cyan">Add Collection</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-6">
              <Input {...register("title")} placeholder="TITLE" required className="bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest rounded-none h-12" />
              <Input {...register("description")} placeholder="DESCRIPTION" required className="bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest rounded-none h-12" />
              <Input {...register("image")} placeholder="UNSPLASH IMAGE URL" required className="bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest rounded-none h-12" />
              <Button type="submit" className="w-full bg-brand-cyan text-brand-black hover:bg-brand-light rounded-none h-14 text-[11px] font-bold tracking-widest uppercase transition-colors">Save Collection</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map(col => (
          <div key={col.id} className="border border-brand-gray bg-brand-gray/5 p-6 space-y-6">
            <div className="aspect-[3/4] overflow-hidden">
              <WireframePlaceholder label="COLLECTION" />
            </div>
            <div className="space-y-2">
              <h3 className="text-[12px] font-bold tracking-widest uppercase text-brand-light">{col.title}</h3>
              <p className="text-[10px] text-brand-light/40 uppercase tracking-widest line-clamp-2 leading-relaxed">{col.description}</p>
            </div>
            <button 
              onClick={() => handleDelete(col.id)} 
              className="w-full text-brand-light/40 hover:text-red-400 transition-colors text-[10px] uppercase font-bold tracking-widest cursor-pointer py-2 border border-transparent hover:border-brand-gray"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}