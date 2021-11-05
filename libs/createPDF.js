const pdf = require('pdf-creator-node');
const fs = require('fs-extra');

const createPDF = async (template) => {
  try {
    let html = fs.readFileSync("libs/template.html", "utf-8");
    const filename = new Date().toDateString() + '-' + Math.random() + '-' + template.firstName + template.lastName;

    let options = {
      format: "A4",
      orientation: "portrait",
      border: "15mm",
      header: {
        height: '10mm'
      }
    };

    let document = {
      html: html,
      data: {
        temp: template,
      },
      path: `files/${filename}.pdf`,
      type: "",
    };

    await pdf.create(document, options);
    return document.path;
  } catch (error) {
    return error;
  }
}

module.exports = createPDF;