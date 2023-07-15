"use client";

import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "@/lib/utils";

const useAnalytics = () => {
    const [consent, setConsent] = useState<boolean | null>(null);

    useEffect(() => {
        const storedconsent = getLocalStorage("cookie_consent", true);
        setConsent(storedconsent);
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