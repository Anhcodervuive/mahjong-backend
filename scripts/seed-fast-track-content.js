const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.cmsPage.findUnique({
    where: { slug: 'fast-track-bundles' }
  });

  if (!page) {
    console.log('Page fast-track-bundles not found');
    return;
  }

  // Check if content section already exists
  const existingSection = await prisma.cmsSection.findFirst({
    where: {
      pageId: page.id,
      key: 'fast-track-bundles_content'
    }
  });

  if (!existingSection) {
    // Create new content section
    await prisma.cmsSection.create({
      data: {
        pageId: page.id,
        key: 'fast-track-bundles_content',
        type: 'json',
        order: 1, // Usually hero is 0
        content: {
          whatsIncludedHeading: "What's Included",
          learningOutcomeHeading: "Learning Outcome",
          priceHeading: "Fast-Track Bundle Price",
          savingsHeading: "Savings",
          individualPriceHeading: "Individual Level Price",
          durationHeading: "Course Duration",
          perfectForHeading: "Perfect For",
          modulesTitleFallback: "Choose Any Two Modules"
        }
      }
    });
    console.log('Created fast-track-bundles_content section');
  } else {
    // Merge existing content with new keys if they are missing
    let currentContent = existingSection.content || {};

    const newContent = {
        whatsIncludedHeading: currentContent.whatsIncludedHeading || "What's Included",
        learningOutcomeHeading: currentContent.learningOutcomeHeading || "Learning Outcome",
        priceHeading: currentContent.priceHeading || "Fast-Track Bundle Price",
        savingsHeading: currentContent.savingsHeading || "Savings",
        individualPriceHeading: currentContent.individualPriceHeading || "Individual Level Price",
        durationHeading: currentContent.durationHeading || "Course Duration",
        perfectForHeading: currentContent.perfectForHeading || "Perfect For",
        modulesTitleFallback: currentContent.modulesTitleFallback || "Choose Any Two Modules"
    };

    await prisma.cmsSection.update({
        where: { id: existingSection.id },
        data: {
            content: newContent
        }
    });
    console.log('Updated fast-track-bundles_content section');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
