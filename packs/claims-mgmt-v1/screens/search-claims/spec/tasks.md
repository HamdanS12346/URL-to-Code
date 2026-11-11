# TASKS — claims-mgmt-v1/search-claims

Target: React 19 + TypeScript, plain CSS (no UI library).
Spec: `packs/claims-mgmt-v1/screens/search-claims/spec/UI_SPEC.md` · tests: `packs/claims-mgmt-v1/screens/search-claims/spec/parity.spec.ts`

## 0. Setup
- [ ] `npm run port -- claims-mgmt-v1/search-claims`

## 1. Layout — §2–§4
- [ ] Rebuild the Search Criteria panel visuals from `sections/01-search-claims.png`.

## 2. Kit widgets — §5–§6
- [ ] Ensure each kit widget id is rendered via the Provider kit: [kit:k1] [kit:k2] [kit:k3] [kit:k4] [kit:k5] [kit:k6] [kit:k7] [kit:k8] [kit:k9] [kit:k10] [kit:k11] [kit:k12] [kit:k13] [kit:k14] [kit:k15] [kit:k16] [kit:k17] [kit:k18] [kit:k19] [kit:k20] [kit:k21] [kit:k22] [kit:k23]

## 3. Behaviors — §7–§10
- [ ] Wire collapse/expand for Search Criteria and Advanced panels.
- [ ] Wire Search/Reset/Cancel flows and stub the Search API and data-list endpoints.

## 4. Done
- [ ] `npm run verify -- claims-mgmt-v1/search-claims`
- [ ] `TARGET=react URL=<url> npx playwright test packs/claims-mgmt-v1/screens/search-claims/spec/parity.spec.ts`
