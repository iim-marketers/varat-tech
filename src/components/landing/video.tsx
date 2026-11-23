"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, Play } from "lucide-react";

import { site } from "@/lib/site";

import { SectionHeading } from "./section-heading";

export function VideoGuide() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-surface px-4 py-16 sm:py-20">
      <SectionHeading
        eyebrow="See it before you buy"
        title="Set up and lock a phone in 60 seconds"
      >
        Watch the exact steps — install the app, enrol a customer&apos;s phone,
        and lock it remotely. No demo call needed.
      </SectionHeading>

      <div className="relative mx-auto mt-10 max-w-4xl">
        <div
          aria-hidden
          className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand/25 via-transparent to-ember/25 blur-xl"
        />
        <div className="relative aspect-video overflow-hidden rounded-3xl bg-ink shadow-2xl ring-1 ring-ink/10">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${site.youtubeId}?autoplay=1&rel=0`}
              title="MDM Locker setup tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 size-full"
              aria-label="Play the 2-minute MDM Locker setup video"
            >
              <Image
                src={`https://i.ytimg.com/vi/${site.youtubeId}/hqdefault.jpg`}
                alt=""
                fill
                sizes="(min-width: 896px) 896px, 100vw"
                className="object-cover opacity-80 transition group-hover:opacity-90"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <span className="absolute top-1/2 left-1/2 grid size-18 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ember shadow-2xl transition group-hover:scale-105 sm:size-22">
                <span className="absolute inset-0 animate-ping-slow rounded-full bg-white/40" />
                <Play className="relative ml-1 size-7 fill-current sm:size-9" />
              </span>
              <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-white backdrop-blur sm:bottom-6 sm:left-6 sm:text-sm">
                <Clock className="size-3.5" /> 2-minute guide
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
