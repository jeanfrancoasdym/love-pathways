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
                <h2 className="font-display text-2xl font-bold text-brand-dark">Cookies, tecnologías de seguimiento y tus opciones de privacidad</h2>
                <p>Usamos cookies y tecnologías similares. Las esenciales son necesarias para que el sitio funcione. Con tu consentimiento, también usamos tecnologías opcionales de analítica y publicidad provistas por terceros:</p>
                <ul className="list-disc space-y-1 pl-6">
                  <li><strong>Google Analytics 4</strong> (Google LLC, vía Google Tag Manager) — analítica del sitio web.</li>
                  <li><strong>Meta Pixel</strong> (Meta Platforms, Inc.) — medición publicitaria y creación de audiencias.</li>
                  <li><strong>Microsoft Clarity</strong> (Microsoft Corporation) — análisis de uso e interacción, incluida la repetición de sesión (grabación de clics, desplazamiento e interacciones similares).</li>
                </ul>
                <p>Estas tecnologías pueden recopilar tu dirección IP, identificadores de dispositivo/navegador y tu actividad en el sitio, y compartirlos con dichos proveedores para fines de analítica y publicidad. <strong>Solo se activan después de que las aceptas</strong> en nuestro aviso de cookies. Puedes rechazarlas y cambiar tu elección en cualquier momento con el enlace <strong>“Your Privacy Choices”</strong> al pie de cualquier página.</p>
                <h2 className="font-display text-2xl font-bold text-brand-dark pt-2">Tus derechos de privacidad en California (CCPA/CPRA)</h2>
                <p>Si resides en California, tienes derecho a conocer/acceder, eliminar y corregir tu información personal, y a optar por no participar en la “venta” o “compartición” de tu información personal para publicidad conductual entre contextos. No vendemos tu información personal por dinero. Para ejercer tus derechos u optar por no participar, usa <strong>“Your Privacy Choices”</strong> o escríbenos a <a className="text-brand-primary underline" href="mailto:contact@lovepathways.org">contact@lovepathways.org</a>. No te discriminaremos por ejercer estos derechos.</p>
                <p className="text-sm text-slate-500">Última actualización: junio de 2026.</p>
              </>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-brand-dark">Cookies, Tracking Technologies &amp; Your Privacy Choices</h2>
                <p>We use cookies and similar technologies. Essential ones are required for the site to function. With your consent, we also use optional analytics and advertising technologies provided by third parties:</p>
                <ul className="list-disc space-y-1 pl-6">
                  <li><strong>Google Analytics 4</strong> (Google LLC, via Google Tag Manager) — website analytics.</li>
                  <li><strong>Meta Pixel</strong> (Meta Platforms, Inc.) — advertising measurement and audience building.</li>
                  <li><strong>Microsoft Clarity</strong> (Microsoft Corporation) — usage and interaction analytics, including session replay (recording of clicks, scrolling, and similar interactions).</li>
                </ul>
                <p>These technologies may collect your IP address, device/browser identifiers, and your activity on our site, and share it with those providers for analytics and advertising purposes. <strong>They load only after you accept</strong> them in our cookie notice. You can reject them, and change your choice at any time using the <strong>“Your Privacy Choices”</strong> link at the bottom of any page.</p>
                <h2 className="font-display text-2xl font-bold text-brand-dark pt-2">Your California Privacy Rights (CCPA/CPRA)</h2>
                <p>If you are a California resident, you have the right to know/access, delete, and correct your personal information, and to opt out of the “sale” or “sharing” of your personal information for cross-context behavioral advertising. We do not sell your personal information for money. To exercise your rights or opt out, use <strong>“Your Privacy Choices”</strong> or contact us at <a className="text-brand-primary underline" href="mailto:contact@lovepathways.org">contact@lovepathways.org</a>. We will not discriminate against you for exercising these rights.</p>
                <p className="text-sm text-slate-500">Last updated: June 2026.</p>
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
