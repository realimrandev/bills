import { useContext, useEffect } from "react";
import StageOne from "@/components/StageOne";
import StageTwo from "@/components/StageTwo";
import { GameContext } from "@/contexts/GameContext";

interface HomeProps {
  targetSection?: string;
}

export default function Home({ targetSection }: HomeProps) {
  const ctx = useContext(GameContext)!;

  // Keep existing scroll behavior (harmless)
  useEffect(() => {
    if (targetSection) {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetSection]);

  return <div className="app_root">{ctx.stage === 1 ? <StageOne /> : <StageTwo />}</div>;
}
