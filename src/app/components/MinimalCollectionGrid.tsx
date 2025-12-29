import { WireframePlaceholder } from "./WireframePlaceholder";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function MinimalCollectionGrid() {
  // Purely visual archive items with real images that match the minimal grey aesthetic
  const archiveItems = [
    { id: 1, label: 'ARCHIVE_001', aspect: "aspect-[3/4]", image: "https://images.unsplash.com/photo-1695131022320-c42cd294863f?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, label: 'ARCHIVE_002', aspect: "aspect-square", image: "https://images.unsplash.com/photo-1705948731485-6e4c6c180d0d?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, label: 'ARCHIVE_003', aspect: "aspect-[4/5]", image: "https://images.unsplash.com/photo-1587036948252-541b9e2e999a?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, label: 'ARCHIVE_004', aspect: "aspect-square", image: "https://images.unsplash.com/photo-1760434100079-91428953cbe9?q=80&w=1000&auto=format&fit=crop" },
    { id: 5, label: 'ARCHIVE_005', aspect: "aspect-[3/4]", image: "https://images.unsplash.com/photo-1568412135975-3da921a7335d?q=80&w=1000&auto=format&fit=crop" },
    { id: 6, label: 'ARCHIVE_006', aspect: "aspect-[4/5]", image: "https://images.unsplash.com/photo-1667893520221-446bbc46939d?q=80&w=1000&auto=format&fit=crop" },
    { id: 7, label: 'ARCHIVE_007', aspect: "aspect-[3/4]", image: "https://images.unsplash.com/photo-1621544170639-fb0189e518ba?q=80&w=1000&auto=format&fit=crop" },
    { id: 8, label: 'ARCHIVE_008', aspect: "aspect-square", image: "https://images.unsplash.com/photo-1762538835744-485f41331fd7?q=80&w=1000&auto=format&fit=crop" },
    { id: 9, label: 'ARCHIVE_009', aspect: "aspect-[4/5]", image: "https://images.unsplash.com/photo-1761830476467-0ff86dbcc75d?q=80&w=1000&auto=format&fit=crop" },
    { id: 10, label: 'ARCHIVE_010', aspect: "aspect-square", image: "https://images.unsplash.com/photo-1738748444676-113d30c9a25b?q=80&w=1000&auto=format&fit=crop" },
    { id: 11, label: 'ARCHIVE_011', aspect: "aspect-[3/4]", image: "https://images.unsplash.com/photo-1559810102-28db54c5f94c?q=80&w=1000&auto=format&fit=crop" },
    { id: 12, label: 'ARCHIVE_012', aspect: "aspect-[4/5]", image: "https://images.unsplash.com/photo-1667893520221-446bbc46939d?q=80&w=1000&auto=format&fit=crop" },
  ];
  
  return (
    <div className="w-full bg-brand-black">
      {/* ... remove this code ... */}

      {/* Dense Grid with Random Aspect Ratios for Moodboard feel */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border-l border-brand-light/5">
        {archiveItems.map((item) => (
          <div key={item.id} className={`group relative ${item.aspect} border-r border-b border-brand-light/5 overflow-hidden bg-brand-black`}>
            {/* Visual Frame */}
            <div className="w-full h-full p-6 transition-all duration-1000 group-hover:p-4">
              <ImageWithFallback 
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Internal Schematic Lines */}
              <div className="absolute top-8 left-8 right-8 bottom-8 border border-brand-light/5 pointer-events-none" />
            </div>

            {/* Hover State: Subtle Scanline Effect or Brightness */}
            <div className="absolute inset-0 bg-brand-cyan/0 group-hover:bg-brand-cyan/[0.02] transition-colors duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}