# LEARNX Data Source Register

**Document Version:** 1.0.0  
**Compliance Standard:** ISO/IEC 27001 & Digital Personal Data Protection Act (DPDPA 2023, India)  
**Maintained by:** LEARNX Governance & AI Engineering Group

---

## 1. National Career Service (NCS) Taxonomy

- **Publisher:** Ministry of Labour and Employment, Government of India
- **URL:** https://www.ncs.gov.in/
- **Verification Date:** 2026-11-09
- **Version:** National Classification of Occupations (NCO-2015 / Revised 2024)
- **License / Terms:** Open Government Data (OGD) Platform India / CC-BY equivalent for public sector data
- **Permitted Use:** Reference classification for job roles, competency indicators, and occupational taxonomy mapping.
- **Data Dictionary:**
  - `Occupation Code`: 4-digit standard NCO identifier
  - `Job Title`: Primary nomenclature in Indian public & private sectors
  - `Educational Minimum`: Normalized qualification baseline (10+2, Diploma, Graduate, Post-Graduate)
  - `Key Task Descriptions`: Decomposed occupational responsibilities
- **Limitations:** Regional variations in private tech titles (e.g., 'Data Analyst' vs 'Associate Analytics Specialist') require periodic reconciliation.

---

## 2. ESCO (European Skills, Competences, Qualifications and Occupations)

- **Publisher:** European Commission, Directorate-General for Employment, Social Affairs and Inclusion
- **URL:** https://esco.ec.europa.eu/en
- **Verification Date:** 2026-11-09
- **Version:** ESCO v1.1.2
- **License / Terms:** Creative Commons Attribution 4.0 International (CC BY 4.0)
- **Permitted Use:** Standard taxonomy for skill decomposition, knowledge hierarchies, and international equivalence.
- **Citation:** European Commission (2024). European Skills, Competences, Qualifications and Occupations (ESCO v1.1.2).
- **Limitations:** European vocational models may differ in entry-level fresher expectations compared to the Indian graduate context.

---

## 3. O*NET (Occupational Information Network)

- **Publisher:** U.S. Department of Labor, Employment and Training Administration
- **URL:** https://www.onetonline.org/
- **Verification Date:** 2026-11-09
- **Version:** O*NET 28.3 Database
- **License / Terms:** Custom Open Access / Public Domain US Government Work
- **Permitted Use:** Granular task-to-ability weighting matrices and proficiency rubric definitions.
- **Limitations:** Focuses on US labor market compensation and demand dynamics; salary and demand metrics are overridden with Indian market indices.

---

## 4. OULAD (Open University Learning Analytics Dataset)

- **Publisher:** Open University, Knowledge Media Institute (KMi)
- **URL:** https://analyse.kmi.open.ac.uk/open_dataset
- **Verification Date:** 2026-11-09
- **Version:** Release 2014-04
- **License / Terms:** Creative Commons Attribution 4.0 International (CC BY 4.0)
- **Permitted Use:** Benchmarking knowledge tracing, dropout prediction risk heuristics, and study planner cadence.
- **Privacy & Safety Constraints:** De-identified learner IDs are strictly kept isolated. Under no circumstances are synthetic learner records merged with live student data.

---

## Ethical & Privacy Principles

1. **Differential Privacy:** Aggregated national intelligence reports only render metrics when cohort $N \ge 25$ to prevent deanonymization.
2. **Explicit Consent Only:** Learner project deliverables and Skill Passports are invisible to prospective employers unless the student explicitly selects "Share Profile".
3. **Evidence Over Speculation:** Predictions of career readiness must reflect demonstrated submissions on rubrics, never unverified psychometric scores.
