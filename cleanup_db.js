const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const page = await prisma.cmsPage.findUnique({ where: { slug: 'fast-track-bundles' }, include: { sections: true } });
  const contentSection = page.sections.find(s => s.key === 'fast-track-bundles_content');
  if (contentSection) {
    const content = typeof contentSection.content === 'string' ? JSON.parse(contentSection.content) : contentSection.content;
    delete content.INTERNATIONAL_BUNDLES;
    delete content.AMERICAN_BUNDLES;
    delete content.WESTERN_BUNDLES;
    delete content.TAIWANESE_BUNDLES;
    delete content.DEFAULT_INTERNATIONAL_BUNDLES;
    delete content.DEFAULT_AMERICAN_BUNDLES;
    delete content.DEFAULT_WESTERN_BUNDLES;
    delete content.DEFAULT_TAIWANESE_BUNDLES;
    await prisma.cmsSection.update({
      where: { id: contentSection.id },
      data: { content }
    });
    console.log('Cleaned up fast-track-bundles content section!');
  }

  // Also clean up points-calculator
  const pcPage = await prisma.cmsPage.findUnique({ where: { slug: 'points-calculator' }, include: { sections: true } });
  if (pcPage) {
    const pcContent = pcPage.sections.find(s => s.key === 'points-calculator_content');
    if (pcContent) {
      const content = typeof pcContent.content === 'string' ? JSON.parse(pcContent.content) : pcContent.content;
      delete content.SCORING_DATA;
      delete content.DEFAULT_SCORING_DATA;
      await prisma.cmsSection.update({
        where: { id: pcContent.id },
        data: { content }
      });
      console.log('Cleaned up points-calculator content section!');
    }
  }

  // Also clean up events
  const eventsPage = await prisma.cmsPage.findUnique({ where: { slug: 'events' }, include: { sections: true } });
  if (eventsPage) {
    const evContent = eventsPage.sections.find(s => s.key === 'events_content');
    if (evContent) {
      const content = typeof evContent.content === 'string' ? JSON.parse(evContent.content) : evContent.content;
      delete content.OFFERINGS;
      delete content.MANIA_FOR;
      delete content.MANIA_SERVICES;
      delete content.THINKING_BENEFITS;
      delete content.THINKING_IDEAL;
      delete content.THINKING_PROGRAMMES;
      delete content.DEFAULT_OFFERINGS;
      delete content.DEFAULT_MANIA_FOR;
      delete content.DEFAULT_MANIA_SERVICES;
      delete content.DEFAULT_THINKING_BENEFITS;
      delete content.DEFAULT_THINKING_IDEAL;
      delete content.DEFAULT_THINKING_PROGRAMMES;
      await prisma.cmsSection.update({
        where: { id: evContent.id },
        data: { content }
      });
      console.log('Cleaned up events content section!');
    }
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
