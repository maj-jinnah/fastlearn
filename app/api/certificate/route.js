// import { formatMyDate } from "@/lib/date";
// import { getLoggedInUser } from "@/lib/loggedin-user";
// import { getCourseDetailsById } from "@/queries/courses";
// import { getAReport } from "@/queries/reports";
// import fontkit from "@pdf-lib/fontkit";
// import { NextResponse } from "next/server";
// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
// import fs from "fs";
// import path from "path";

// export async function GET(request) {
//   try {
//     /* -----------------
//      * Configurations
//      *-------------------*/
//     const searchParams = request.nextUrl.searchParams;
//     const courseId = searchParams.get("courseId");

//     const course = await getCourseDetailsById(courseId);
//     const loggedInUser = await getLoggedInUser();

//     if (!loggedInUser) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const report = await getAReport({
//       course: courseId,
//       student: loggedInUser.id,
//     });

//     const completionDate = report?.completion_date
//       ? await formatMyDate(report?.completion_date)
//       : await formatMyDate(Date.now());

//     if (!completionDate) {
//       return new NextResponse("Course not completed", { status: 500 });
//     }

//     const completionInfo = {
//       name: `${loggedInUser?.firstName} ${loggedInUser?.lastName}`,
//       completionDate,
//       courseName: course.title,
//       instructor: `${course?.instructor?.firstName} ${course?.instructor?.lastName}`,
//       instructorDesignation: `${course?.instructor?.designation}`,
//       sign: "signature.png",
//     };

//     /* -----------------
//      * Load Fonts & Images
//      *-------------------*/
//     const kalamFontBytes = fs.readFileSync(
//       path.join(process.cwd(), "public/fonts/kalam/Kalam-Regular.ttf")
//     );
//     const montserratItalicFontBytes = fs.readFileSync(
//       path.join(process.cwd(), "public/fonts/montserrat/Montserrat-Italic.ttf")
//     );
//     const montserratFontBytes = fs.readFileSync(
//       path.join(process.cwd(), "public/fonts/montserrat/Montserrat-Medium.ttf")
//     );

//     const logoBytes = fs.readFileSync(
//       path.join(process.cwd(), "public/logo.png")
//     );
//     const signBytes = fs.readFileSync(
//       path.join(process.cwd(), `public/${completionInfo.sign}`)
//     );
//     const patternBytes = fs.readFileSync(
//       path.join(process.cwd(), "public/pattern.jpg")
//     );

//     /* -----------------
//      * Create PDF
//      *-------------------*/
//     const pdfDoc = await PDFDocument.create();
//     pdfDoc.registerFontkit(fontkit);

//     const kalamFont = await pdfDoc.embedFont(kalamFontBytes);
//     const montserratItalic = await pdfDoc.embedFont(montserratItalicFontBytes);
//     const montserrat = await pdfDoc.embedFont(montserratFontBytes);

//     const page = pdfDoc.addPage([841.89, 595.28]); // A4 landscape
//     const { width, height } = page.getSize();
//     const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

//     /* -----------------
//      * Logo
//      *-------------------*/
//     const logo = await pdfDoc.embedPng(logoBytes);
//     const logoDimns = logo.scale(0.5);
//     page.drawImage(logo, {
//       x: width / 2 - logoDimns.width / 2,
//       y: height - 120,
//       width: logoDimns.width,
//       height: logoDimns.height,
//     });

//     /* -----------------
//      * Title
//      *-------------------*/
//     const titleFontSize = 30;
//     const titleText = "Certificate Of Completion";
//     const titleTextWidth = montserrat.widthOfTextAtSize(titleText, titleFontSize);

//     page.drawText(titleText, {
//       x: width / 2 - titleTextWidth / 2,
//       y: height - (logoDimns.height + 125),
//       size: titleFontSize,
//       font: montserrat,
//       color: rgb(0, 0.53, 0.71),
//     });

//     /* -----------------
//      * Name Label
//      *-------------------*/
//     const nameLabelText = "This certificate is hereby bestowed upon";
//     const nameLabelFontSize = 20;
//     const nameLabelTextWidth = montserratItalic.widthOfTextAtSize(
//       nameLabelText,
//       nameLabelFontSize
//     );

//     page.drawText(nameLabelText, {
//       x: width / 2 - nameLabelTextWidth / 2,
//       y: height - (logoDimns.height + 170),
//       size: nameLabelFontSize,
//       font: montserratItalic,
//       color: rgb(0, 0, 0),
//     });

//     /* -----------------
//      * Student Name
//      *-------------------*/
//     const nameText = completionInfo.name;
//     const nameFontSize = 40;
//     const nameTextWidth = timesRomanFont.widthOfTextAtSize(
//       nameText,
//       nameFontSize
//     );

//     page.drawText(nameText, {
//       x: width / 2 - nameTextWidth / 2,
//       y: height - (logoDimns.height + 220),
//       size: nameFontSize,
//       font: kalamFont,
//       color: rgb(0, 0, 0),
//     });

//     /* -----------------
//      * Details
//      *-------------------*/
//     const detailsText = `This is to certify that ${completionInfo.name} successfully completed the ${completionInfo.courseName} course on ${completionInfo.completionDate} by ${completionInfo.instructor}`;

//     page.drawText(detailsText, {
//       x: width / 2 - 700 / 2,
//       y: height - 330,
//       size: 16,
//       font: montserrat,
//       color: rgb(0, 0, 0),
//       maxWidth: 700,
//       wordBreaks: [" "],
//     });

//     /* -----------------
//      * Instructor Sign
//      *-------------------*/
//     const signatureBoxWidth = 300;
//     page.drawLine({
//       start: { x: width - signatureBoxWidth, y: 110 },
//       end: { x: width - 60, y: 110 },
//       thickness: 1,
//       color: rgb(0, 0, 0),
//     });

//     page.drawText(completionInfo.instructor, {
//       x: width - signatureBoxWidth,
//       y: 90,
//       size: 16,
//       font: timesRomanFont,
//       color: rgb(0, 0, 0),
//     });

//     page.drawText(completionInfo.instructorDesignation, {
//       x: width - signatureBoxWidth,
//       y: 72,
//       size: 10,
//       font: timesRomanFont,
//       color: rgb(0, 0, 0),
//       maxWidth: 250,
//     });

//     const sign = await pdfDoc.embedPng(signBytes);
//     page.drawImage(sign, {
//       x: width - signatureBoxWidth,
//       y: 120,
//       width: 180,
//       height: 54,
//     });

//     /* -----------------
//      * Pattern Background
//      *-------------------*/
//     const pattern = await pdfDoc.embedJpg(patternBytes);
//     page.drawImage(pattern, {
//       x: 0,
//       y: 0,
//       width: width,
//       height: height,
//       opacity: 0.2,
//     });

//     /* -----------------
//      * Send Response
//      *-------------------*/
//     const pdfBytes = await pdfDoc.save();

//     return new NextResponse(Buffer.from(pdfBytes), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename="certificate-${completionInfo.name}.pdf"`,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return new NextResponse("Failed to generate certificate", { status: 500 });
//   }
// }


import { formatMyDate } from "@/lib/date";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { getCourseDetailsById } from "@/queries/courses";
import { getAReport } from "@/queries/reports";
import fontkit from "@pdf-lib/fontkit";
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const courseId = searchParams.get("courseId");

    const course = await getCourseDetailsById(courseId);
    const loggedInUser = await getLoggedInUser();

    if (!loggedInUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const report = await getAReport({
      course: courseId,
      student: loggedInUser.id,
    });

    const completionDate = report?.completion_date
      ? await formatMyDate(report?.completion_date)
      : await formatMyDate(Date.now());

    if (!completionDate) {
      return new NextResponse("Course not completed", { status: 500 });
    }

    const completionInfo = {
      name: `${loggedInUser?.firstName} ${loggedInUser?.lastName}`,
      completionDate,
      courseName: course.title,
      instructor: `${course?.instructor?.firstName} ${course?.instructor?.lastName}`,
      instructorDesignation: `${course?.instructor?.designation}`,
      company: "FastLearn Academy",
      position: "Founder & CEO",
      sign: "signature.png",
    };

    /* -----------------
     * Load Fonts & Images
     *-------------------*/
    const kalamFontBytes = fs.readFileSync(
      path.join(process.cwd(), "public/fonts/kalam/Kalam-Regular.ttf")
    );
    const montserratItalicFontBytes = fs.readFileSync(
      path.join(process.cwd(), "public/fonts/montserrat/Montserrat-Italic.ttf")
    );
    const montserratFontBytes = fs.readFileSync(
      path.join(process.cwd(), "public/fonts/montserrat/Montserrat-Medium.ttf")
    );

    const logoBytes = fs.readFileSync(path.join(process.cwd(), "public/logo.png"));
    const signBytes = fs.readFileSync(path.join(process.cwd(), `public/${completionInfo.sign}`));
    const patternBytes = fs.readFileSync(path.join(process.cwd(), "public/pattern.jpg"));

    /* -----------------
     * Create PDF
     *-------------------*/
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const kalamFont = await pdfDoc.embedFont(kalamFontBytes);
    const montserratItalic = await pdfDoc.embedFont(montserratItalicFontBytes);
    const montserrat = await pdfDoc.embedFont(montserratFontBytes);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage([841.89, 595.28]); // A4 landscape
    const { width, height } = page.getSize();

    /* -----------------
     * Background Pattern
     *-------------------*/
    const pattern = await pdfDoc.embedJpg(patternBytes);
    page.drawImage(pattern, {
      x: 0,
      y: 0,
      width: width,
      height: height,
      opacity: 0.15,
    });

    /* -----------------
     * Decorative Border
     *-------------------*/
    const margin = 30;
    page.drawRectangle({
      x: margin,
      y: margin,
      width: width - margin * 2,
      height: height - margin * 2,
      borderColor: rgb(0.2, 0.4, 0.6),
      borderWidth: 4,
    });

    page.drawRectangle({
      x: margin + 10,
      y: margin + 10,
      width: width - (margin + 10) * 2,
      height: height - (margin + 10) * 2,
      borderColor: rgb(0.6, 0.8, 0.9),
      borderWidth: 2,
    });

    /* -----------------
     * Logo
     *-------------------*/
    const logo = await pdfDoc.embedPng(logoBytes);
    const logoDimns = logo.scale(0.35);
    page.drawImage(logo, {
      x: width / 2 - logoDimns.width / 2,
      y: height - 120,
      width: logoDimns.width,
      height: logoDimns.height,
    });

    /* -----------------
     * Title
     *-------------------*/
    const titleFontSize = 36;
    const titleText = "Certificate of Completion";
    const titleTextWidth = montserrat.widthOfTextAtSize(titleText, titleFontSize);

    page.drawText(titleText, {
      x: width / 2 - titleTextWidth / 2,
      y: height - 180,
      size: titleFontSize,
      font: montserrat,
      color: rgb(0.1, 0.3, 0.5),
    });

    /* -----------------
     * Subtitle
     *-------------------*/
    const subtitle = "This certificate is proudly presented to";
    const subtitleFontSize = 18;
    const subtitleWidth = montserratItalic.widthOfTextAtSize(subtitle, subtitleFontSize);

    page.drawText(subtitle, {
      x: width / 2 - subtitleWidth / 2,
      y: height - 220,
      size: subtitleFontSize,
      font: montserratItalic,
      color: rgb(0, 0, 0),
    });

    /* -----------------
     * Student Name
     *-------------------*/
    const nameText = completionInfo.name;
    const nameFontSize = 40;
    const nameWidth = kalamFont.widthOfTextAtSize(nameText, nameFontSize);

    page.drawText(nameText, {
      x: width / 2 - nameWidth / 2,
      y: height - 270,
      size: nameFontSize,
      font: kalamFont,
      color: rgb(0.05, 0.1, 0.2),
    });

    /* -----------------
     * Details
     *-------------------*/
    const detailsText = `For successfully completing the "${completionInfo.courseName}" course on ${completionInfo.completionDate}, instructed by ${completionInfo.instructor}.`;

    page.drawText(detailsText, {
      x: width / 2 - 600 / 2,
      y: height - 330,
      size: 16,
      font: montserrat,
      color: rgb(0, 0, 0),
      maxWidth: 600,
    });

    /* -----------------
     * Signature + Instructor
     *-------------------*/
    const signatureBoxWidth = 250;
    page.drawLine({
      start: { x: width - signatureBoxWidth - 60, y: 110 },
      end: { x: width - 60, y: 110 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    page.drawText(completionInfo.instructor, {
      x: width - signatureBoxWidth - 60,
      y: 92,
      size: 14,
      font: timesRomanFont,
    });

    page.drawText(completionInfo.instructorDesignation, {
      x: width - signatureBoxWidth - 60,
      y: 76,
      size: 10,
      font: montserratItalic,
    });

    const sign = await pdfDoc.embedPng(signBytes);
    page.drawImage(sign, {
      x: width - signatureBoxWidth - 60,
      y: 120,
      width: 120,
      height: 40,
    });

    /* -----------------
     * Company Footer
     *-------------------*/
    const footerText = `${completionInfo.company} — ${completionInfo.position}`;
    const footerSize = 12;
    const footerWidth = montserrat.widthOfTextAtSize(footerText, footerSize);

    page.drawText(footerText, {
      x: width / 2 - footerWidth / 2,
      y: 40,
      size: footerSize,
      font: montserrat,
      color: rgb(0.2, 0.2, 0.2),
    });

    /* -----------------
     * Return PDF
     *-------------------*/
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="certificate-${completionInfo.name}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to generate certificate", { status: 500 });
  }
}
