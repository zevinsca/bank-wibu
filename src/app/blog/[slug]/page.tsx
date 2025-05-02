import Image from "next/image";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(
    `https://sacredreceipt-us.backendless.app/api/data/Articles?where=slug%3D%27${slug}%27&loadRelations=category`
  );
  // const rawData = await res.json();
  // const data = rawData[0];
  const [data] = await res.json();

  return (
    <main className="py-8 px-8 text-black pt-32">
      <section className="max-w-[1100px] mx-auto w-full px-16 text-justify">
        <div className="relative w-full h-[400px] flex justify-center items-center text-justify">
          <div className="relative w-96 h-full">
            <Image
              src={data.image}
              alt="Hero Image"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <p className="mt-4 text-sm">
          Created at{" "}
          {new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(data.created))}
        </p>
        <h2 className="mt-2 text-4xl font-extrabold">{data.title}</h2>
        <p className="mt-4">{data.content}</p>
      </section>
    </main>
  );
}
