import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const pairs = [
  ["components/ai-recruiting-automation-healthcare-staffing/faq.tsx", "schema/ai-recruiting-automation-healthcare-staffing.jsonld.json", "/ai-recruiting-automation-healthcare-staffing"],
  ["components/ai-recruiting-automation-manufacturing/faq.tsx", "schema/ai-recruiting-automation-manufacturing.jsonld.json", "/ai-recruiting-automation-manufacturing"],
  ["components/ai-recruiting-automation-ev-manufacturing/faq.tsx", "schema/ai-recruiting-automation-ev-manufacturing.jsonld.json", "/ai-recruiting-automation-ev-manufacturing"],
  ["components/recruiting-roi-calculator/faq.tsx", "schema/recruiting-roi-calculator.jsonld.json", "/recruiting-roi-calculator"],
  ["components/salary-benchmark-tool/faq.tsx", "schema/salary-benchmark-tool.jsonld.json", "/salary-benchmark-tool"],
  ["components/pharmaceutical-manufacturing-recruitment/faq.tsx", "schema/pharmaceutical-manufacturing-recruitment.jsonld.json", "/pharmaceutical-manufacturing-recruitment"],
  ["components/electronics-manufacturing-recruitment/faq.tsx", "schema/electronics-manufacturing-recruitment.jsonld.json", "/electronics-manufacturing-recruitment"],
  ["components/solar-renewable-energy-recruitment/faq.tsx", "schema/solar-renewable-energy-recruitment.jsonld.json", "/solar-renewable-energy-recruitment"],
  ["components/cost-per-hire-calculator/faq.tsx", "schema/cost-per-hire-calculator.jsonld.json", "/tools/cost-per-hire-calculator"],
  ["components/manpower-requisition-template/faq.tsx", "schema/manpower-requisition-template.jsonld.json", "/resources/manpower-requisition-template"],
  ["components/ev-automotive-manufacturing-recruitment/faq.tsx", "schema/ev-automotive-manufacturing-recruitment.jsonld.json", "/ev-automotive-manufacturing-recruitment"],
  ["components/diagnostic-centre-lab-recruitment/faq.tsx", "schema/diagnostic-centre-lab-recruitment.jsonld.json", "/diagnostic-centre-lab-recruitment"],
  ["components/warehouse-distribution-centre-recruitment/faq.tsx", "schema/warehouse-distribution-centre-recruitment.jsonld.json", "/warehouse-distribution-centre-recruitment"],
  ["components/employee-attrition-cost-calculator/faq.tsx", "schema/employee-attrition-cost-calculator.jsonld.json", "/tools/employee-attrition-cost-calculator"],
  ["components/recruitment-funnel-calculator/faq.tsx", "schema/recruitment-funnel-calculator.jsonld.json", "/tools/recruitment-funnel-calculator"],
  ["components/battery-manufacturing-recruitment/faq.tsx", "schema/battery-manufacturing-recruitment.jsonld.json", "/battery-manufacturing-recruitment"],
  ["components/food-processing-fmcg-manufacturing-recruitment/faq.tsx", "schema/food-processing-fmcg-manufacturing-recruitment.jsonld.json", "/food-processing-fmcg-manufacturing-recruitment"],
  ["components/vacancy-cost-calculator/faq.tsx", "schema/vacancy-cost-calculator.jsonld.json", "/tools/vacancy-cost-calculator"],
  ["components/job-description-generator/faq.tsx", "schema/job-description-generator.jsonld.json", "/tools/job-description-generator"],
  ["components/bulk-hiring-checklist/faq.tsx", "schema/bulk-hiring-checklist.jsonld.json", "/resources/bulk-hiring-checklist"],
  ["components/construction-infrastructure-recruitment/faq.tsx", "schema/construction-infrastructure-recruitment.jsonld.json", "/construction-infrastructure-recruitment"],
  ["components/medical-device-manufacturing-recruitment/faq.tsx", "schema/medical-device-manufacturing-recruitment.jsonld.json", "/medical-device-manufacturing-recruitment"],
  ["components/salary-benchmarking-planner/faq.tsx", "schema/salary-benchmarking-planner.jsonld.json", "/tools/salary-benchmarking-planner"],
  ["components/recruitment-agency-vs-in-house/faq.tsx", "schema/recruitment-agency-vs-in-house-hiring.jsonld.json", "/compare/recruitment-agency-vs-in-house-hiring"],
  ["components/ninety-day-workforce-hiring-plan/faq.tsx", "schema/90-day-workforce-hiring-plan.jsonld.json", "/resources/90-day-workforce-hiring-plan"],
];

function parseFaqs(src) {
  const faqs = [];
  const re =
    /\{\s*q:\s*"((?:\\.|[^"\\])*)"\s*,\s*a:\s*"((?:\\.|[^"\\])*)"\s*,?\s*\}/gs;
  let m;
  while ((m = re.exec(src))) {
    faqs.push({
      q: m[1].replace(/\\"/g, '"').replace(/\\n/g, "\n"),
      a: m[2].replace(/\\"/g, '"').replace(/\\n/g, "\n"),
    });
  }
  return faqs;
}

let updated = 0;
for (const [faqRel, schemaRel, pagePath] of pairs) {
  const faqSrc = fs.readFileSync(path.join(root, faqRel), "utf8");
  const faqs = parseFaqs(faqSrc);
  if (!faqs.length) {
    console.log("NO FAQS PARSED", faqRel);
    continue;
  }
  const schemaPath = path.join(root, schemaRel);
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  const faqNode = {
    "@type": "FAQPage",
    "@id": `https://www.earlyjobs.ai${pagePath}#faq`,
    url: `https://www.earlyjobs.ai${pagePath}`,
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  const idx = schema["@graph"].findIndex((n) => n["@type"] === "FAQPage");
  if (idx >= 0) schema["@graph"][idx] = faqNode;
  else schema["@graph"].push(faqNode);
  fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2) + "\n");
  updated++;
  console.log("synced", schemaRel, faqs.length);
}
console.log("done", updated);
