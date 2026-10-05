"use client";

import type { CSSProperties, ReactNode } from "react";

/*
 * Agency intro — a CSS-3D laptop + phone scene played on one time axis (T, seconds).
 * Ported from the "Exocial Intro Animation" composition (intro-v5). Every frame is a
 * pure function of T, so the parent owns the clock and can pause, hold or replay freely.
 *
 * Scenes: Hook (2.9s) → Float (0.7s) → Burst (1.6s) → Stack (1.8s) → Return (1.7s), then hold.
 */

export const INTRO_CUES = { Hook: 0, Float: 2.9, Burst: 3.6, Stack: 5.2, Return: 7.0 };
export const INTRO_DURATION = 8.7;
export const STAGE_W = 1920;
export const STAGE_H = 1080;

type Ease = (t: number) => number;
const Easing = {
  linear: ((t) => t) as Ease,
  easeInCubic: ((t) => t * t * t) as Ease,
  easeOutCubic: ((t) => --t * t * t + 1) as Ease,
  easeInOutCubic: ((t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)) as Ease,
  easeOutBack: ((t) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }) as Ease,
};
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const MOTION = { enter: Easing.easeOutCubic, glide: Easing.easeInOutCubic, pop: Easing.easeOutBack };
const tw = (T: number, s: number, e: number, a: number, b: number, ease: Ease = MOTION.glide) =>
  a + (b - a) * ease(clamp((T - s) / (e - s), 0, 1));
type Vec = Record<string, number>;
const mix = <V extends Vec>(T: number, s: number, e: number, a: V, b: V, ease?: Ease): V => {
  const o: Vec = {};
  for (const k in a) o[k] = tw(T, s, e, a[k], b[k], ease);
  return o as V;
};

const C = { ink: "#0b0b0b", panel: "#121212", card: "#191919", line: "rgba(255,255,255,0.09)", dark: "#4a4a4a", gray: "#a9a9a9", white: "#f4f4f4" };
const P3: CSSProperties = { position: "absolute", left: 0, top: 0, transformStyle: "preserve-3d" };
const F = {
  h: 'var(--font-cormorant), "Cormorant Garamond", serif',
  ui: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, sans-serif',
};
const BRAND = "Serenod";
const HANDLE = "serenod";

function Slab({ w, h, depth, step = 1.5, radius, edge, face, children }: {
  w: number; h: number; depth: number; step?: number; radius: number; edge: string; face: CSSProperties; children?: ReactNode;
}) {
  const n = Math.max(2, Math.round(depth / step));
  return (
    <div style={{ ...P3, width: w, height: h }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{ position: 'absolute', inset: 0, borderRadius: radius, background: edge, transform: `translateZ(${-depth + (i * depth) / n}px)` }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, borderRadius: radius, overflow: 'hidden', backfaceVisibility: 'hidden', ...face }}>{children}</div>
    </div>
  );
}
const ICON = {
  heart: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z',
  chat: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z', send: 'M22 2 11 13M22 2l-7 20-4-9-9-4Z',
  repost: 'm17 2 4 4-4 4M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 0 1-4 4H3',
  chart: 'M3 3v18h18M7 16l4-5 3 3 5-7', bookmark: 'm19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z',
  monitor: 'M2 3h20v14H2zM8 21h8M12 17v4', phone: 'M7 2h10v20H7zM11 18h2', pen: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z',
  check: 'M20 6 9 17l-5-5', more: 'M5 12h.01M12 12h.01M19 12h.01', grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
};
const Icon = ({ d, color = C.white, fill = 'none', size = 14, sw = 2 }: { d: string; color?: string; fill?: string; size?: number; sw?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}><path d={d} /></svg>
);
const Card = ({ w, h, children, style }: { w: number; h: number; children: ReactNode; style?: CSSProperties }) => (
  <div style={{ width: w, height: h, borderRadius: 12, overflow: 'hidden', background: C.panel, boxShadow: '0 40px 70px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.12)', ...style }}>{children}</div>
);
const Avatar = ({ txt, bg, fg = '#fff', size = 24, ring }: { txt: string; bg: string; fg?: string; size?: number; ring?: string }) => (
  <div style={{ width: size, height: size, borderRadius: size / 2, background: bg, color: fg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: F.ui, fontWeight: 700, fontSize: size * 0.4, boxShadow: ring ? `0 0 0 2px #fff, 0 0 0 3.5px ${ring}` : 'none' }}>{txt}</div>
);
function Spark({ w, h, pts, color, fill }: { w: number; h: number; pts: number[]; color: string; fill?: string }) {
  const max = Math.max(...pts), min = Math.min(...pts);
  const xy = pts.map((p, i) => [(i / (pts.length - 1)) * w, h - ((p - min) / (max - min || 1)) * (h - 4) - 2]);
  const d = xy.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      {fill && <path d={d + ` L${w} ${h} L0 ${h} Z`} fill={fill} />}
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function Nav({ accent, active = 'Work' }: { accent: string; active?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '12px 20px', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: 5, border: `2px solid ${accent}` }} />
        <div style={{ fontFamily: F.h, fontSize: 15, color: C.white, whiteSpace: 'nowrap' }}>{BRAND}</div>
      </div>
      <div style={{ flex: 1 }} />
      {['Work', 'Services', 'Pricing', 'About'].map((l) => <div key={l} style={{ fontFamily: F.ui, fontSize: 9, color: l === active ? C.white : C.gray }}>{l}</div>)}
      <div style={{ fontFamily: F.ui, fontSize: 9, color: accent, border: `1px solid ${accent}`, borderRadius: 20, padding: '4px 10px' }}>Book a call</div>
    </div>
  );
}

// 1 · laptop home page
function Site({ accent }: { accent: string }) {
  return (
    <div style={{ width: '100%', height: '100%', background: `radial-gradient(70% 90% at 82% 25%, ${accent}1f, rgba(0,0,0,0) 60%), #0a0a0a` }}>
      <Nav accent={accent} />
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 20, padding: '26px 22px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <div style={{ fontFamily: F.ui, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent }}>Web design · Social media</div>
          <div style={{ fontFamily: F.h, fontSize: 33, lineHeight: 1.0, color: C.white }}>Websites that book.<br />Socials that <em style={{ color: accent }}>sell.</em></div>
          <div style={{ fontFamily: F.ui, fontSize: 9, lineHeight: 1.5, color: C.gray, maxWidth: 240 }}>We design fast, conversion-focused websites and run the social channels that send people to them.</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 9, color: '#0a0a0a', background: accent, borderRadius: 20, padding: '6px 12px' }}>Get a free audit</div>
            <div style={{ fontFamily: F.ui, fontSize: 9, color: C.white, border: `1px solid ${C.dark}`, borderRadius: 20, padding: '6px 12px' }}>See our work</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <div style={{ display: 'flex' }}>
              {[['HC', '#c9773b'], ['AV', '#3b6ec9'], ['LM', '#8a3bc9']].map(([t, b], i) => <div key={t} style={{ marginLeft: i ? -6 : 0 }}><Avatar txt={t} bg={b} size={18} /></div>)}
            </div>
            <div style={{ fontFamily: F.ui, fontSize: 8, color: C.gray }}>Trusted by 120+ local brands · 4.9★ on Google</div>
          </div>
        </div>
        <div style={{ position: 'relative', height: 222 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, right: 26, padding: 12, borderRadius: 10, background: C.card, border: `1px solid ${C.line}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.ui, fontSize: 8, color: C.gray }}><span>Instagram reach · last 30 days</span><span style={{ color: accent }}>+212%</span></div>
            <div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 20, color: C.white, margin: '4px 0 6px' }}>184,302</div>
            <Spark w={238} h={64} pts={[12, 14, 13, 18, 17, 22, 21, 27, 30, 29, 36, 41, 39, 48, 55]} color={accent} fill={accent + '22'} />
          </div>
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: 180, padding: 10, borderRadius: 10, background: '#1f1f1f', border: `1px solid ${C.line}`, boxShadow: '0 16px 30px rgba(0,0,0,0.5)' }}>
            <div style={{ fontFamily: F.ui, fontSize: 8, color: C.gray }}>New website · Harbour Coffee</div>
            <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
              <div><div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 15, color: C.white }}>0.9s</div><div style={{ fontFamily: F.ui, fontSize: 7, color: C.gray }}>Load time</div></div>
              <div><div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 15, color: accent }}>+41%</div><div style={{ fontFamily: F.ui, fontSize: 7, color: C.gray }}>Bookings</div></div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '22px 22px 0', paddingTop: 14, borderTop: `1px solid ${C.line}` }}>
        {['HARBOUR', 'Aveline', 'LUMEN', 'Oak & Ivy', 'FIELDWORK'].map((l, i) => (
          <div key={l} style={{ fontFamily: i % 2 ? F.h : F.ui, fontStyle: i % 2 ? 'italic' : 'normal', fontWeight: i % 2 ? 500 : 700, letterSpacing: i % 2 ? 0 : '0.14em', fontSize: i % 2 ? 15 : 10, color: '#7c7c7c' }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

// 2 · stack: services
function LayerServices({ accent }: { accent: string }) {
  const S: [string, string, string, string][] = [
    [ICON.monitor, 'Website design', 'Custom sites built to load fast and turn visitors into enquiries.', 'from $2,400'],
    [ICON.phone, 'Social media management', 'Strategy, content and community management across 3 platforms.', 'from $900/mo'],
    [ICON.pen, 'Content & branding', 'Photo, short-form video and brand identity that looks like you.', 'from $650'],
  ];
  return (
    <Card w={664} h={410} style={{ background: '#0f0f0f' }}>
      <Nav accent={accent} active="Services" />
      <div style={{ padding: '22px 22px 0', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: F.h, fontSize: 28, color: C.white }}>What we do</div>
        <div style={{ fontFamily: F.ui, fontSize: 9, color: C.gray }}>Monthly plans · no lock-in</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, padding: 22 }}>
        {S.map(([ic, t, d, p]) => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 14, height: 222, boxSizing: 'border-box', borderRadius: 10, background: C.card, border: `1px solid ${C.line}` }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon d={ic} color={accent} size={15} /></div>
            <div style={{ fontFamily: F.h, fontSize: 18, color: C.white, lineHeight: 1.1 }}>{t}</div>
            <div style={{ fontFamily: F.ui, fontSize: 9, lineHeight: 1.5, color: C.gray }}>{d}</div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: `1px solid ${C.line}` }}>
              <div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 10, color: C.white }}>{p}</div>
              <div style={{ fontFamily: F.ui, fontSize: 9, color: accent }}>Learn more →</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// 3 · stack: content calendar
function LayerCalendar({ accent }: { accent: string }) {
  const days = ['Mon 14', 'Tue 15', 'Wed 16', 'Thu 17', 'Fri 18'];
  const posts: [string, string, number][][] = [
    [['IG', 'Reel · Latte art in 15s', 1], ['FB', 'Weekend hours update', 1]],
    [['IG', 'Carousel · New autumn menu', 1]],
    [['TT', 'Behind the bar with Sam', 0], ['IG', 'Story · Poll: oat or almond?', 0]],
    [['IG', 'Customer spotlight', 0]],
    [['FB', 'Event · Live music Friday', 0], ['IG', 'Reel · Friday pour-over', 0]],
  ];
  const tag: Record<string, string> = { IG: '#e1306c', FB: '#1877f2', TT: '#f4f4f4' };
  return (
    <Card w={664} h={410} style={{ background: '#0d0d0d' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderBottom: `1px solid ${C.line}` }}>
        <Icon d={ICON.grid} color={accent} size={13} />
        <div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 11, color: C.white }}>Content calendar</div>
        <div style={{ fontFamily: F.ui, fontSize: 9, color: C.gray }}>Harbour Coffee Co. · October</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: F.ui, fontSize: 9, color: '#0a0a0a', background: accent, borderRadius: 6, padding: '4px 9px', fontWeight: 600 }}>+ New post</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, padding: 16 }}>
        {days.map((d, i) => (
          <div key={d} style={{ display: 'flex', flexDirection: 'column', gap: 7, minHeight: 320, padding: 8, borderRadius: 8, background: i === 1 ? '#161a14' : C.card, border: `1px solid ${i === 1 ? accent + '66' : C.line}` }}>
            <div style={{ fontFamily: F.ui, fontSize: 9, color: i === 1 ? accent : C.gray }}>{d}</div>
            {posts[i].map(([n, t, done]) => (
              <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 7, borderRadius: 6, background: '#222', borderLeft: `2px solid ${tag[n]}` }}>
                <div style={{ fontFamily: F.ui, fontSize: 8, color: C.white, lineHeight: 1.35 }}>{t}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: 3, background: done ? accent : '#777' }} />
                  <div style={{ fontFamily: F.ui, fontSize: 7, color: C.gray }}>{done ? 'Published' : 'Scheduled'}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}

// 4 · stack: monthly report
function LayerReport({ accent }: { accent: string }) {
  const kpi = [['Followers', '18.4K', '+1,203'], ['Engagement', '6.8%', '+2.1 pts'], ['Website visits', '9,412', '+38%'], ['Enquiries', '146', '+52%']];
  const bars = [32, 41, 38, 52, 47, 61, 58, 72, 69, 84, 80, 96];
  return (
    <Card w={664} h={410} style={{ background: '#0c0c0c' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderBottom: `1px solid ${C.line}` }}>
        <Icon d={ICON.chart} color={accent} size={13} />
        <div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 11, color: C.white }}>Monthly report</div>
        <div style={{ fontFamily: F.ui, fontSize: 9, color: C.gray }}>September 2026</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: F.ui, fontSize: 9, color: C.gray, border: `1px solid ${C.line}`, borderRadius: 6, padding: '4px 9px' }}>Export PDF</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, padding: '16px 18px 0' }}>
        {kpi.map(([l, v, d]) => (
          <div key={l} style={{ padding: 10, borderRadius: 8, background: C.card, border: `1px solid ${C.line}` }}>
            <div style={{ fontFamily: F.ui, fontSize: 8, color: C.gray }}>{l}</div>
            <div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 18, color: C.white, margin: '4px 0 2px' }}>{v}</div>
            <div style={{ fontFamily: F.ui, fontSize: 8, color: accent }}>{d}</div>
          </div>
        ))}
      </div>
      <div style={{ margin: '12px 18px', padding: 12, borderRadius: 8, background: C.card, border: `1px solid ${C.line}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.ui, fontSize: 8, color: C.gray, marginBottom: 10 }}><span>Website visits from social · weekly</span><span>12 weeks</span></div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 9, height: 160 }}>
          {bars.map((b, i) => <div key={i} style={{ flex: 1, height: `${b}%`, borderRadius: '3px 3px 0 0', background: i === bars.length - 1 ? accent : '#3a3a3a' }} />)}
        </div>
      </div>
    </Card>
  );
}

// floating right page · case study
function CaseStudy({ accent }: { accent: string }) {
  return (
    <Card w={664} h={410} style={{ background: '#0e0e0e' }}>
      <Nav accent={accent} active="Work" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, padding: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontFamily: F.ui, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent }}>Case study</div>
          <div style={{ fontFamily: F.h, fontSize: 30, lineHeight: 1.02, color: C.white }}>Harbour Coffee Co.</div>
          <div style={{ fontFamily: F.ui, fontSize: 9.5, lineHeight: 1.55, color: C.gray }}>A new booking-first website and a 3-posts-a-week Instagram plan for a two-location café in Portland, Maine.</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Web design', 'Instagram', 'Photography'].map((t) => <div key={t} style={{ fontFamily: F.ui, fontSize: 8, color: C.white, border: `1px solid ${C.dark}`, borderRadius: 12, padding: '3px 8px' }}>{t}</div>)}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[['+41%', 'Table bookings'], ['0.9s', 'Page load'], ['3.2×', 'Instagram reach'], ['+2,800', 'New followers']].map(([v, l], i) => (
            <div key={l} style={{ padding: 12, borderRadius: 8, background: C.card, border: `1px solid ${C.line}` }}>
              <div style={{ fontFamily: F.h, fontSize: 30, color: i === 0 ? accent : C.white, lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: F.ui, fontSize: 8, color: C.gray, marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ margin: '0 22px', padding: '12px 14px', borderRadius: 8, borderLeft: `2px solid ${accent}`, background: '#151515' }}>
        <div style={{ fontFamily: F.h, fontStyle: 'italic', fontSize: 15, color: C.white }}>“Our weekend tables now fill up by Thursday.”</div>
        <div style={{ fontFamily: F.ui, fontSize: 8, color: C.gray, marginTop: 4 }}>Dana Ruiz, Owner</div>
      </div>
    </Card>
  );
}

// social cards
function XPost({ accent }: { accent: string }) {
  return (
    <Card w={330} h={170} style={{ background: '#ffffff', padding: '12px 14px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar txt="EX" bg="#0f0f0f" fg={accent} size={30} />
        <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: F.ui, fontWeight: 700, fontSize: 12, color: '#0f1419', whiteSpace: 'nowrap' }}>{BRAND}
            <svg width="12" height="12" viewBox="0 0 24 24"><path fill="#1d9bf0" d="M12 1.5 14.6 4l3.5-.4.9 3.4 3 1.9-1.4 3.2 1.4 3.2-3 1.9-.9 3.4-3.5-.4L12 22.5 9.4 20l-3.5.4-.9-3.4-3-1.9L3.4 12 2 8.8l3-1.9.9-3.4 3.5.4Z" /><path d="m8 12 3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" /></svg>
          </div>
          <div style={{ fontFamily: F.ui, fontSize: 10.5, color: '#536471' }}>@{HANDLE} · 2h</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: F.ui, fontWeight: 800, fontSize: 15, color: '#0f1419' }}>𝕏</div>
      </div>
      <div style={{ fontFamily: F.ui, fontSize: 11.5, lineHeight: 1.4, color: '#0f1419' }}>New site for <span style={{ color: '#1d9bf0' }}>@harbourcoffee</span> is live. Load time down to 0.9s and table bookings up 41% in week one.</div>
      <div style={{ display: 'flex', gap: 22, marginTop: 'auto' }}>
        {[[ICON.chat, '24'], [ICON.repost, '118'], [ICON.heart, '1.2K'], [ICON.chart, '38K']].map(([d, n]) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon d={d} color="#536471" size={13} /><span style={{ fontFamily: F.ui, fontSize: 10, color: '#536471' }}>{n}</span></div>
        ))}
      </div>
    </Card>
  );
}
function IGPost({ liked }: { liked: number }) {
  return (
    <Card w={300} h={360} style={{ background: '#ffffff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px' }}>
        <Avatar txt="HC" bg="#c9773b" size={24} ring="#d62976" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 11, color: '#111' }}>harbourcoffee</div>
          <div style={{ fontFamily: F.ui, fontSize: 9, color: '#555' }}>Portland, Maine</div>
        </div>
        <div style={{ flex: 1 }} />
        <Icon d={ICON.more} color="#111" size={16} sw={3} />
      </div>
      <div style={{ position: 'relative', height: 220, background: '#1c1a17', padding: 20, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: F.ui, fontSize: 9, letterSpacing: '0.2em', color: '#d9b48a' }}>NEW · AUTUMN MENU</div>
        <div style={{ fontFamily: F.h, fontSize: 34, lineHeight: 0.98, color: '#f6efe6' }}>Maple oat<br />latte is <em style={{ color: '#d9b48a' }}>back.</em></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontFamily: F.ui, fontSize: 9, color: '#bfb3a5' }}>Both locations · from Oct 1</div>
          <div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 13, color: '#1c1a17', background: '#d9b48a', borderRadius: 14, padding: '4px 10px' }}>$5.25</div>
        </div>
        <div style={{ position: 'absolute', right: 10, top: 10, fontFamily: F.ui, fontSize: 9, color: '#fff', background: 'rgba(0,0,0,0.55)', borderRadius: 10, padding: '2px 7px' }}>1/4</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 11px 6px' }}>
        <div style={{ position: 'relative', width: 18, height: 18 }}>
          <Icon d={ICON.heart} size={18} color="#111" />
          <div style={{ position: 'absolute', inset: 0, transform: `scale(${liked})` }}><Icon d={ICON.heart} size={18} color="#ff3040" fill="#ff3040" /></div>
        </div>
        <Icon d={ICON.chat} size={18} color="#111" /><Icon d={ICON.send} size={18} color="#111" />
        <div style={{ flex: 1 }} />
        <Icon d={ICON.bookmark} size={18} color="#111" />
      </div>
      <div style={{ padding: '0 11px', fontFamily: F.ui, fontSize: 10.5, color: '#111', lineHeight: 1.4 }}>
        <div style={{ fontWeight: 600 }}>2,184 likes</div>
        <div><b>harbourcoffee</b> It's that time again 🍁</div>
      </div>
    </Card>
  );
}
function Notify({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 320, padding: '12px 14px', borderRadius: 16, background: 'rgba(58,62,60,0.9)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.14)', boxSizing: 'border-box' }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="#fff" /></svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 12.5, color: C.white, whiteSpace: 'nowrap' }}>{title}</div>
          <div style={{ fontFamily: F.ui, fontSize: 10, color: C.gray }}>now</div>
        </div>
        <div style={{ fontFamily: F.ui, fontSize: 10, color: '#c9c9c9' }}>{sub}</div>
      </div>
    </div>
  );
}
function FBCard() {
  return (
    <div style={{ width: 340, padding: 14, borderRadius: 14, background: 'rgba(240,242,245,0.94)', boxShadow: '0 24px 40px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.6)',
      display: 'flex', flexDirection: 'column', gap: 10, boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 22, height: 22, borderRadius: 11, background: '#1877f2', color: '#fff', fontFamily: 'Arial', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>f</div>
        <div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 12, color: '#050505', whiteSpace: 'nowrap' }}>New page review</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: F.ui, fontSize: 10, color: '#65676b' }}>5m</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, background: '#fff' }}>
        <Avatar txt="MK" bg="#3b6ec9" size={28} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ fontFamily: F.ui, fontSize: 10.5, color: '#050505' }}><b>A client</b> recommends Serenod</div>
          <div style={{ fontFamily: F.ui, fontSize: 10, color: '#f5a623', letterSpacing: 1 }}>★★★★★</div>
        </div>
      </div>
    </div>
  );
}

// phone · agency Instagram profile
function Phone({ accent, T = 0, unlock = 1 }: { accent: string; T?: number; unlock?: number }) {
  const W = 200, H = 412;
  const tiles = [
    { bg: '#0f0f0f', el: <div style={{ fontFamily: F.h, fontSize: 13, color: accent, lineHeight: 1 }}>0.9s</div> },
    { bg: '#e9e4dc', el: <div style={{ fontFamily: F.h, fontStyle: 'italic', fontSize: 10, color: '#222', lineHeight: 1.05 }}>“Tables full by Thursday.”</div> },
    { bg: accent, el: <div style={{ fontFamily: F.ui, fontWeight: 800, fontSize: 9, color: '#0a0a0a', lineHeight: 1.05 }}>5 SITE<br />MISTAKES</div> },
    { bg: '#1c1a17', el: <div style={{ fontFamily: F.h, fontSize: 10, color: '#d9b48a', lineHeight: 1.05 }}>Harbour<br />Coffee</div> },
    { bg: '#2a2a2a', el: <div style={{ fontFamily: F.ui, fontWeight: 700, fontSize: 12, color: C.white }}>+41%</div> },
    { bg: '#dfe7f1', el: <div style={{ fontFamily: F.ui, fontWeight: 700, fontSize: 8, color: '#1e3a5f', lineHeight: 1.1 }}>Reels vs<br />Posts</div> },
  ];
  return (
    <div style={{ position: 'absolute', left: -W / 2, top: -H / 2, transformStyle: 'preserve-3d' }}>
      {[[96, 34], [140, 34]].map(([y, h], i) => <div key={'l' + i} style={{ position: 'absolute', left: -2.5, top: y, width: 4, height: h, borderRadius: 2, background: 'linear-gradient(90deg,#4a4c50,#8d9095)', transform: 'translateZ(-5px)' }} />)}
      <div style={{ position: 'absolute', left: -2.5, top: 64, width: 4, height: 18, borderRadius: 2, background: 'linear-gradient(90deg,#4a4c50,#8d9095)', transform: 'translateZ(-5px)' }} />
      <div style={{ position: 'absolute', right: -2.5, top: 118, width: 4, height: 56, borderRadius: 2, background: 'linear-gradient(90deg,#8d9095,#4a4c50)', transform: 'translateZ(-5px)' }} />
      <Slab w={W} h={H} depth={9} step={1} radius={34} edge="linear-gradient(90deg,#3e4044,#a6a9ad 30%,#6f7276 55%,#b4b7bb 80%,#3e4044)"
        face={{ background: 'linear-gradient(135deg,#8f9296,#5d6064 50%,#9a9da1)', padding: 2.5, boxSizing: 'border-box' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 32, background: '#000', padding: 5.5, boxSizing: 'border-box' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 27, overflow: 'hidden', background: '#000' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px 0 20px', fontFamily: F.ui, fontWeight: 600, fontSize: 9.5, color: '#fff' }}>
            <span>9:41</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <svg width="13" height="8" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="#fff" /><rect x="4.5" y="5" width="3" height="6" rx="1" fill="#fff" /><rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#fff" /><rect x="13.5" y="0" width="3" height="11" rx="1" fill="#fff" /></svg>
              <svg width="11" height="8" viewBox="0 0 16 11"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.1-1.1A10 10 0 0 0 8 .6 10 10 0 0 0 .9 3.5L2 4.6a8.5 8.5 0 0 1 6-2.4Zm0 3.3c1.4 0 2.6.5 3.6 1.4l1.1-1.1A6.7 6.7 0 0 0 8 3.9a6.7 6.7 0 0 0-4.7 1.9l1.1 1.1c1-.9 2.2-1.4 3.6-1.4Zm0 3.3c-.5 0-1 .2-1.3.5L8 10.6l1.3-1.3A1.9 1.9 0 0 0 8 8.8Z" fill="#fff" /></svg>
              <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <div style={{ width: 17, height: 8, borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.45)', padding: 1, boxSizing: 'border-box' }}><div style={{ width: '78%', height: '100%', borderRadius: 1, background: '#fff' }} /></div>
                <div style={{ width: 1.5, height: 3, borderRadius: 1, background: 'rgba(255,255,255,0.45)' }} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '16px 12px 8px', fontFamily: F.ui, fontWeight: 700, fontSize: 11, color: '#fff' }}>{HANDLE}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px' }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: '#0f0f0f', border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, border: `2.5px solid ${accent}` }} />
            </div>
            {[['248', 'posts'], ['18.4K', 'followers'], ['312', 'following']].map(([n, l]) => (
              <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{ fontFamily: F.ui, fontWeight: 700, fontSize: 10, color: '#fff' }}>{n}</div>
                <div style={{ fontFamily: F.ui, fontSize: 7, color: '#ccc' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '8px 12px 0', fontFamily: F.ui, fontSize: 7.5, lineHeight: 1.4, color: '#eee' }}>
            <div style={{ fontWeight: 700 }}>{BRAND}</div>
            <div>Websites, apps, SEO &amp; POS.<br />Free site audit ↓</div>
            <div style={{ color: '#a8c7ff' }}>Built in Sri Lanka</div>
          </div>
          <div style={{ display: 'flex', gap: 4, padding: '8px 12px' }}>
            <div style={{ flex: 1, textAlign: 'center', fontFamily: F.ui, fontWeight: 600, fontSize: 7.5, color: '#fff', background: '#262626', borderRadius: 5, padding: '5px 0' }}>Following</div>
            <div style={{ flex: 1, textAlign: 'center', fontFamily: F.ui, fontWeight: 600, fontSize: 7.5, color: '#0a0a0a', background: accent, borderRadius: 5, padding: '5px 0' }}>Message</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, marginTop: 4 }}>
            {tiles.map((t, i) => <div key={i} style={{ height: 78, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6, boxSizing: 'border-box', textAlign: 'center' }}>{t.el}</div>)}
          </div>
          {unlock < 1 && (
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', transform: `translateY(${-100 * unlock}%)`, opacity: 1 - unlock * 0.4 }}>
              <div style={{ width: 438, height: 943, transform: 'scale(0.42)', transformOrigin: '0 0' }}><LockScreen T={T} accent={accent} /></div>
            </div>
          )}
          <div style={{ position: 'absolute', left: '50%', top: 8, width: 58, height: 17, marginLeft: -29, borderRadius: 9, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 6, boxSizing: 'border-box' }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: 'radial-gradient(circle at 35% 35%, #2c3a55, #05070c 70%)' }} />
          </div>
          <div style={{ position: 'absolute', left: '50%', bottom: 5, width: 64, height: 3.5, marginLeft: -32, borderRadius: 2, background: 'rgba(255,255,255,0.85)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(125deg, rgba(255,255,255,0.13), rgba(255,255,255,0.02) 40%, rgba(255,255,255,0) 41%)' }} />
          <Sheen T={T} op={0.16} width={45} delay={-0.1} />
        </div>
        </div>
      </Slab>
    </div>
  );
}

const BW = 700, BD = 470, LH = 450, LID = 10;
// light sweeps across the glass: [start, duration] — fixed by the scene cues
const SWEEPS = [[INTRO_CUES.Float + 0.15, 1.1], [INTRO_CUES.Burst + 0.95, 0.9], [INTRO_CUES.Return + 1.15, 1.2]];
function Sheen({ T, op = 0.16, angle = 105, width = 34, delay = 0 }: { T: number; op?: number; angle?: number; width?: number; delay?: number }) {
  let pos = null;
  for (const [t0, d] of SWEEPS) { const k = (T - t0 - delay) / d; if (k > 0 && k < 1) { pos = MOTION.glide(k); break; } }
  if (pos === null) return null;
  return <div style={{ position: 'absolute', top: '-20%', bottom: '-20%', left: `${-width + pos * (100 + width)}%`, width: `${width}%`, pointerEvents: 'none',
    background: `linear-gradient(${angle - 90}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${op}) 50%, rgba(255,255,255,0) 100%)`, transform: `skewX(${-(angle - 90)}deg)` }} />;
}
const ALU = { face: 'linear-gradient(172deg,#d9dce0 0%,#c3c7cc 40%,#a9adb3 100%)', edge: 'linear-gradient(90deg,#8e9298,#e4e7ea 50%,#8e9298)', rim: '#b9bdc2' };
const KEYROWS: (number | 'arrows')[][] = [
  Array.from({ length: 14 }, (_, i) => (i === 0 || i === 13 ? 1.3 : 1)),
  [...Array(13).fill(1), 1.5],
  [1.5, ...Array(12).fill(1), 1],
  [1.8, ...Array(11).fill(1), 1.8],
  [2.35, ...Array(10).fill(1), 2.35],
  [1, 1, 1, 1.25, 5.1, 1.25, 1, 'arrows'],
];
function Keyboard() {
  return (
    <div style={{ position: 'absolute', left: 96, top: 46, right: 96, height: 226, display: 'flex', flexDirection: 'column', gap: 5, padding: 6, borderRadius: 6,
      background: '#9da1a7', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.35)' }}>
      {KEYROWS.map((row, r) => (
        <div key={r} style={{ display: 'flex', gap: 5, flex: r === 0 ? 0.6 : 1 }}>
          {row.map((k, i) => k === 'arrows' ? (
            <div key={i} style={{ flex: 3.1, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: '1fr 1fr', gap: 3 }}>
              {[0, 1, 0, 1, 1, 1].map((on, j) => <div key={j} style={{ borderRadius: 3, background: on ? 'linear-gradient(180deg,#1d1e20,#0b0b0c)' : 'transparent', gridRow: j < 3 ? 1 : 2 }} />)}
            </div>
          ) : (
            <div key={i} style={{ flex: k, borderRadius: 4, background: 'linear-gradient(180deg,#1f2022 0%,#0c0c0d 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), 0 1px 1px rgba(0,0,0,0.4)' }} />
          ))}
        </div>
      ))}
    </div>
  );
}
const Grille = ({ left }: { left: number }) => (
  <div style={{ position: 'absolute', left, top: 46, width: 62, height: 226, borderRadius: 4, opacity: 0.55,
    backgroundImage: 'radial-gradient(circle, #55585d 0.9px, rgba(0,0,0,0) 1.2px)', backgroundSize: '4px 4px' }} />
);
function Laptop({ T, accent }: { T: number; accent: string }) {
  return (
    <div style={{ ...P3 }}>
      <div style={{ position: 'absolute', left: -BW * 0.75, top: -BD * 0.7, width: BW * 1.5, height: BD * 1.4, borderRadius: '50%',
        transform: 'translateY(260px) rotateX(90deg)', background: 'radial-gradient(closest-side, rgba(0,0,0,0.75), rgba(0,0,0,0))' }} />
      <div style={{ position: 'absolute', left: -BW * 0.8, top: -BD * 0.3, width: BW * 1.6, height: BD * 1.4, borderRadius: '50%',
        transform: 'translateY(258px) rotateX(90deg)', background: `radial-gradient(closest-side, ${accent}14, rgba(0,0,0,0))` }} />
      <div style={{ position: 'absolute', left: -BW * 0.45, top: -BD * 0.2, width: BW * 0.9, height: BD * 0.55, borderRadius: '50%',
        transform: 'translateY(257px) rotateX(90deg)', background: `radial-gradient(closest-side, rgba(220,240,225,0.10), ${accent}10 55%, rgba(0,0,0,0))` }} />
      <div style={{ position: 'absolute', left: -BW * 0.36, top: -BD * 0.62, width: BW * 0.72, height: BD * 0.5,
        transform: 'translateY(257px) rotateX(90deg)', background: `linear-gradient(180deg, rgba(0,0,0,0), ${accent}0d 60%, rgba(0,0,0,0))`, filter: 'blur(14px)' }} />
      {/* base */}
      <div style={{ ...P3, transform: 'rotateX(90deg)' }}>
        <div style={{ ...P3, left: -BW / 2, top: -BD / 2 }}>
          <Slab w={BW} h={BD} depth={12} step={1.2} radius={16} edge={ALU.edge}
            face={{ background: ALU.face, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.15)' }}>
            {/* hinge shadow at the back */}
            <div style={{ position: 'absolute', left: 30, right: 30, top: 0, height: 14, background: 'linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0))' }} />
            <Grille left={26} /><Grille left={BW - 88} />
            <Keyboard />
            <div style={{ position: 'absolute', left: BW / 2 - 165, top: 290, width: 330, height: 162, borderRadius: 10,
              background: 'linear-gradient(170deg,#ced1d6,#b5b9be)', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.6)' }} />
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(110% 55% at 50% -5%, ${accent}22, rgba(0,0,0,0) 60%)` }} />
            <Sheen T={T} op={0.28} width={26} delay={0.12} />
          </Slab>
          {/* front thumb scoop */}
          <div style={{ position: 'absolute', left: BW / 2 - 50, top: BD - 3, width: 100, height: 6, borderRadius: '0 0 50px 50px', background: 'linear-gradient(180deg,#7d8187,#a6aab0)' }} />
        </div>
      </div>
      {/* hinge barrel */}
      <div style={{ position: 'absolute', left: -BW / 2 + 40, top: -10, width: BW - 80, height: 12, borderRadius: 6,
        transform: `translateZ(${-BD / 2 + 4}px)`, background: 'linear-gradient(180deg,#2a2b2d,#0e0e0f 60%,#3a3b3e)' }} />
      {/* lid */}
      <div style={{ ...P3, transform: `translateY(-2px) translateZ(${-BD / 2 + 10}px) rotateX(${LID}deg)` }}>
        <div style={{ ...P3, left: -BW / 2, top: -LH }}>
          <Slab w={BW} h={LH} depth={6} step={1.2} radius={18} edge={ALU.edge}
            face={{ background: ALU.rim, padding: 2.5, boxSizing: 'border-box', position: 'absolute' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 16, background: '#040404', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 15.5, top: 15.5, width: 664, height: 410, borderRadius: '8px 8px 4px 4px', overflow: 'hidden' }}>
                <Site accent={accent} />
              </div>
              {/* camera notch */}
              <div style={{ position: 'absolute', left: BW / 2 - 2.5 - 46, top: 0, width: 92, height: 22, borderRadius: '0 0 9px 9px', background: '#040404',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: 'radial-gradient(circle at 35% 35%, #3a4a66, #0a0d14 70%)' }} />
              </div>
              {/* glass reflection */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(118deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.03) 38%, rgba(255,255,255,0) 39%)' }} />
              <Sheen T={T} op={0.13} />
            </div>
          </Slab>
        </div>
      </div>
    </div>
  );
}

// screen center in root space (lid at 10°)
const LIDR = LID * Math.PI / 180;
const SC = { y: -2 - 225 * Math.cos(LIDR), z: -BD / 2 + 10 - 225 * Math.sin(LIDR) + 1 };
type LayerPose = { x: number; y: number; z: number; rx: number; rz: number };
const layerXf = (p: LayerPose) => `translate3d(${p.x}px, ${p.y}px, ${p.z}px) rotateX(${p.rx}deg) rotateZ(${p.rz || 0}deg)`;

function POSCard({ accent }: { accent: string }) {
  const rows = [['Flat white × 2', '$9.00'], ['Maple oat latte', '$5.25'], ['Almond croissant', '$4.50']];
  return (
    <Card w={300} h={190} style={{ background: '#151515', padding: 14, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: 4, background: accent }} />
        <div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 12, color: C.white, whiteSpace: 'nowrap' }}>POS · Order #1048</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: F.ui, fontSize: 10, color: C.gray }}>Table 6</div>
      </div>
      {rows.map(([a, b]) => <div key={a} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.ui, fontSize: 11, color: '#cfcfcf', whiteSpace: 'nowrap', gap: 12, paddingBottom: 6, borderBottom: `1px solid ${C.line}` }}><span>{a}</span><span>{b}</span></div>)}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <div style={{ fontFamily: F.ui, fontWeight: 700, fontSize: 16, color: C.white }}>$18.75</div>
        <div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 10, color: '#0a0a0a', background: accent, borderRadius: 12, padding: '4px 10px' }}>Paid</div>
      </div>
    </Card>
  );
}
function StatCard({ accent }: { accent: string }) {
  return (
    <Card w={280} h={130} style={{ background: '#151515', padding: 14, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.ui, fontSize: 10, color: C.gray }}><span>New followers · this week</span><span style={{ color: accent }}>+38%</span></div>
      <div style={{ fontFamily: F.ui, fontWeight: 700, fontSize: 22, color: C.white }}>+1,203</div>
      <Spark w={252} h={46} pts={[8, 10, 9, 14, 13, 18, 22, 21, 28, 34]} color={accent} fill={accent + '22'} />
    </Card>
  );
}

// hook · lock screen notification storm
const HN: [string, string, string][] = [
  ['ig', 'Instagram', 'harbourcoffee and 248 others liked your reel'],
  ['pay', 'Payments', '$900.00 received · Aveline Florals'],
  ['ig', 'Instagram', 'oakandivy.studio started following you'],
  ['book', 'Bookings', 'New booking · Fri 7:30 PM · Table for 4'],
  ['web', 'Website', 'New enquiry from your website'],
  ['ig', 'Instagram', 'lumen.yoga and 1,204 others liked your post'],
  ['pay', 'Payments', '$2,400.00 received · Fieldwork Coffee'],
  ['book', 'Bookings', 'New booking · Sat 11:00 AM · Brunch for 2'],
  ['ig', 'Instagram', '38 new followers'],
  ['web', 'Website', 'New enquiry · "Can you redo our site?"'],
  ['ig', 'Instagram', 'aveline.florals liked your story'],
  ['book', 'Bookings', '6 new bookings this hour'],
  ['pay', 'Payments', '$650.00 received · Oak & Ivy'],
  ['ig', 'Instagram', 'harbourcoffee mentioned you in a post'],
  ['web', 'Website', '3 new contact form leads'],
  ['ig', 'Instagram', '112 new followers'],
  ['book', 'Bookings', 'New booking · Sun 9:00 AM · Table for 6'],
  ['pay', 'Payments', '$1,250.00 received · Lumen Yoga'],
];
const HN_T = HN.map((_, i) => 0.3 + 1.2 * Math.pow(i / HN.length, 0.62));
const HN_CLR = 1.6, HN_FIN = 1.88;
function AppIcon({ k, accent, size = 38 }: { k: string; accent: string; size?: number }) {
  const r = size * 0.24;
  const box: CSSProperties = { width: size, height: size, borderRadius: r, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' };
  if (k === 'ig') return <div style={{ ...box, background: 'linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)' }}><svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="#fff" /></svg></div>;
  if (k === 'pay') return <div style={{ ...box, background: '#635bff', color: '#fff', fontFamily: F.ui, fontWeight: 700, fontSize: size * 0.5 }}>$</div>;
  if (k === 'book') return <div style={{ ...box, background: '#34c759' }}><svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg></div>;
  if (k === 'web') return <div style={{ ...box, background: '#151515', boxShadow: `inset 0 0 0 1.5px ${accent}` }}><svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" /></svg></div>;
  return <div style={{ ...box, background: '#0f0f0f', boxShadow: `inset 0 0 0 2px ${accent}` }}><div style={{ width: size * 0.32, height: size * 0.32, borderRadius: '50%', border: `${size * 0.07}px solid ${accent}` }} /></div>;
}
function LockNote({ k, app, msg, accent, big }: { k: string; app: string; msg: string; accent: string; big?: boolean }) {
  const fs = big ? 1.3 : 1;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 * fs, padding: `${13 * fs}px ${14 * fs}px`, borderRadius: 22 * fs, boxSizing: 'border-box', width: '100%',
      background: big ? 'rgba(28,30,29,0.92)' : 'rgba(62,66,64,0.78)', boxShadow: big ? `0 24px 60px rgba(0,0,0,0.6), inset 0 0 0 1.5px ${accent}` : '0 8px 20px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)' }}>
      <AppIcon k={k} accent={accent} size={38 * fs} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 * fs, flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontFamily: F.ui, fontWeight: 600, fontSize: 15 * fs, color: '#fff', whiteSpace: 'nowrap' }}>{app}</div>
          <div style={{ fontFamily: F.ui, fontSize: 12.5 * fs, color: 'rgba(255,255,255,0.6)' }}>now</div>
        </div>
        <div style={{ fontFamily: F.ui, fontSize: 14 * fs, lineHeight: 1.3, color: 'rgba(255,255,255,0.88)', whiteSpace: big ? 'normal' : 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg}</div>
      </div>
    </div>
  );
}
function hookShake(T: number) {
  const kicks: [number, number][] = [...HN_T.map((t): [number, number] => [t, 1]), [HN_FIN, 2.2]];
  let sx = 0, sr = 0;
  kicks.forEach(([t0, a]) => { const d = T - t0; if (d > 0 && d < 0.4) { const env = Math.exp(-d * 14) * a; sx += Math.sin(d * 95) * 5 * env; sr += Math.sin(d * 80 + 1) * 0.7 * env; } });
  return { sx, sr };
}
function LockScreen({ T, accent }: { T: number; accent: string }) {
  const STEP = 88;
  const arrived = (t0: number, d = 0.2) => MOTION.enter(clamp((T - t0) / d, 0, 1));
  const clr = tw(T, HN_CLR, HN_CLR + 0.28, 0, 1, Easing.easeInCubic);
  const fin = arrived(HN_FIN, 0.34);
  const glow = tw(T, 0.2, HN_CLR, 0, 1, Easing.linear) * (1 - clr * 0.6);
  return (
        <div style={{ position: 'relative', width: 438, height: 943, overflow: 'hidden',
          background: `radial-gradient(80% 50% at 50% 100%, ${accent}33, rgba(0,0,0,0) 70%), radial-gradient(90% 60% at 30% 0%, #26302b, rgba(0,0,0,0) 70%), #0b0e0d` }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(70% 45% at 50% 60%, ${accent}26, rgba(0,0,0,0) 70%)`, opacity: glow }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 30px 0 40px', fontFamily: F.ui, fontWeight: 600, fontSize: 17, color: '#fff' }}>
            <span></span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="20" height="13" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="#fff" /><rect x="4.5" y="5" width="3" height="6" rx="1" fill="#fff" /><rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#fff" /><rect x="13.5" y="0" width="3" height="11" rx="1" fill="#fff" /></svg>
              <svg width="18" height="13" viewBox="0 0 16 11"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.1-1.1A10 10 0 0 0 8 .6 10 10 0 0 0 .9 3.5L2 4.6a8.5 8.5 0 0 1 6-2.4Zm0 3.3c1.4 0 2.6.5 3.6 1.4l1.1-1.1A6.7 6.7 0 0 0 8 3.9a6.7 6.7 0 0 0-4.7 1.9l1.1 1.1c1-.9 2.2-1.4 3.6-1.4Zm0 3.3c-.5 0-1 .2-1.3.5L8 10.6l1.3-1.3A1.9 1.9 0 0 0 8 8.8Z" fill="#fff" /></svg>
              <div style={{ width: 27, height: 13, borderRadius: 4, border: '1.5px solid rgba(255,255,255,0.45)', padding: 1.5, boxSizing: 'border-box' }}><div style={{ width: '80%', height: '100%', borderRadius: 2, background: '#fff' }} /></div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 92, textAlign: 'center', fontFamily: F.ui, fontWeight: 500, fontSize: 19, color: 'rgba(255,255,255,0.85)' }}>Monday 14 October</div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 112, textAlign: 'center', fontFamily: F.ui, fontWeight: 700, fontSize: 104, letterSpacing: -2, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>9:41</div>
          {HN.map(([k, app, msg], i) => {
            const a = arrived(HN_T[i]);
            if (a <= 0) return null;
            let push = 0;
            for (let n = i + 1; n < HN.length; n++) push += arrived(HN_T[n]);
            const y = 270 + push * STEP - (1 - a) * 46 - clr * (520 + push * 30);
            const op = a * (1 - clr) * (push > 6 ? Math.max(0, 1 - (push - 6) * 0.35) : 1);
            if (op <= 0.01) return null;
            return (
              <div key={i} style={{ position: 'absolute', left: 14, right: 14, top: y, opacity: op, transform: `scale(${0.94 + 0.06 * a - Math.min(push, 6) * 0.004})` }}>
                <LockNote k={k} app={app} msg={msg} accent={accent} />
              </div>
            );
          })}
          {fin > 0 && (
            <div style={{ position: 'absolute', left: 14, right: 14, top: 300 - (1 - fin) * 70, opacity: fin, transform: `scale(${0.9 + 0.1 * fin})` }}>
              <LockNote k="nl" app={BRAND} msg="New project booked · Harbour Coffee Co. · Website + social · $2,400" accent={accent} big />
            </div>
          )}
        </div>
  );
}

/**
 * The 3D world on a 1920×1080 stage. The studio backdrop and vignette are left to the
 * parent so they can fill any viewport while this stage is scaled to fit.
 */
export default function IntroScene({ T, accent = "#79FC32", showPhone = true }: { T: number; accent?: string; showPhone?: boolean }) {
  const { Float: F0, Burst: B, Stack: S, Return: R } = INTRO_CUES;
  const E = S + 1.35;
  const burstGlow = tw(T, B, B + 0.3, 0, 1, MOTION.enter) * (1 - tw(T, B + 0.45, B + 1.7, 0, 1, MOTION.glide)) + tw(T, R + 0.3, R + 1.3, 0, 0.35, MOTION.glide);
  const ambient = tw(T, F0 - 0.4, F0 + 0.8, 0, 1, Easing.linear) * (0.75 + 0.25 * Math.sin(T * 1.7));
  const back = tw(T, R, R + 1.3, 0, 1, MOTION.glide); // end of camera move; hold after
  const camH = { rx: 0, ry: 0, z: 0, x: 0 }, camB = { rx: -8, ry: 0, z: -300, x: 0 }, camC = { rx: -6, ry: 0, z: -220, x: 0 }, camD = { rx: -32, ry: 30, z: -420, x: 120 };
  const P0 = F0 - 0.65, P1 = F0 + 0.55; // pull-back window
  const cam = T < B ? mix(T, P0, B, camH, camB, MOTION.glide)
    : T < S ? mix(T, B, S, camB, camC, Easing.linear)
    : T < E ? mix(T, S, E, camC, camD, MOTION.glide)
    : T < R ? { ...camD, z: camD.z + (T - E) * 25 }
    : mix(T, R, R + 1.3, { ...camD, z: camD.z + (R - E) * 25 }, { rx: -7, ry: 0, z: -245, x: 0 }, MOTION.glide);
  const rig = 1 - tw(T, P0, P1, 0, 1, MOTION.glide); // 1 = phone fills frame, 0 = normal world
  const unlock = tw(T, P0 + 0.05, P0 + 0.5, 0, 1, MOTION.glide);
  const shake = hookShake(T);
  const fadeIn = tw(T, 0, 0.25, 0, 1, Easing.linear);
  const bob = Math.sin(T * 1.1) * 9 * (1 - tw(T, S, E, 0, 1) + back) * (1 - rig);
  const out = tw(T, S, S + 0.65, 0, 1, MOTION.glide) * (1 - tw(T, R + 0.3, R + 1.0, 0, 1, MOTION.enter));
  const liked = tw(T, B + 0.9, B + 1.2, 0, 1, MOTION.pop);

  const LAYERS = [<Site key="site" accent={accent} />, <LayerServices key="svc" accent={accent} />, <LayerCalendar key="cal" accent={accent} />, <LayerReport key="rep" accent={accent} />];
  const N = LAYERS.length;
  const layers = LAYERS.map((el, i) => {
    const j = N - 1 - i; // top of stack = last to leave the screen
    const screen: LayerPose = { x: 0, y: SC.y, z: SC.z + i * 0.4, rx: LID, rz: 0 };
    const flat: LayerPose = { x: 30 + j * 8, y: -110 - j * 118, z: 10 - j * 14, rx: 78, rz: 0 };
    const s0 = S + 0.05 + i * 0.1;
    const r0 = R + (N - 1 - i) * 0.08;
    const p = T < R ? mix(T, s0, s0 + 1.1, screen, flat, MOTION.glide) : mix(T, r0, r0 + 1.0, flat, screen, MOTION.glide);
    const lift = tw(T, s0, s0 + 1.1, 0, 1) * (1 - tw(T, r0, r0 + 1.0, 0, 1));
    return (
      <div key={i} style={{ position: 'absolute', left: -332, top: -205, width: 664, height: 410, opacity: T < s0 || T > R + 1.35 ? 0 : 1,
        transform: layerXf({ ...p, y: p.y + Math.sin(T * 1.3 + i) * 4 * lift }) }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 10, overflow: 'hidden',
          boxShadow: `0 ${30 * lift}px ${60 * lift}px rgba(0,0,0,${0.55 * lift}), inset 0 0 0 1px rgba(255,255,255,${0.14 * lift})` }}>{el}</div>
      </div>
    );
  });

  // floating UI around the laptop (root space)
  const fl = (i: number) => Math.sin(T * 1.6 + i * 1.9) * 7;
  type P = { x: number; y: number; z: number };
  const FLOATS: { el: ReactNode; w: number; h: number; from: P; to: P; at?: number; gone?: P; late?: number; stay?: boolean }[] = [
    { el: <XPost accent={accent} />, w: 330, h: 170, from: { x: -1500, y: -600, z: -100 }, to: { x: -640, y: -560, z: 20 }, at: B + 0.15, gone: { x: -1300, y: -700, z: -100 } },
    { el: <IGPost liked={liked} />, w: 300, h: 340, from: { x: -1700, y: -260, z: 0 }, to: { x: -790, y: -300, z: 40 }, at: B, gone: { x: -1500, y: -300, z: 0 } },
    { el: <Notify title="Reel scheduled" sub="Harbour Coffee · Tue, 9:00 AM" />, w: 300, h: 56, from: { x: 1400, y: -760, z: -200 }, to: { x: 650, y: -640, z: -40 }, at: B + 0.3, gone: { x: 360, y: -280, z: 60 }, stay: true },
    { el: <div style={{ width: 520, height: 330, borderRadius: 10, overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.12)' }}><div style={{ width: 664, height: 410, transform: 'scale(0.783)', transformOrigin: '0 0' }}><CaseStudy accent={accent} /></div></div>, w: 520, h: 330, from: { x: 1700, y: -380, z: -100 }, to: { x: 770, y: -390, z: -60 }, at: B + 0.05, gone: { x: 1500, y: -420, z: -100 } },
    { el: <FBCard />, w: 340, h: 110, from: { x: 1300, y: -40, z: 300 }, to: { x: 330, y: -110, z: 160 }, at: B + 0.45, gone: { x: 240, y: -170, z: 40 }, stay: true },
    { el: <div style={{ width: 360 }}><LockNote k="web" app="Website" msg="New enquiry · “Can you build our POS?”" accent={accent} /></div>, w: 360, h: 70, from: { x: -1400, y: 260, z: 200 }, to: { x: -720, y: 60, z: 90 }, late: 0.25, stay: true },
    { el: <POSCard accent={accent} />, w: 300, h: 190, from: { x: 1500, y: 300, z: 150 }, to: { x: 780, y: 20, z: 60 }, late: 0.35, stay: true },
    { el: <StatCard accent={accent} />, w: 280, h: 130, from: { x: -500, y: -1300, z: -200 }, to: { x: -200, y: -610, z: -160 }, late: 0.45, stay: true },
    { el: <div style={{ width: 330 }}><LockNote k="pay" app="Payments" msg="$2,400.00 received · Harbour Coffee" accent={accent} /></div>, w: 330, h: 70, from: { x: 600, y: -1300, z: -200 }, to: { x: 230, y: -650, z: -140 }, late: 0.55, stay: true },
  ];
  FLOATS.forEach((f) => { f.to = { ...f.to, x: f.to.x * 0.8, y: -230 + (f.to.y + 230) * 0.8 }; });
  FLOATS[0].to = { ...FLOATS[0].to, x: -600, y: -580 }; FLOATS[1].to = { ...FLOATS[1].to, x: -790, y: -280 }; FLOATS[5].to = { ...FLOATS[5].to, x: -640, y: 70 };
  const floats = FLOATS.map((f, i) => {
    const at = f.at ?? 0, gone = f.gone ?? f.to;
    if (f.late != null) {
      const a0 = R + f.late, k = tw(T, a0, a0 + 0.9, 0, 1, MOTION.enter);
      if (k <= 0) return null;
      const p = mix(T, a0, a0 + 0.9, f.from, f.to, MOTION.enter);
      return (
        <div key={i} style={{ position: 'absolute', left: -f.w / 2, top: -f.h / 2, opacity: k,
          transform: `translate3d(${p.x}px, ${p.y + fl(i)}px, ${p.z}px) rotateY(${-cam.ry}deg) rotateX(${-cam.rx}deg)` }}>{f.el}</div>
      );
    }
    const inn = tw(T, at, at + 0.9, 0, 1, MOTION.enter);
    const p = T < S ? mix(T, at, at + 0.9, f.from, f.to, MOTION.enter) : T < R ? mix(T, S, S + 1.15, f.to, gone, MOTION.glide) : mix(T, R + 0.15, R + 1.2, gone, f.to, MOTION.enter);
    const op = Math.min(inn, f.stay ? 1 : 1 - out);
    const face = f.stay ? (T < R ? tw(T, S, S + 1.15, 1, 0) : tw(T, R + 0.15, R + 1.2, 0, 1)) : 1; // stay billboarded until stacking, then lie with the layers
    return (
      <div key={i} style={{ position: 'absolute', left: -f.w / 2, top: -f.h / 2, opacity: op,
        transform: `translate3d(${p.x}px, ${p.y + fl(i)}px, ${p.z}px) rotateY(${-cam.ry * face}deg) rotateX(${-cam.rx * face + (1 - face) * 60}deg)` }}>{f.el}</div>
    );
  });

  const ph0 = { x: -470, y: -230, z: 120, ry: 12, rx: 0, rz: -6 }, ph1 = { x: -500, y: -190, z: 110, ry: 4, rx: 6, rz: -10 };
  const ph = T < R ? mix(T, S, E, ph0, ph1, MOTION.glide) : mix(T, R, R + 1.3, ph1, ph0, MOTION.glide);
  const phBob = Math.sin(T * 1.4 + 1) * 8;
  const ZP = 1206, YP = -213, h = rig;
  const rigXf = h <= 0 ? 'none' : `translate3d(${shake.sx * h / 2.35}px, ${YP * h}px, ${ZP * h}px) rotateZ(${(-ph.rz + shake.sr) * h}deg) rotateX(${-ph.rx * h}deg) rotateY(${-ph.ry * h}deg) translate3d(${-ph.x * h}px, ${-(ph.y + phBob) * h}px, ${-ph.z * h}px)`;
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: ambient * 0.8, background: `radial-gradient(38% 42% at 50% 46%, ${accent}1c, rgba(0,0,0,0) 72%)` }} />
      <div style={{ position: 'absolute', inset: 0, opacity: burstGlow, background: `radial-gradient(42% 48% at 50% 45%, ${accent}38, ${accent}10 45%, rgba(0,0,0,0) 75%)` }} />
      <div style={{ position: 'absolute', inset: 0, perspective: 2100, perspectiveOrigin: '50% 40%', opacity: fadeIn }}>
        <div style={{ ...P3, left: '50%', top: `${tw(T, S, E, 64, 74) - 10 * back}%`, transform: `translateX(${cam.x}px) translateZ(${cam.z}px) rotateX(${cam.rx}deg) rotateY(${cam.ry}deg) translateY(${bob}px)` }}>
          <div style={{ ...P3, transform: rigXf }}>
          <div style={{ ...P3, transform: `translate3d(${900 * h}px, 0, ${-400 * h}px)` }}><Laptop T={T} accent={accent} /></div>
          {layers.slice().reverse()}
          {showPhone && (
            <div style={{ ...P3, transform: `translate3d(${ph.x}px, ${ph.y + phBob}px, ${ph.z}px) rotateY(${ph.ry}deg) rotateX(${ph.rx}deg) rotateZ(${ph.rz}deg)` }}>
              <Phone accent={accent} T={T} unlock={unlock} />
            </div>
          )}
          {floats}
          </div>
        </div>
      </div>
    </div>
  );
}
