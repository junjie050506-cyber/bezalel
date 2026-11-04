import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ */
/* 1. SMOOTH INERTIA SCROLL (no dependency)                            */
/* ------------------------------------------------------------------ */
export const SmoothScroll: React.FC = () => {
  useEffect(() => {
    if (!canHover() || reducedMotion()) return;

    const html = document.documentElement;
    html.style.scrollBehavior = 'auto';

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;
    let running = false;

    const maxScroll = () => html.scrollHeight - window.innerHeight;

    const loop = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.4) {
        current = target;
        window.scrollTo(0, current);
        running = false;
        return;
      }
      current += diff * 0.09;
      window.scrollTo(0, current);
      raf = requestAnimationFrame(loop);
    };

    const insideScrollable = (el: EventTarget | null) => {
      let node = el as HTMLElement | null;
      while (node && node !== document.body) {
        const s = getComputedStyle(node);
        if (
          /(auto|scroll)/.test(s.overflowY) &&
          node.scrollHeight > node.clientHeight + 1
        ) {
          return true;
        }
        node = node.parentElement;
      }
      return false;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.defaultPrevented || html.dataset.modalOpen || insideScrollable(e.target)) return;
      e.preventDefault();
      if (!running) {
        current = window.scrollY;
        target = window.scrollY;
      }
      const mult = e.deltaMode === 1 ? 32 : 1;
      target = Math.max(0, Math.min(maxScroll(), target + e.deltaY * mult));
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    // keep in sync when something else scrolls the page (links, keyboard, route change)
    const onScroll = () => {
      if (!running) {
        current = window.scrollY;
        target = window.scrollY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
};

/* ------------------------------------------------------------------ */
/* 2. CUSTOM CURSOR (Disabled per user request)                        */
/* ------------------------------------------------------------------ */
export const CustomCursor: React.FC = () => null;

/* ------------------------------------------------------------------ */
/* 3. MAGNETIC BUTTONS (Disabled per user request)                     */
/* ------------------------------------------------------------------ */
export const MagneticButtons: React.FC = () => null;

/* ------------------------------------------------------------------ */
/* 5. 3D TILT + GLARE for any element with  data-tilt                  */
/* ------------------------------------------------------------------ */
export const TiltCards: React.FC = () => {
  useEffect(() => {
    if (!canHover() || reducedMotion()) return;

    const MAXROT = 7;
    type S = { rx: number; ry: number; trx: number; try_: number; glare: HTMLDivElement; raf: number };
    const map = new WeakMap<HTMLElement, S>();

    const ensure = (el: HTMLElement): S => {
      let s = map.get(el);
      if (s) return s;
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      const glare = document.createElement('div');
      glare.setAttribute('aria-hidden', 'true');
      glare.style.cssText =
        'position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .25s;z-index:5;border-radius:inherit;';
      el.appendChild(glare);
      el.style.willChange = 'transform';
      s = { rx: 0, ry: 0, trx: 0, try_: 0, glare, raf: 0 };
      map.set(el, s);
      return s;
    };

    const animate = (el: HTMLElement, s: S) => {
      s.rx += (s.trx - s.rx) * 0.14;
      s.ry += (s.try_ - s.ry) * 0.14;
      const settled = Math.abs(s.rx - s.trx) < 0.02 && Math.abs(s.ry - s.try_) < 0.02;
      if (settled && s.trx === 0 && s.try_ === 0) {
        el.style.transform = '';
        s.raf = 0;
        return;
      }
      el.style.transform = `perspective(900px) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg)`;
      s.raf = requestAnimationFrame(() => animate(el, s));
    };

    const onMove = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('[data-tilt]') as HTMLElement | null;
      if (!el) return;
      const s = ensure(el);
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      s.try_ = (px - 0.5) * 2 * MAXROT;
      s.trx = -(py - 0.5) * 2 * MAXROT;
      s.glare.style.opacity = '1';
      s.glare.style.background = `radial-gradient(circle at ${(px * 100).toFixed(0)}% ${(py * 100).toFixed(0)}%, rgba(255,255,255,0.28), rgba(255,255,255,0) 55%)`;
      if (!s.raf) s.raf = requestAnimationFrame(() => animate(el, s));
    };

    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('[data-tilt]') as HTMLElement | null;
      if (!el) return;
      const to = e.relatedTarget as Node | null;
      if (to && el.contains(to)) return;
      const s = map.get(el);
      if (!s) return;
      s.trx = 0;
      s.try_ = 0;
      s.glare.style.opacity = '0';
      if (!s.raf) s.raf = requestAnimationFrame(() => animate(el, s));
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseout', onOut);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return null;
};



/* ------------------------------------------------------------------ */
/* 6. SCROLL REVEAL — Handled declaratively via MotionContainer        */
/* ------------------------------------------------------------------ */
export const GlobalReveal: React.FC = () => null;

/* ------------------------------------------------------------------ */
/* 7. CLICK RIPPLE on buttons / links / cards                          */
/* ------------------------------------------------------------------ */
export const ClickRipple: React.FC = () => {
  useEffect(() => {
    if (reducedMotion()) return;
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el?.closest?.('a, button, [role="button"], [data-tilt], .cursor-pointer')) return;
      const ring = document.createElement('span');
      ring.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:9999px;border:2px solid #E6B94D;pointer-events:none;z-index:299;opacity:.9;`;
      document.body.appendChild(ring);
      const anim = ring.animate(
        [
          { transform: 'scale(1)', opacity: 0.9 },
          { transform: 'scale(7)', opacity: 0 },
        ],
        { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)' }
      );
      anim.onfinish = () => ring.remove();
    };
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, []);
  return null;
};

/* ------------------------------------------------------------------ */
/* 8. MOUSE PARALLAX for any element with data-depth="N"               */
/* ------------------------------------------------------------------ */
export const MouseParallax: React.FC = () => {
  useEffect(() => {
    if (!canHover() || reducedMotion()) return;
    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    const tick = () => {
      cx += (mx - cx) * 0.07;
      cy += (my - cy) * 0.07;
      document.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
        const d = parseFloat(el.dataset.depth || '0');
        el.style.translate = `${(cx * d).toFixed(2)}px ${(cy * d).toFixed(2)}px`;
      });
      if (Math.abs(mx - cx) > 0.001 || Math.abs(my - cy) > 0.001) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);
  return null;
};

export const PremiumEffects: React.FC = () => (
  <>
    <GlobalReveal />
    <ClickRipple />
    <MouseParallax />
    <SmoothScroll />
    <CustomCursor />
    <MagneticButtons />
    <TiltCards />
  </>
);
