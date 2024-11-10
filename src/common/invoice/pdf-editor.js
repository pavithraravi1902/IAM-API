import {PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs'
import {loadImage} from 'canvas'

async function createEditablePdfFromImage() {
    // Load the image
    const imagePath = './Cosignee_copy.png'; // Replace with your image path
    const imageBytes = fs.readFileSync(imagePath);
    const image = await loadImage(imageBytes);
  
 // Create a new PDF document
 const pdfDoc = await PDFDocument.create();
 const page = pdfDoc.addPage([image.width, image.height]);

 // Embed the image into the PDF
 const pdfImage = await pdfDoc.embedPng(imageBytes);
 page.drawImage(pdfImage, {
   x: 0,
   y: 0,
   width: image.width,
   height: image.height,
 });

 // Add editable text fields
 const form = pdfDoc.getForm();

 // Define the fields with positions and sizes
 const fields = [
   { name: 'consigneeDetails', x: 100, y: image.height - 150, width: 300, height: 20 },
   { name: 'date', x: 100, y: image.height - 200, width: 150, height: 20 },
   { name: 'quantity', x: 100, y: image.height - 250, width: 100, height: 20 },
   { name: 'items', x: 100, y: image.height - 300, width: 200, height: 20 },
   { name: 'total', x: 100, y: image.height - 350, width: 100, height: 20 },
 ];

 fields.forEach(field => {
   const textField = form.createTextField(field.name);
   textField.setText('');
   textField.addToPage(page, {
     x: field.x,
     y: field.y,
     width: field.width,
     height: field.height,
   });
   textField.setFontSize(12);
 });

 const pdfBytes = await pdfDoc.save();
 fs.writeFileSync('invoice1.pdf', pdfBytes);
}

createEditablePdfFromImage().catch(err => console.error('Error:', err));