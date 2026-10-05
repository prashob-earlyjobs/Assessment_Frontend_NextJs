"use client";

import { createContext, useCallback, useContext, useTransition, type ReactNode } from "react";

type JobsNav = {
  isPending: boolean;
  navigate: (action: () => void | Promise<void>) => void;
};

const JobsNavContext = createContext<JobsNav>({
  isPending: false,
  navigate: (action) => {
    void action();
  },
});

export function JobsNavProvider({ children }: { children: ReactNode }) {
  const [isPending, startTransition] = useTransition();
  const navigate = useCallback(
    (action: () => void | Promise<void>) => {
      startTransition(async () => {
        await action();
      });
    },
    [startTransition],
  );

  return <JobsNavContext.Provider value={{ isPending, navigate }}>{children}</JobsNavContext.Provider>;
}

export function useJobsNav() {
  return useContext(JobsNavContext);
}
