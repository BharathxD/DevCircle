"use client";

import { useEffect, useState } from "react";

import { getLocalStorage, setLocalStorage } from "@/lib/utils";

/**
 * Custom hook for managing analytics consent.
 * @returns Object with consent state and setter function.
 */
const useAnalytics = () => {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const storedConsent = getLocalStorage("cookie_consent", true);
    setConsent(storedConsent);
  }, []);

  useEffect(() => {
    const newValue = consent ? "granted" : "denied";
    window.gtag("consent", "update", {
      analytics_storage: newValue,
    });
    setLocalStorage("cookie_consent", consent);
  }, [consent]);

  return { consent, setConsent };
};

export default useAnalytics;
