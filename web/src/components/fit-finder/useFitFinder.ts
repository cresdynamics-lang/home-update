"use client";

import { useEffect, useMemo, useState } from "react";

export type FitRoomType = "Dining Room" | "Living Room / Sofa" | "Covered Balcony" | "Both";
export type FitFloorType = "Cream tiles" | "Grey tiles" | "Wood floor" | "Dark tiles";

export function useFitFinder() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [roomType, setRoomType] = useState<FitRoomType>("Dining Room");
  const [length, setLength] = useState(4);
  const [width, setWidth] = useState(3);
  const [floorType, setFloorType] = useState<FitFloorType>("Cream tiles");

  const recommendation = useMemo(() => {
    const roomArea = length * width;
    if (roomType === "Dining Room" || roomType === "Both") {
      if (roomArea < 12) {
        return "A 4-seater round (110 cm) or compact 6-seater (160 x 90 cm) will keep the 90 cm walking clearance you need.";
      }
      return "A 6-seater or 8-seater table can fit comfortably if you keep a 90 cm walk path around it.";
    }
    if (roomArea < 10) {
      return "Choose a compact L-shape around 220 x 150 cm to preserve the walkway and keep the room feeling open.";
    }
    return "A larger modular sectional can work if the room keeps at least one clear circulation path across the room.";
  }, [length, width, roomType]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollRatio = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      if (scrollRatio > 0.4) {
        setIsOpen(true);
      }
    };

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) setIsOpen(true);
    };

    const idleTimer = window.setTimeout(() => setIsOpen(true), 20000);

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return {
    isOpen,
    step,
    roomType,
    length,
    width,
    floorType,
    recommendation,
    setIsOpen,
    setStep,
    setRoomType,
    setLength,
    setWidth,
    setFloorType,
  };
}
