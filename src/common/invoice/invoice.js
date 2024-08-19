// import {createCanvas, loadImage } from 'canvas'
// import fs from 'fs'

// // Create a new canvas
// const width = 800;
// const height = 600;
// const canvas = createCanvas(width, height);
// const ctx = canvas.getContext('2d');

// // Set background color
// ctx.fillStyle = 'white';
// ctx.fillRect(0, 0, width, height);

// // Add text
// ctx.font = '24px Arial';
// ctx.fillStyle = 'black';
// ctx.fillText('Billing Information', 50, 50);

// // Load and draw logo
// loadImage('./Cosignee_copy.jpg').then((image) => {
//   ctx.drawImage(image, 650, 10, 100, 50);

//   // Save the image to a file
//   const out = fs.createWriteStream('billing_image.png');
//   const stream = canvas.createPNGStream();
//   stream.pipe(out);
  
//   out.on('finish', () => {
//     console.log('The image was created successfully.');
//   });
// }).catch(err => {
//   console.error('Error loading the logo:', err);
// });

//Pdf conversion

// import { PDFDocument } from 'pdf-lib'
// import fs from 'fs'
// import { loadImage } from 'canvas'

// async function createPdfFromImage() {
//   // Load image
//   const imagePath = './Cosignee_copy.png';
//   const imageBytes = fs.readFileSync(imagePath);
//   const image = await loadImage(imageBytes);

//   // Create a new PDF document
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage([image.width, image.height]);

//   // Embed the image in the PDF
//   const pdfImage = await pdfDoc.embedPng(imageBytes);
//   page.drawImage(pdfImage, {
//     x: 0,
//     y: 0,
//     width: image.width,
//     height: image.height,
//   });

//   // Save the PDF
//   const pdfBytes = await pdfDoc.save();
//   fs.writeFileSync('output.pdf', pdfBytes);
// }

// createPdfFromImage().catch(err => console.error('Error:', err));

import {PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs'
import {loadImage} from 'canvas'

async function createEditablePdfFromImage() {
  // Load the image
  const imagePath = './Cosignee_copy.png';
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

  // Add text fields
  const form = pdfDoc.getForm();

  // Example of adding text fields
  const nameField = form.createTextField('name');
  nameField.setText('');
  nameField.setBounds(100, 100, 200, 20);
  nameField.setFontSize(12);
  nameField.setBackgroundColor(rgb(1, 1, 1)); // White background

  const addressField = form.createTextField('address');
  addressField.setText('');
  addressField.setBounds(100, 150, 200, 20);
  addressField.setFontSize(12);
  addressField.setBackgroundColor(rgb(1, 1, 1)); 

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('editable_output.pdf', pdfBytes);
}

createEditablePdfFromImage().catch(err => console.error('Error:', err));

