import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

// Video mudo en loop que solo se reproduce cuando está en pantalla (no gasta datos ni batería).
// auto=false: no arranca solo; se controla desde afuera con ref.play()/pause().
const VideoAuto = forwardRef(function VideoAuto({ src, poster, className = '', auto = true, alt = '' }, ref) {
  const v = useRef(null);
  useImperativeHandle(ref, () => ({
    play: () => v.current?.play().catch(() => {}),
    pause: () => v.current?.pause(),
    el: v.current,
  }));

  useEffect(() => {
    const el = v.current;
    if (!el || !auto) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [auto, src]);

  return (
    <video
      ref={v}
      src={src}
      poster={poster}
      className={className}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
    />
  );
});

export default VideoAuto;
