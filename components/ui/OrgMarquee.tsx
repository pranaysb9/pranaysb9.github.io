"use client";

import { motion } from "framer-motion";
import OrgLogo, { getOrgDisplayName } from "@/components/ui/OrgLogo";

const ORGS = ["NVIDIA", "roboflow", "open-telemetry", "voxel51", "kornia", "embeddings-benchmark"];

/**
 * Slow, continuous strip of the real orgs behind the merged Open Source
 * PRs — a "who this work has shipped into" credibility marquee. Purely
 * ambient motion (linear, infinite, never stops for interaction), placed
 * once, right under the hero.
 */
export default function OrgMarquee() {
  const items = [...ORGS, ...ORGS];

  return (
    <div className="overflow-hidden border-b border-line bg-surface/40 py-4">
      <motion.div
        className="flex w-max items-center gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {items.map((org, i) => (
          <div key={`${org}-${i}`} className="flex shrink-0 items-center gap-2 text-muted">
            <OrgLogo org={org} size={16} />
            <span className="font-mono text-[11px] uppercase tracking-wide">{getOrgDisplayName(org)}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
