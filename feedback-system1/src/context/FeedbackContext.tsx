import React, { createContext, useState, ReactNode, useContext } from "react";

interface FeedbackData {
  name: string;
  email: string;
  rating: number | "";
  feedback: string;
}

interface FeedbackContextType {
  feedback: FeedbackData;
  setFeedback: React.Dispatch<React.SetStateAction<FeedbackData>>;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

const initialFeedback: FeedbackData = {
  name: "",
  email: "",
  rating: "",
  feedback: "",
};

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [feedback, setFeedback] = useState<FeedbackData>(initialFeedback);

  return (
    <FeedbackContext.Provider value={{ feedback, setFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = (): FeedbackContextType => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
};
