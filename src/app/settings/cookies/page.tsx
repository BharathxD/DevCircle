import CookiesForm from "../../../components/Forms/CookiesForm";

const SettingsCookiesPage = () => {
  return (
    <section>
      <div className="px-4 py-2">
        <h3 className="text-xl font-bold">Cookies</h3>
        <p className="text-sm text-muted-foreground">
          Manage your cookie settings here.
        </p>
      </div>
      <div className="px-4 py-2">
        <CookiesForm />
      </div>
    </section>
  );
};

export default SettingsCookiesPage;
