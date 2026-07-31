import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generatePDF = (analysis) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(22);
  doc.text("ResumeMatch AI Report", 20, 20);

  doc.setFontSize(11);
  doc.setTextColor(120);

  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    20,
    30
  );

  // ----------------------------
  // Scores
  // ----------------------------

  doc.setFontSize(16);
  doc.setTextColor(0);

  doc.text("Analysis Scores", 20, 45);

  autoTable(doc, {
    startY: 50,
    head: [["Metric", "Score"]],
    body: [
      ["Overall Match", `${analysis.overall_score}%`],
      ["Keyword Match", `${analysis.keyword_analysis.score}%`],
      [
        "Semantic Match",
        `${analysis.semantic_analysis.semantic_score}%`,
      ],
    ],
  });

  // ----------------------------
  // Skills
  // ----------------------------

  doc.text("Matched Skills", 20, doc.lastAutoTable.finalY + 15);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    body: analysis.keyword_analysis.matched_skills.map((skill) => [
      skill,
    ]),
  });

  doc.text(
    "Missing Skills",
    20,
    doc.lastAutoTable.finalY + 15
  );

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    body: analysis.keyword_analysis.missing_skills.map((skill) => [
      skill,
    ]),
  });

  // ----------------------------
  // Recommendations
  // ----------------------------

  doc.text(
    "Recommendations",
    20,
    doc.lastAutoTable.finalY + 15
  );

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,

    head: [["Title", "Priority", "Description"]],

    body: analysis.recommendations.map((item) => [
      item.title,
      item.priority,
      item.description,
    ]),
  });

  doc.save("ResumeMatch_Report.pdf");
};

export default generatePDF;