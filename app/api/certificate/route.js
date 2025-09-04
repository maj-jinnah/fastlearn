import { dbConnection } from "@/service/dbConnection";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';


// Fetch custom fonts
const kalamFontUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/kalam/Kalam-Regular.ttf`;
const kalamFontBytes = await fetch(kalamFontUrl).then((res) =>
  res.arrayBuffer()
);
console.log({
  env: process.env.NEXT_PUBLIC_BASE_URL,
});
console.log({
  kalamFontUrl,
  kalamFontBytes,
});

const montserratItalicFontUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/montserrat/Montserrat-Italic.ttf`;
const montserratItalicFontBytes = await fetch(montserratItalicFontUrl).then(
  (res) => res.arrayBuffer()
);
console.log({
  montserratItalicFontUrl,
  montserratItalicFontBytes,
});
const montserratFontUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/montserrat/Montserrat-Medium.ttf`;
const montserratFontBytes = await fetch(montserratFontUrl).then((res) =>
  res.arrayBuffer()
);
console.log({
  montserratFontUrl,
  montserratFontBytes,
});

export async function GET(request) {
    try {
        await dbConnection();
        
    } catch (error) {
        throw new Error(error)
    }
}