import { useEffect, useState } from "react";
import Slider from "react-slick";
import { PlayCircle } from "lucide-react";

type VideoItem = {
  title: string;
  url: string;
  videoId: string;
};

type VideoMeta = {
  title?: string;
  author_name?: string;
};

const videos: VideoItem[] = [
  {
    title: "Parent Video Testimonial 1",
    url: "https://www.youtube.com/watch?v=9BjbFkDY1Hc",
    videoId: "9BjbFkDY1Hc",
  },
  {
    title: "Parent Video Testimonial 2",
    url: "https://www.youtube.com/watch?v=SsKIc3y28nA",
    videoId: "SsKIc3y28nA",
  },
  {
    title: "Parent Video Testimonial 3",
    url: "https://www.youtube.com/watch?v=JrdbJzn48O0",
    videoId: "JrdbJzn48O0",
  },
  {
    title: "Parent Video Testimonial 4",
    url: "https://www.youtube.com/watch?v=NfsxlbanOLY",
    videoId: "NfsxlbanOLY",
  },
  {
    title: "Parent Video Testimonial 5",
    url: "https://www.youtube.com/watch?v=yxFWdC1LuDA&t=23s",
    videoId: "yxFWdC1LuDA",
  },
  {
    title: "Parent Video Testimonial 6",
    url: "https://www.youtube.com/watch?v=bOQ1g-AgEWw",
    videoId: "bOQ1g-AgEWw",
  },
  {
    title: "Parent Video Testimonial 7",
    url: "https://www.youtube.com/watch?v=i6FFUVwTvm0",
    videoId: "i6FFUVwTvm0",
  },
];

export function VideoTestimonials() {
  const [videoMeta, setVideoMeta] = useState<Record<string, VideoMeta>>({});

  useEffect(() => {
    let isMounted = true;

    const fetchVideoMeta = async () => {
      const results = await Promise.all(
        videos.map(async (video) => {
          try {
            const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(video.url)}&format=json`;
            const response = await fetch(endpoint);

            if (!response.ok) {
              return [video.videoId, {}] as const;
            }

            const data = (await response.json()) as VideoMeta;
            return [video.videoId, data] as const;
          } catch {
            return [video.videoId, {}] as const;
          }
        }),
      );

      if (isMounted) {
        setVideoMeta(Object.fromEntries(results));
      }
    };

    const hasIdleCallback =
      typeof window !== "undefined" && "requestIdleCallback" in window;
    let timeoutId: number | null = null;
    let idleId: number | null = null;

    if (hasIdleCallback) {
      idleId = window.requestIdleCallback(
        () => {
          void fetchVideoMeta();
        },
        { timeout: 2500 },
      );
    } else {
      timeoutId = window.setTimeout(() => {
        void fetchVideoMeta();
      }, 1200);
    }

    return () => {
      isMounted = false;
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2300,
    pauseOnHover: true,
    arrows: false,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="page-section py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="px-2 text-3xl md:text-4xl font-bold leading-tight mb-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
            Student Activity Highlights
          </h2>
          <p className="px-2 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real classroom moments and activity videos from our young learners
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen px-4 sm:px-8 lg:px-12">
          <Slider {...settings}>
            {videos.map((video) => {
              const resolvedTitle =
                videoMeta[video.videoId]?.title ?? video.title;
              const resolvedSource =
                videoMeta[video.videoId]?.author_name ?? "YouTube";

              return (
                <div key={video.videoId} className="px-2 md:px-3">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    aria-label={`Open ${resolvedTitle} on YouTube`}
                  >
                    <div className="relative">
                      <img
                        src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                        alt={`${resolvedTitle} thumbnail`}
                        className="w-full aspect-video object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle className="h-14 w-14 text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm md:text-base font-semibold leading-snug text-gray-800 break-words">
                        {resolvedTitle}
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-gray-500 break-words">
                        {resolvedSource}
                      </p>
                    </div>
                  </a>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
}
