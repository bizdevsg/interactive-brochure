import { useRef, useState } from "react";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";
import { Badge } from "./Badge";
import { track } from "@/lib/analytics";

interface Props {
  src: string | null;
  poster: string | null;
  title: string;
  badge: string;
}

/**
 * Pemutar video: lazy (elemen <video> baru dimuat setelah ditekan), tidak autoplay dengan suara,
 * kontrol putar/jeda, bisukan, dan layar penuh bila didukung. Tanpa `src`, tampil status "belum tersedia".
 */
export function VideoPlayer({ src, poster, title, badge }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [activated, setActivated] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const fullscreen = () => {
    const v = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!v) return;
    if (v.requestFullscreen) void v.requestFullscreen();
    else v.webkitEnterFullscreen?.();
  };

  const canFullscreen =
    typeof document !== "undefined" ? true : false; // browser tanpa dukungan akan diabaikan secara aman

  return (
    <div className="overflow-hidden rounded-3xl border border-gold/30 bg-surface">
      <div className="relative aspect-video bg-ink-deep">
        {activated && src && !failed ? (
          <video
            ref={video}
            src={src}
            poster={poster ?? undefined}
            muted={muted}
            playsInline
            autoPlay
            preload="none"
            aria-label={title}
            className="size-full object-cover"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onError={() => setFailed(true)}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              setProgress(v.duration ? v.currentTime / v.duration : 0);
            }}
          />
        ) : (
          <>
            <div className="absolute inset-0 grid place-items-center overflow-hidden bg-[radial-gradient(ellipse_at_center,rgb(240_177_0/0.25),transparent_70%)]">
              <PhoneMockup variant="single" label="" className="w-[26%] opacity-80" />
            </div>
            <div className="absolute inset-0 grid place-items-center">
              <button
                type="button"
                disabled={!src || failed}
                onClick={() => {
                  setActivated(true);
                  track("video_play", { video: title });
                }}
                aria-label={src && !failed ? `Putar video: ${title}` : "Video belum tersedia"}
                className="grid size-16 place-items-center rounded-full gold-gradient text-ink shadow-lg transition-transform active:scale-95 disabled:opacity-60"
              >
                <Play className="size-7 translate-x-0.5" fill="currentColor" aria-hidden />
              </button>
            </div>
            {(!src || failed) && (
              <p className="absolute inset-x-0 bottom-2 text-center text-xs font-semibold text-muted">
                {failed ? "Video tidak dapat dimuat" : "Video belum diunggah"}
              </p>
            )}
          </>
        )}
        <Badge className="absolute left-3 top-3 bg-ink/70 backdrop-blur">{badge}</Badge>
      </div>

      <div className="h-1 bg-gold/20" role="progressbar" aria-label="Kemajuan video" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
        <div className="h-full bg-gold" style={{ width: `${progress * 100}%` }} />
      </div>

      {activated && src && !failed && (
        <div className="flex items-center gap-2 px-3 py-2">
          <button type="button" onClick={toggle} aria-label={playing ? "Jeda" : "Putar"} className="grid size-11 place-items-center rounded-full border border-gold/30">
            {playing ? <Pause className="size-5" aria-hidden /> : <Play className="size-5" aria-hidden />}
          </button>
          <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? "Aktifkan suara" : "Bisukan"} aria-pressed={!muted} className="grid size-11 place-items-center rounded-full border border-gold/30">
            {muted ? <VolumeX className="size-5" aria-hidden /> : <Volume2 className="size-5" aria-hidden />}
          </button>
          {canFullscreen && (
            <button type="button" onClick={fullscreen} aria-label="Layar penuh" className="ml-auto grid size-11 place-items-center rounded-full border border-gold/30">
              <Maximize className="size-5" aria-hidden />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
