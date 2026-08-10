import Seo from "./Seo";

// Placeholder route — reserved so this URL already resolves live, but the
// real workshop registration content hasn't been built yet. Not linked from
// anywhere in the site nav, and noindex so it doesn't surface in search.
export default function WorkshopRegistration() {
  return (
    <>
      <Seo
        pageKey="workshopRegistration"
        path="/workshop-registration"
        title="Workshop Registration | Love Pathways Wraparound"
        description="Workshop registration page for Love Pathways Wraparound."
        noindex
      />
      <div className="min-h-[60vh]" />
    </>
  );
}
