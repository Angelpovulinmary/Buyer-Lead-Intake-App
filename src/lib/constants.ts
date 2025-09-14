

export const bhkLabels = {
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  STUDIO: "Studio",
} as const;

export const timelineLabels = {
  ZERO_TO_THREE_M: "0-3m",
  THREE_TO_SIX_M: "3-6m",
  MORE_THAN_SIX_M: ">6m",
  EXPLORING: "Exploring",
} as const;

export type BHK = keyof typeof bhkLabels; // "ONE" | "TWO" | "THREE" | "FOUR" | "STUDIO"
export type Timeline = keyof typeof timelineLabels; // "ZERO_TO_THREE_M" | "THREE_TO_SIX_M" | "MORE_THAN_SIX_M" | "EXPLORING"

export interface Buyer {
  id: string;
  fullName: string;
  bhk: BHK;
  timeline: Timeline;
  // Add other fields as needed
}

 