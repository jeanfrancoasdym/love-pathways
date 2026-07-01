# PIN — Cookie consent / analytics on Love Pathways (reinstate after legal sign-off)

**Status (2026-07-01): REMOVED for launch.** Love Pathways currently ships with:
- **NO cookie consent banner.**
- **NO third-party tracking at all** (no GTM / GA4 / Microsoft Clarity / Meta Pixel).
- Only the Privacy Policy *page* remains (static content, harmless).

## Why it was removed
Same posture as LEAF. Counsel (Barry Martin, asdym) advised against showing a cookie
consent banner while the CIPA "pen register" matter is active, because adding one now
can read as an admission of prior non-compliance. So we launch clean and revisit the
whole privacy/analytics setup **after** the legal discussion. **Do NOT re-add any of this
without counsel's OK.**

## What was removed (all in `src/components/Layout.tsx`)
1. `import ConsentBanner from "./ConsentBanner";`
2. `<ConsentBanner gtmId="GTM-TV4DHFQ5" />` (was rendered just before the closing `</>`).
3. The footer "Your Privacy Choices" / "Tus opciones de privacidad" button (cleared the
   `lp-consent` localStorage key to re-open the banner).

The banner component itself is **kept in the repo, unused**: `src/components/ConsentBanner.tsx`.
It gates GTM behind explicit Accept/Reject, loads nothing pre-consent, and honors GPC
(Global Privacy Control). Nothing else references it.

## Love Pathways GTM container
- **`GTM-TV4DHFQ5`** — Love Pathways' own container (contains GA4, Microsoft Clarity, Meta
  Pixel per prior network capture). **Do NOT reuse LEAF's `GTM-K5RDD9RJ`.**

## How to reinstate (pick one, only after counsel approves)

### Option A — Consent-gated (recommended, CIPA-safe)
In `src/components/Layout.tsx`:
1. Re-add `import ConsentBanner from "./ConsentBanner";`
2. Re-add `<ConsentBanner gtmId="GTM-TV4DHFQ5" />` right before the closing `</>`.
3. (Optional) Restore the footer "Your Privacy Choices" button that does
   `localStorage.removeItem("lp-consent"); window.location.reload();`
Result: nothing loads until the visitor clicks Accept; GPC auto-denies.

### Option B — Direct load, no consent (matches LEAF's current live state)
Add the GTM snippet directly to `index.html` (head + `<noscript>` in body) using
`GTM-TV4DHFQ5`, mirroring `../leaf-wraparound/index.html`. No banner. This carries the
same CIPA exposure LEAF currently has — only do this if counsel says the status quo is fine.

## Related
- LEAF privacy revert: commit `8e963d7` (removed its banner/GTM gating/GPC).
- Attorney-review privacy DRAFTs: `LEAF_Privacy_Policy_DRAFT.docx`,
  `LovePathways_Privacy_Policy_DRAFT.docx` (project root).
- Revisit with counsel: week of 2026-07-06 (per Barry).
