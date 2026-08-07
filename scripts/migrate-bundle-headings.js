const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.cmsPage.findUnique({
    where: { slug: 'fast-track-bundles' },
    include: { sections: true }
  });

  if (!page) {
    console.log('Page fast-track-bundles not found');
    return;
  }

  const bundleSectionsKeys = [
    'taiwanese',
    'international',
    'american',
    'western'
  ];

  for (const section of page.sections) {
    if (bundleSectionsKeys.includes(section.key)) {
      let content = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;
      
      if (content && content.bundles && Array.isArray(content.bundles)) {
        let updated = false;
        
        content.bundles = content.bundles.map(bundle => {
          if (!('whatsIncludedHeading' in bundle)) {
            updated = true;
            return {
              ...bundle,
              modulesTitleFallback: "Choose Any Two Modules",
              whatsIncludedHeading: "What's Included",
              learningOutcomeHeading: "Learning Outcome",
              priceHeading: "Fast-Track Bundle Price",
              savingsHeading: "Savings",
              individualPriceHeading: "Individual Level Price",
              durationHeading: "Course Duration",
              perfectForHeading: "Perfect For"
            };
          }
          return bundle;
        });

        if (updated) {
          await prisma.cmsSection.update({
            where: { id: section.id },
            data: { content: content }
          });
          console.log(`Updated section ${section.key}`);
        } else {
          console.log(`Section ${section.key} already has heading fields.`);
        }
      }
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
