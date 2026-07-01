import { useTranslation } from "react-i18next";
import { useLocale } from "../i18n/useLocale";
import Seo from "./Seo";

export default function PrivacyPolicy() {
  const { t } = useTranslation("privacy");
  const { lng } = useLocale();
  return (
    <div className="pb-20">
      <Seo pageKey="privacy" path="/privacy-policy" />
      {/* Hero Section */}
      <section className="bg-brand-dark py-16 md:py-24 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-brand-primary/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-display font-medium">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="prose prose-slate max-w-none text-slate-700 space-y-6 leading-relaxed">
          <p className="font-bold text-lg text-slate-900 border-b border-slate-200 pb-4 mb-8">
            {t("content.readCarefully")}
          </p>

          {/* Cookies / tracking / CCPA disclosures — DRAFT pending legal review. */}
          <div className="not-prose my-8 rounded-2xl border border-slate-200 bg-brand-cream p-6 md:p-8 space-y-4 text-slate-700 leading-relaxed">
            {lng === "es" ? (
              <>
                <h2 className="font-display text-2xl font-bold text-brand-dark">Cookies y tecnologías de seguimiento</h2>
                <p>Usamos cookies esenciales, necesarias para que el sitio funcione. <strong>Actualmente no cargamos analítica ni tecnologías de publicidad de terceros</strong> (como Google Analytics, Meta Pixel o Microsoft Clarity) en este sitio. Si esto cambia, actualizaremos esta política antes de activarlas.</p>
                <h2 className="font-display text-2xl font-bold text-brand-dark pt-2">Tus derechos de privacidad en California (CCPA/CPRA)</h2>
                <p>Si resides en California, tienes derecho a conocer/acceder, eliminar y corregir tu información personal, y a optar por no participar en la “venta” o “compartición” de tu información personal para publicidad conductual entre contextos. No vendemos tu información personal por dinero. Para ejercer tus derechos, escríbenos a <a className="text-brand-primary underline" href="mailto:contact@lovepathways.org">contact@lovepathways.org</a>. No te discriminaremos por ejercer estos derechos.</p>
                <p className="text-sm text-slate-500">Última actualización: julio de 2026.</p>
              </>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-brand-dark">Cookies &amp; Tracking Technologies</h2>
                <p>We use essential cookies required for the site to function. <strong>We do not currently load third-party analytics or advertising technologies</strong> (such as Google Analytics, Meta Pixel, or Microsoft Clarity) on this site. If that changes, we will update this policy before enabling them.</p>
                <h2 className="font-display text-2xl font-bold text-brand-dark pt-2">Your California Privacy Rights (CCPA/CPRA)</h2>
                <p>If you are a California resident, you have the right to know/access, delete, and correct your personal information, and to opt out of the “sale” or “sharing” of your personal information for cross-context behavioral advertising. We do not sell your personal information for money. To exercise your rights, contact us at <a className="text-brand-primary underline" href="mailto:contact@lovepathways.org">contact@lovepathways.org</a>. We will not discriminate against you for exercising these rights.</p>
                <p className="text-sm text-slate-500">Last updated: July 2026.</p>
              </>
            )}
          </div>

          <p>{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.confidentialIntro1")}
          </p>

          <p>
            {t("content.confidentialDefinition")}
          </p>

          <p>
            {t("content.unauthorizedDisclosure")}
          </p>

          <p>
            {t("content.directQuestions")}
          </p>

          <p>
            {t("content.accessTerms")}
          </p>

          <p>
            {t("content.modifications")}
          </p>

          <p>
            {t("content.prizesIntro")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.prizesOutro")}
          </p>

          <ul className="space-y-4 list-disc pl-5">
            <li>
              <strong>{t("content.list.ownershipLabel")}</strong> {t("content.list.ownership1")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.ownership2")}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{t("content.list.ownership3")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{t("content.list.ownership4")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.ownership5")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.ownership6")}
            </li>
            <li>
              <strong>{t("content.list.useRestrictionsLabel")}</strong> {t("content.list.useRestrictions")}
            </li>
            <li>
              <strong>{t("content.list.trademarksLabel")}</strong> {t("content.list.trademarks1")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.trademarks2")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{t("content.list.trademarks3")}
            </li>
            <li>
              <strong>{t("content.list.ideasLabel")}</strong>{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.ideas1")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.ideas2")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.ideas3")}
            </li>
            <li>
              <strong>{t("content.list.employeesLabel")}</strong> {t("content.list.employees1")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{t("content.list.employees2")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.employees3")}
            </li>
            <li>
              <strong>{t("content.list.disclosureLabel")}</strong> {t("content.list.disclosure1")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.disclosure2")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.disclosure3")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.disclosure4")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.disclosure5")}
            </li>
            <li>
              <strong>{t("content.list.productsLabel")}</strong> {t("content.list.products1")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.products2")}
            </li>
            <li>
              <strong className="uppercase">{t("content.list.virusesLabel")}</strong>{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.viruses")}
            </li>
            <li>
              <strong>{t("content.list.liabilityLabel")}</strong>{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.liability1")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.liability2")}
            </li>
            <li>
              <strong>{t("content.list.miscLabel")}</strong> {t("content.list.misc1")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.misc2")}<br/><br/>
              {t("content.list.misc3")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.misc4")}
            </li>
            <li>
              <strong>{t("content.list.cookiesLabel")}</strong> {t("content.list.cookies1")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.list.cookies2")}
            </li>
          </ul>

          <div className="pt-6 space-y-6">
            <p>
              <strong>{t("content.apps.operationsLabel")}</strong> {t("content.apps.operations1")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.apps.operations2")}
            </p>

            <p>
              <strong>{t("content.apps.familyLabel")}</strong> {t("content.apps.family1")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{t("content.apps.family2")}
            </p>

            <p>
              <strong>{t("content.apps.noDataLabel")}</strong>{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.apps.noData1")}
            </p>

            <p>
              <strong>{t("content.apps.assignmentLabel")}</strong> {t("content.apps.assignment1")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{" "}{t("content.apps.assignment2")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{t("content.apps.assignment3")}{" "}<span className="notranslate" translate="no">LOVE PATHWAYS WRAPAROUND</span>{t("content.apps.assignment4")}
            </p>

            <p>
              {t("content.apps.seminarBefore")} <a href="mailto:info@lovepathways.org" className="text-brand-primary hover:underline">info@lovepathways.org</a>{t("content.apps.seminarAfter")}
            </p>

            <p className="font-bold text-xl pt-4">
              {t("content.apps.thankYou")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
