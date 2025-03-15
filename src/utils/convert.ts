export const toNeutron = (amount: number): number => amount / 1e6;
export const toUntrn = (amount: number): string => (amount * 1e6).toFixed(0);
