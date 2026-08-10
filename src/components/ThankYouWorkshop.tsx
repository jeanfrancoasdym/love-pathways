import Seo from "./Seo";

// Placeholder route — reserved so this URL already resolves live, but the
// real thank-you content hasn't been built yet. Not linked from anywhere in
// the site nav, and noindex so it doesn't surface in search.
export default function ThankYouWorkshop() {
  return (
    <>
      <Seo
        pageKey="thankYouWorkshop"
        path="/thank-you-workshop"
        title="You're Registered | Love Pathways Wraparound"
        description="Thank-you page for Love Pathways Wraparound workshop registration."
        noindex
      />
      <div className="min-h-[60vh]" />
    </>
  );
}
