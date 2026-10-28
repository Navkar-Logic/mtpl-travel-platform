import * as fs from 'fs';
import * as path from 'path';
import { authoritativePackages } from '../src/features/packages/data/packages';

interface PackagePromptInfo {
  index: number;
  id: string;
  slug: string;
  title: string;
  destination: string;
  category: string;
  duration: string;
  targetFilename: string;
  targetPath: string;
  prompt: string;
  status: 'Already Generated (Active in folder)' | 'Pending User Generation';
}

const aiGeneratedSlugs = new Set([
  'mtpl-jordan-experience-6n-7d',
  'mtpl-jordan-family-holiday-6n-7d',
  'mtpl-jordan-honeymoon-escape-4n-5d',
  'mtpl-jordan-treasures-7n-8d',
  'mtpl-magic-of-jordan-4n-5d',
  'mtpl-wonders-of-dubai-5n-6d',
  'mtpl-exclusive-dubai-abu-dhabi-6n-7d',
  'mtpl-jewels-of-japan-cherry-blossom-7n-8d',
  'mtpl-phnom-penh-highlights-2n-3d',
  'mtpl-siem-reap-heritage-experience-2n-3d',
  'mtpl-siem-reap-mt-kulen-3n-4d',
  'mtpl-siem-reap-phnom-penh-culture-4n-5d',
  'mtpl-siem-reap-phnom-penh-heritage-4n-5d',
]);

const destinationSpecificDetails: Record<string, string> = {
  Andaman: "pristine white sand beach of Havelock Island or Radhanagar Beach, turquoise Andaman Sea, lush tropical coconut palms, wooden traditional longtail boat on gentle waves, radiant tropical sunshine",
  Himachal: "snow-capped Himalayan mountain peaks above Shimla and Manali, fragrant deodar and pine forests, charming wooden traditional Himachali cottage, misty morning alpine valley",
  Kashmir: "iconic Dal Lake in Srinagar with traditional carved wooden Shikara boat with colorful canopies floating among blooming water lilies, snow-capped Zabarwan mountain range, golden sunrise light",
  Kerala: "tranquil Kerala backwaters of Alleppey with traditional thatched houseboat (kettuvallam) cruising past lush emerald green coconut groves, water palms, and scenic village shores at sunset",
  "North East": "living root bridges of Cherrapunji or cascading Nohkalikai waterfall in Meghalaya, mist-shrouded green hills, lush subtropical rainforest canopy, authentic Khasi hills",
  "South India": "majestic Dravidian temple tower (gopuram) of Madurai Meenakshi or Brihadisvara Temple with intricate polychrome stone carvings, morning oil lamps, grand Indian sacred heritage",
  Karnataka: "misty lush green coffee plantations of Coorg with silver oak shade trees, or stone chariot and monumental boulders of Hampi ruins under clear azure sky",
  Maharashtra: "ancient rock-cut Buddhist and Hindu caves of Ellora and monolithic Kailasa Temple in Aurangabad, intricate carved basalt rock facade, warm golden afternoon sun",
  "Madhya Pradesh": "majestic Royal Bengal Tiger in the wild sal forest of Kanha or Bandhavgarh National Park, dramatic morning jungle light rays, untamed central Indian wildlife grandeur",
  Odisha: "colossal stone chariot wheels and sun temple sculptures of Konark Sun Temple or golden sea beach of Puri at sunrise with traditional fishing boats",
  Rajasthan: "magnificent golden sandstone palace of Udaipur Lake Palace floating on calm Lake Pichola, or majestic Amber Fort in Jaipur with royal sandstone arches at sunset",
  Gujarat: "gleaming white endless salt desert of the Great Rann of Kutch under a vibrant sunset, traditional Kutchi embroidery tents and desert camel cart",
  "Uttar Pradesh": "iconic white marble Taj Mahal in Agra reflected in the Yamuna River at sunrise with soft pink and golden dawn light, or spiritual evening Ganga Aarti at Varanasi ghats",
  Bhutan: "Tiger's Nest Monastery (Paro Taktsang) clinging to a sheer granite cliff edge high above a mist-filled Himalayan pine forest valley, colorful prayer flags fluttering",
  Nepal: "majestic snow-capped peaks of Mount Everest and Annapurna range rising above Kathmandu Valley with ancient pagoda temples and golden prayer stupas",
  "Sri Lanka": "ancient Sigiriya Lion Rock fortress rising dramatically above emerald jungle canopy at sunrise, or colonial train crossing the Nine Arch Bridge amidst Ceylon tea plantations",
  Jordan: "monumental Treasury at Petra carved into rose-red sandstone cliffs, or dramatic red dunes and sandstone monoliths of Wadi Rum desert with luxury Bedouin camp",
  Cambodia: "ancient Angkor Wat temple reflection in sacred lotus pond at sunrise, or smiling stone faces of Bayon Temple surrounded by jungle banyan roots",
  Dubai: "futuristic downtown Dubai skyline at golden twilight with illuminated Burj Khalifa, Dubai Fountain show and luxury yachts on Dubai Marina",
  Japan: "iconic snow-capped Mount Fuji framed by blooming pink Sakura cherry blossoms and five-storied red Chureito Pagoda in morning spring light"
};

const result: PackagePromptInfo[] = authoritativePackages.map((pkg, idx) => {
  const highlights = pkg.highlights && pkg.highlights.length > 0
    ? pkg.highlights.slice(0, 3).join(', ')
    : '';

  const destContext = destinationSpecificDetails[pkg.destination] || `scenic travel highlights of ${pkg.destination}`;
  const subject = highlights ? `${pkg.title} (${highlights})` : pkg.title;

  const prompt = `Professional editorial travel photograph of ${subject} in ${pkg.destination}. Featuring ${destContext}. Cinematic wide-angle composition, golden hour natural lighting, authentic vibrant atmosphere, ultra-high resolution 8k, crisp focus, magazine cover quality, 16:9 aspect ratio.`;

  return {
    index: idx + 1,
    id: pkg.id,
    slug: pkg.slug,
    title: pkg.title,
    destination: pkg.destination,
    category: pkg.category || 'national',
    duration: pkg.duration,
    targetFilename: `${pkg.slug}.webp`,
    targetPath: `storage/media/public/${pkg.slug}.webp`,
    prompt,
    status: aiGeneratedSlugs.has(pkg.slug) ? 'Already Generated (Active in folder)' : 'Pending User Generation',
  };
});

// Output JSON file
const outJsonPath = path.resolve('scratch/all_package_prompts.json');
fs.writeFileSync(outJsonPath, JSON.stringify(result, null, 2), 'utf-8');

// Output clean Markdown file for easy reading
let md = `# MTPL Holiday Packages — Complete Image Generation & Deployment Guide\n\n`;
md += `**Target Directory:** \`F:\\Navkar Logic Client Projects\\mtpl-travel-platform\\storage\\media\\public\\\`\n`;
md += `**Total Packages:** 93 (67 National, 26 International)\n`;
md += `**Image Format:** \`.webp\` (or \`.jpg\`) in **16:9** or **16:10** aspect ratio (e.g. 1920x1080 or 1600x1000)\n\n`;
md += `### Quick Instructions:\n`;
md += `1. Copy any prompt below into Midjourney, DALL-E 3, Gemini, or your preferred AI image generator.\n`;
md += `2. Save the output image with the exact **Target Filename** indicated.\n`;
md += `3. Place the file directly into \`storage/media/public/\`.\n`;
md += `4. The website will immediately display the new photo with zero code changes required!\n\n`;
md += `---\n\n`;

md += `## 1. International Packages (26 Packages)\n\n`;
const intl = result.filter(p => p.category === 'international');
intl.forEach((p) => {
  md += `### #${p.index}. ${p.title} (${p.duration})\n`;
  md += `- **Destination:** ${p.destination}\n`;
  md += `- **Target Filename:** \`${p.targetFilename}\`\n`;
  md += `- **Status:** ${p.status === 'Already Generated (Active in folder)' ? '✅ **Active in folder**' : '⏳ **Pending Generation**'}\n`;
  md += `- **AI Generation Prompt:**\n`;
  md += `> \`${p.prompt}\`\n\n`;
});

md += `---\n\n`;
md += `## 2. National Packages (67 Packages)\n\n`;
const national = result.filter(p => p.category === 'national');
national.forEach((p) => {
  md += `### #${p.index}. ${p.title} (${p.duration})\n`;
  md += `- **Destination:** ${p.destination}\n`;
  md += `- **Target Filename:** \`${p.targetFilename}\`\n`;
  md += `- **Status:** ${p.status === 'Already Generated (Active in folder)' ? '✅ **Active in folder**' : '⏳ **Pending Generation**'}\n`;
  md += `- **AI Generation Prompt:**\n`;
  md += `> \`${p.prompt}\`\n\n`;
});

const outMdPath = path.resolve('package_image_generation_guide.md');
fs.writeFileSync(outMdPath, md, 'utf-8');
console.log(`Successfully generated package image guide with ${result.length} packages!`);
