import { validatePhoneNumber, callbackRequestSchema } from '../src/lib/validations/callback';

console.log("--- Testing Phone Validation ---");

// Test 1: Empty phone
const empty = validatePhoneNumber("");
console.log("Empty phone valid:", empty.isValid, "Error:", empty.error);

// Test 2: Invalid short phone
const shortPhone = validatePhoneNumber("1234");
console.log("Short phone valid:", shortPhone.isValid, "Error:", shortPhone.error);

// Test 3: Invalid Indian phone (starts with 2)
const invalidIndian = validatePhoneNumber("2823012345");
console.log("Invalid Indian phone valid:", invalidIndian.isValid, "Error:", invalidIndian.error);

// Test 4: Valid Indian 10-digit mobile
const validIndian10 = validatePhoneNumber("9823012345");
console.log("Valid Indian 10-digit valid:", validIndian10.isValid);

// Test 5: Valid Indian mobile with +91
const validIndian91 = validatePhoneNumber("+91 98230 12345");
console.log("Valid Indian +91 valid:", validIndian91.isValid);

// Test 6: Valid international phone
const validIntl = validatePhoneNumber("+1 (555) 234-5678");
console.log("Valid international phone valid:", validIntl.isValid);

// Test 7: Zod schema with optional name omitted (Callback)
const parseNoName = callbackRequestSchema.safeParse({ requestType: "callback", phone: "+91 98230 12345" });
console.log("Callback parse (no name) success:", parseNoName.success);

// Test 8: Zod schema with empty string name (Callback)
const parseEmptyName = callbackRequestSchema.safeParse({ requestType: "callback", name: "", phone: "+91 98230 12345" });
console.log("Callback parse (empty name) success:", parseEmptyName.success);

// Test 9: Free Quote without email (should fail)
const parseQuoteNoEmail = callbackRequestSchema.safeParse({
  requestType: "quote",
  phone: "9823012345",
  name: "Amit Patel"
});
console.log("Quote parse without email failure (expected true):", !parseQuoteNoEmail.success);

// Test 10: Free Quote with valid email, phone, optional name, optional tourType
const parseQuoteValid = callbackRequestSchema.safeParse({
  requestType: "quote",
  name: "Amit Patel",
  email: "amit@example.com",
  phone: "9823012345",
  tourType: "international",
  packageSlug: "mtpl-jordan-experience-6n-7d",
  packageName: "Jordan Experience"
});
console.log("Quote parse with all fields success:", parseQuoteValid.success);
