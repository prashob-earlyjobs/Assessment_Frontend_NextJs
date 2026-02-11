"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

type Post = {
  id: string;
  kind: "News" | "Blog";
  date: string;
  title: string;
  imageSrc: string;
};

const NewsBlogV2 = () => {
  const router = useRouter();

  const posts: Post[] = [
    {
      id: "news-1",
      kind: "News",
      date: "30 March 2024",
      title:
        "Revitalizing Workplace Morale: Innovative Tactics For Boosting Employee Engagement In 2024",
      imageSrc: "/v2/images/hero-bg.png",
    },
    {
      id: "blog-1",
      kind: "Blog",
      date: "30 March 2024",
      title: "How To Avoid The Top Six Most Common Job Interview Mistakes",
      imageSrc: "/v2/images/hero-bg.png",
    },
  ];

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-black">
              News and Blog
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl">
              Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed
              tristique in dolor
            </p>
          </div>
          <button
            onClick={() => router.push("/blog")}
            className="mt-3 text-orange-500 hover:text-orange-600 font-medium underline underline-offset-4"
          >
            View all
          </button>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <div className="relative h-[340px] sm:h-[380px] rounded-2xl overflow-hidden">
                <Image
                  src={post.imageSrc}
                  alt={post.title}
                  fill
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute top-6 left-6 inline-flex items-center rounded-full bg-[#F08504] px-5 py-2 text-sm font-semibold text-white shadow-sm">
                  {post.kind}
                </span>
              </div>

              <p className="mt-5 text-gray-500 font-medium">{post.date}</p>
              <h3 className="mt-2 text-2xl font-bold text-black leading-snug">
                {post.title}
              </h3>

              <button
                onClick={() => router.push("/blog")}
                className="mt-4 inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold"
              >
                Read more <ArrowUpRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsBlogV2;

