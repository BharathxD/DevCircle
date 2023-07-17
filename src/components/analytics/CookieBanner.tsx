import useAnalytics from "@/hooks/useAnalytics";

const CookieBanner = () => {
  const { consent, setConsent } = useAnalytics();
  if (consent) return null;
  // We collect cookies only for google analytics and will be enabled by default, users have an option to disable that
  setConsent(true);
  return <div className="absolute -right-10 -top-10 hidden"></div>;
};

export default CookieBanner;
