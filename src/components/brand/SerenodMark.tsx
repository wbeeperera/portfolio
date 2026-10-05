import { useId, type SVGProps } from "react";

// The Serenod emblem (the "N"), shared by the loader and the navbar so the
// loader's logo can land exactly on the navbar's.
export const MARK_W = 507;
export const MARK_H = 685;
export const MARK_LEFT = "0,195 380,0 380,150 140,280 140,540 0,615";
export const MARK_RIGHT = "282,285 507,165 507,565 282,685";

export function MarkGradients({ idL, idR }: { idL: string; idR: string }) {
  return (
    <>
      <linearGradient id={idL} x1="380" y1="0" x2="20" y2="615" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ecff80" />
        <stop offset="0.45" stopColor="#8cff2c" />
        <stop offset="0.75" stopColor="#3fd41a" />
        <stop offset="1" stopColor="#065c10" />
      </linearGradient>
      <linearGradient id={idR} x1="507" y1="165" x2="282" y2="685" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#034a0c" />
        <stop offset="0.55" stopColor="#6cff1e" />
        <stop offset="1" stopColor="#dcff70" />
      </linearGradient>
    </>
  );
}

export default function SerenodMark(props: SVGProps<SVGSVGElement>) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox={`0 0 ${MARK_W} ${MARK_H}`} overflow="visible" aria-hidden="true" {...props}>
      <defs>
        <MarkGradients idL={`${id}L`} idR={`${id}R`} />
      </defs>
      <polygon points={MARK_LEFT} fill={`url(#${id}L)`} stroke={`url(#${id}L)`} strokeWidth="10" strokeLinejoin="round" />
      <polygon points={MARK_RIGHT} fill={`url(#${id}R)`} stroke={`url(#${id}R)`} strokeWidth="10" strokeLinejoin="round" />
    </svg>
  );
}
