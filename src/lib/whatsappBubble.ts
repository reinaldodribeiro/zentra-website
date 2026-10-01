export type BubbleState = {
  due: boolean;
  dismissed: boolean;
  blocked: boolean;
  contactOnScreen: boolean;
};

export function isBubbleVisible(state: BubbleState): boolean {
  return state.due && !state.dismissed && !state.blocked && !state.contactOnScreen;
}

export function remainingMs(remaining: number, elapsed: number): number {
  return Math.max(0, remaining - Math.max(0, elapsed));
}
