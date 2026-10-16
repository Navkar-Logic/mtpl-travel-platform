import { validateFile } from '../src/lib/storage/validation';
import { ValidationError } from '../src/lib/storage/errors';

const validJpeg = Buffer.from('FFD8FFE000104A46494600010101004800480000FFDB004300080606070605080707070909080A0C140D0C0B0B0C1912130F141D1A1F1E1D1A1C1C20242E2720222C231C1C2837292C30313434341F27393D38323C2E333432FFDB0043010909090C0B0C180D0D1832211C213232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232FFC00011080001000103012200021101031101FFC4001F0000010501010101010100000000000000000102030405060708090A0BFFC400B5100002010303020403050504040000017D01020300041105122131410613516107227114328191A1082342B1C11552D1F02433627282090A161718191A25262728292A3435363738393A434445464748494A535455565758595A636465666768696A737475767778797A838485868788898A92939495969798999AA2A3A4A5A6A7A8A9AAB2B3B4B5B6B7B8B9BAC2C3C4C5C6C7C8C9CAD2D3D4D5D6D7D8D9DAE1E2E3E4E5E6E7E8E9EAF1F2F3F4F5F6F7F8F9FAFFC4001F0100030101010101010101010000000000000102030405060708090A0BFFC400B51100020102040403040705040400010277000102031104052131061241510761711322328108144291A1B1C109233352F0156272D10A162434E125F11718191A262728292A35363738393A434445464748494A535455565758595A636465666768696A737475767778797A82838485868788898A92939495969798999AA2A3A4A5A6A7A8A9AAB2B3B4B5B6B7B8B9BAC2C3C4C5C6C7C8C9CAD2D3D4D5D6D7D8D9DAE2E3E4E5E6E7E8E9EAF2F3F4F5F6F7F8F9FAFFDA000C03010002110311003F00F928A28AF9FFD9', 'hex');
const validPdf = Buffer.from('%PDF-1.4\n%âãÏÓ\n', 'utf-8');

// Simulate process.env limits for testing
process.env.MEDIA_MAX_IMAGE_SIZE_MB = '10';
process.env.MEDIA_MAX_PDF_SIZE_MB = '20';

console.log('Running pure validation tests (no server-only dependencies)...');
let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    testsPassed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    testsFailed++;
  }
}

try {
  validateFile({ buffer: validJpeg, mimeType: 'image/jpeg', originalFilename: 'test.jpg', visibility: 'public', category: 'images' });
  assert(true, 'Valid JPEG passes validation');
} catch (e) {
  assert(false, `Valid JPEG failed validation: ${(e as Error).message}`);
}

try {
  validateFile({ buffer: validPdf, mimeType: 'application/pdf', originalFilename: 'test.pdf', visibility: 'private', category: 'documents' });
  assert(true, 'Valid PDF passes validation');
} catch (e) {
  assert(false, `Valid PDF failed validation: ${(e as Error).message}`);
}

try {
  validateFile({ buffer: Buffer.from('not an image'), mimeType: 'image/jpeg', originalFilename: 'test.jpg', visibility: 'public', category: 'images' });
  assert(false, 'Invalid JPEG should fail validation');
} catch (e) {
  assert(e instanceof ValidationError, 'Invalid JPEG correctly throws ValidationError');
}

console.log(`\nValidation Tests completed. Passed: ${testsPassed}, Failed: ${testsFailed}`);
if (testsFailed > 0) process.exit(1);
