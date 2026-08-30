"use client";

import { useEffect, useState } from "react";
import { BODY_FRAME_SVG, isSelectableBodyPart } from "@/constants/diagnosis";
import type { BodySide } from "@/interfaces/diagnosis";
import { cn } from "@/lib/utils";

interface ParsedFrame {
  viewBox: string;
  paths: { id: string; d: string; fillRule: string }[];
}

/**
 * The source SVGs ship with arbitrary per-path fills (#000000, #00aa00, ...)
 * left over from the design tool, so we parse out just the geometry and paint
 * it ourselves rather than inlining the markup as-is.
 */
const parseFrame = (svgText: string): ParsedFrame => {
  const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
  const svg = doc.querySelector("svg");

  const paths = Array.from(doc.querySelectorAll("path"))
    .map((path) => ({
      id: path.getAttribute("id") ?? "",
      d: path.getAttribute("d") ?? "",
      fillRule: path.getAttribute("fill-rule") ?? "nonzero",
    }))
    .filter((path) => path.id && path.d && isSelectableBodyPart(path.id));

  return {
    viewBox: svg?.getAttribute("viewBox") ?? "0 0 100 100",
    paths,
  };
};

/** Parsed once per side and reused, so toggling Front/Back never refetches. */
const frameCache = new Map<BodySide, ParsedFrame>();

interface BodyPartSelectorProps {
  side: BodySide;
  selectedIds: string[];
  onToggle: (id: string) => void;
}

const BodyPartSelector = ({
  side,
  selectedIds,
  onToggle,
}: BodyPartSelectorProps) => {
  const [frame, setFrame] = useState<ParsedFrame | null>(
    () => frameCache.get(side) ?? null
  );

  useEffect(() => {
    const cached = frameCache.get(side);
    if (cached) {
      setFrame(cached);
      return;
    }

    let cancelled = false;
    setFrame(null);

    fetch(BODY_FRAME_SVG[side])
      .then((res) => res.text())
      .then((text) => {
        const parsed = parseFrame(text);
        frameCache.set(side, parsed);
        if (!cancelled) setFrame(parsed);
      })
      .catch(() => {
        if (!cancelled) setFrame(null);
      });

    return () => {
      cancelled = true;
    };
  }, [side]);

  if (!frame) {
    return (
      <div className='flex h-[420px] items-center justify-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent' />
      </div>
    );
  }

  return (
    <svg
      viewBox={frame.viewBox}
      className='mx-auto h-[420px] w-full max-w-[280px] touch-manipulation'
      role='group'
      aria-label={`Select affected areas on the ${side} of the body`}
    >
      {frame.paths.map((path) => {
        const isSelected = selectedIds.includes(path.id);
        return (
          <path
            key={path.id}
            d={path.d}
            fillRule={path.fillRule as "evenodd" | "nonzero"}
            onClick={() => onToggle(path.id)}
            className={cn(
              "cursor-pointer transition-colors",
              isSelected
                ? "fill-primary stroke-primary"
                : "fill-[#C7CBE8] stroke-white hover:fill-[#AEB4DC]"
            )}
            strokeWidth={0.01}
          />
        );
      })}
    </svg>
  );
};

export default BodyPartSelector;
