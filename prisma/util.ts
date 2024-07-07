import * as fs from 'fs';
import * as path from 'path';

export async function createDummyFile(
  firstName: string,
  lastName: string,
  matricNumber: string,
  submissionType: string,
): Promise<{ filename: string; path: string; mimetype: string }> {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filename = `${firstName}_${lastName}_${matricNumber}_${submissionType}.pdf`;
  const filePath = path.join(uploadsDir, filename);

  // Create a simple PDF-like content (not a real PDF, just for demonstration)
  const content = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/MediaBox[0 0 595 842]/Parent 2 0 R/Resources<<>>/Contents 4 0 R>>endobj
4 0 obj<</Length 51>>stream
BT /F1 12 Tf 72 720 Td (Dummy ${submissionType} file for ${firstName} ${lastName}) Tj ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000052 00000 n
0000000101 00000 n
0000000192 00000 n
trailer<</Size 5/Root 1 0 R>>
startxref
291
%%EOF`;

  fs.writeFileSync(filePath, content);

  return {
    filename,
    path: filePath,
    mimetype: 'application/pdf',
  };
}
