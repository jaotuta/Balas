
export interface ColorSegment {
  id: string;
  color: string;
  borderColor: string;
  displayName: string; // Ex: "Vermelho", "Verde"
}

export interface SpinResult {
  segment: ColorSegment;
  timestamp: number;
}
