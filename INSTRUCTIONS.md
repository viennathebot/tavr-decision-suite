# TAVR Decision Suite — NEXT TASKS

Read this file and execute these tasks in order.

## Task 1: Deploy to Web
- Run: npx expo export --platform web
- Test locally: npx serve dist/
- Deploy to Vercel: install vercel CLI if needed, then vercel deploy --prod
- Goal: get a working URL we can share

## Task 2: Real Valve Sizing Data
Replace placeholder data with actual manufacturer specs:
- Edwards SAPIEN 3 Ultra: sizes 20, 23, 26, 29mm with perimeter/area ranges
- Medtronic Evolut PRO+ / FX: sizes 23, 26, 29, 34mm
- Include minimum sheath sizes for vascular access planning
- Pacemaker rates: SAPIEN ~6-8%, Evolut ~17-20% (cite PARTNER 3 / Evolut Low Risk)

## Task 3: Clavel Discordant AS Algorithm
Implement the Clavel 2015 classification (PMID: 25772832):
- Concordant severe: high gradient (≥40mmHg) + low AVA (<1.0cm²)
- Discordant low-flow low-gradient: LVEF <50% → dobutamine stress
- Discordant normal-flow low-gradient: CT calcium score tiebreaker
  - Men: AVC ≥2000 AU = severe, 1200-2000 = likely severe
  - Women: AVC ≥1200 AU = severe, 800-1200 = likely severe
- Output the classification in the calculator results

## Task 4: Add STS-PROM Risk Fields
- Age, gender, BMI, creatinine, diabetes, prior cardiac surgery, NYHA class
- Calculate estimated 30-day mortality
- Classify: low (<3%), intermediate (3-8%), high (8-15%), extreme (>15%)
