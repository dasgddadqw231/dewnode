import { useState, useEffect } from "react";
import { db, Product } from "../../utils/mockDb";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { WireframePlaceholder } from "../../components/WireframePlaceholder";

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { register, handleSubmit, reset } = useForm<Omit<Product, 'id' | 'createdAt'>>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setProducts(db.products.getAll());
  }, []);

  const onSubmit = (data: Omit<Product, 'id' | 'createdAt'>) => {
    db.products.add({
      ...data,
      price: Number(data.price),
      isSoldOut: Boolean(data.isSoldOut)
    });
    setProducts(db.products.getAll());
    setIsOpen(false);
    reset();
    toast.success("Product added", {
      style: { backgroundColor: '#383838', color: '#00E2E3', borderRadius: '0', border: '1px solid #00E2E3' }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      db.products.delete(id);
      setProducts(db.products.getAll());
      toast.success("Product deleted", {
        style: { backgroundColor: '#383838', color: '#E2E3E4', borderRadius: '0', border: '1px solid #383838' }
      });
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-light tracking-[0.4em] uppercase text-brand-cyan">PRODUCTS</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-cyan text-brand-black hover:bg-brand-light rounded-none text-[11px] font-bold tracking-widest uppercase px-8 h-12">Add Product</Button>
          </DialogTrigger>
          <DialogContent className="bg-brand-black border-brand-gray text-brand-light rounded-none max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[12px] font-medium tracking-[0.2em] uppercase text-brand-cyan">Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-6">
              <Input {...register("name")} placeholder="PRODUCT NAME" required className="bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest rounded-none h-12" />
              <Input {...register("price")} type="number" placeholder="PRICE" required className="bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest rounded-none h-12" />
              <select {...register("category")} className="w-full bg-brand-black border border-brand-gray text-brand-light text-[11px] tracking-widest p-3 rounded-none focus:outline-none focus:border-brand-cyan">
                <option value="OUTER">OUTER</option>
                <option value="TOP">TOP</option>
                <option value="BOTTOM">BOTTOM</option>
                <option value="ACC">ACC</option>
              </select>
              <Input {...register("image")} placeholder="IMAGE URL" required className="bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest rounded-none h-12" />
              <Button type="submit" className="w-full bg-brand-cyan text-brand-black hover:bg-brand-light rounded-none h-14 text-[11px] font-bold tracking-widest uppercase transition-colors">Save Product</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border border-brand-gray bg-brand-gray/5">
        <table className="w-full text-[11px] tracking-wider text-left uppercase">
          <thead className="border-b border-brand-gray">
            <tr>
              <th className="p-6 font-medium text-brand-light/40">Image</th>
              <th className="p-6 font-medium text-brand-light/40">Name</th>
              <th className="p-6 font-medium text-brand-light/40">Category</th>
              <th className="p-6 font-medium text-brand-light/40">Price</th>
              <th className="p-6 font-medium text-brand-light/40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-brand-gray/10 transition-colors">
                <td className="p-6">
                  <div className="w-14 h-18 overflow-hidden">
                    <WireframePlaceholder label="PROD" />
                  </div>
                </td>
                <td className="p-6 text-brand-light">{product.name}</td>
                <td className="p-6 text-brand-light/60">{product.category}</td>
                <td className="p-6 text-brand-light/60">{product.price.toLocaleString()}</td>
                <td className="p-6 text-right">
                  <button 
                    onClick={() => handleDelete(product.id)} 
                    className="text-brand-light/40 hover:text-red-400 transition-colors text-[10px] uppercase font-bold tracking-widest cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}