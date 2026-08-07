const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.cmsPage.findUnique({
    where: { slug: 'fast-track-bundles' },
    include: { sections: true }
  });

  if (!page) {
    console.log('Page not found');
    return;
  }

  const bundleSectionsKeys = ['taiwanese', 'international', 'american', 'western'];

  const logicalOrder = [
    'id', 'emoji', 'title', 'subtitle', 'tagline', 'body',
    'modulesTitleFallback', 'modulesTitle', 'modules',
    'whatsIncludedHeading', 'includes',
    'learningOutcomeHeading', 'outcome',
    'priceHeading', 'regularPrice', 'bundlePrice',
    'savingsHeading', 'saving', 'savingsDetails',
    'pricingNote',
    'individualPriceHeading', 'individualPricing',
    'perfectForHeading', 'perfectFor',
    'durationHeading', 'courseDuration',
    'cta'
  ];

  for (const section of page.sections) {
    if (bundleSectionsKeys.includes(section.key)) {
      let content = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;
      
      if (content && content.bundles && Array.isArray(content.bundles)) {
        content.bundles = content.bundles.map(bundle => {
          const newBundle = {};
          
          for (const key of logicalOrder) {
            if (key in bundle) {
              newBundle[key] = bundle[key];
            }
          }
          
          for (const key in bundle) {
            if (!(key in newBundle)) {
              newBundle[key] = bundle[key];
            }
          }
          
          return newBundle;
        });

        await prisma.cmsSection.update({
          where: { id: section.id },
          data: { content: content }
        });
        console.log(`Reordered keys for section ${section.key}`);
      }
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
