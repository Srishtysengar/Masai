import { Feedback } from "../types/feedback";

const KEY = "aromatic_bar_feedback_v1";

export const getFeedbackList = (): Feedback[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Feedback[]) : [];
  } catch {
    return [];
  }
};

export const saveFeedback = (fb: Feedback): void => {
  const list = getFeedbackList();
  list.push(fb);
  localStorage.setItem(KEY, JSON.stringify(list));
};

export const clearAll = (): void => {
  localStorage.removeItem(KEY);
};
