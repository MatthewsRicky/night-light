// hooks/useCountdown.ts
import { useEffect, useRef, useState } from "react";

export function useCountdown(startTime: number, isRunning: boolean) {
  const [timeLeft, setTimeLeft] = useState(startTime);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && startTime > 0) {
      setTimeLeft(startTime);
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1 && intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, startTime]);

  return { timeLeft, isComplete: timeLeft <= 0 };
}
