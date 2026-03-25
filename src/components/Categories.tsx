interface CategoryCardProps {
  title: string;
  image: string;
}

const CategoryCard = ({ title, image }: CategoryCardProps) => {
  return (
    <div className="flex flex-col gap-3 group cursor-pointer">
      <div className="relative overflow-hidden rounded-[50px] aspect-[3/4] w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center gap-6 px-1">
        <span className="text-lg font-medium tracking-wide lowercase">{title}</span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">
          Shop now &gt;
        </span>
      </div>
    </div>
  );
};

const IMAGES = {
  category1: "trousers.png",
  category2: "skirt.png",
  category3: "shirt.png",
};

export function Categories() {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end  py-4 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-lg lowercase">explore more</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <CategoryCard title="trousers" image={IMAGES.category1} />
          <CategoryCard title="skirts" image={IMAGES.category2} />
          <CategoryCard title="shirts" image={IMAGES.category3} />
        </div>
      </div>
    </section>
  );
}
