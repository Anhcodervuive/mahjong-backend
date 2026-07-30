import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Join Circle CMS page...');

  // Create or update the CmsPage for 'join-circle'
  const page = await prisma.cmsPage.upsert({
    where: { slug: 'join-circle' },
    update: { title: 'Join Circle' },
    create: {
      slug: 'join-circle',
      title: 'Join Circle',
      metaTitle: 'Join a Circle - Mahjong Success',
      metaDescription: 'Tell us about yourself and your availability. We will match you with a group that fits.',
    },
  });

  // Create or update the Hero section
  await prisma.cmsSection.upsert({
    where: {
      pageId_key: {
        pageId: page.id,
        key: 'hero'
      }
    },
    update: {
      content: {
        heroTitle: 'Join a Circle',
        heroSubtitle: 'Tell us about yourself and your availability. We\'ll match you with a group that fits and reach out within a few days.',
      }
    },
    create: {
      pageId: page.id,
      key: 'hero',
      name: 'Hero Section',
      content: {
        heroTitle: 'Join a Circle',
        heroSubtitle: 'Tell us about yourself and your availability. We\'ll match you with a group that fits and reach out within a few days.',
      },
      order: 1,
    }
  });

  // Create or update the Invite Friend section
  await prisma.cmsSection.upsert({
    where: {
      pageId_key: {
        pageId: page.id,
        key: 'invite-friend'
      }
    },
    update: {
      content: {
        inviteTitle: 'Invite a Friend to Join the Mahjong Success Circle',
        inviteText: 'Mahjong is always more enjoyable when shared with friends, family, and fellow enthusiasts.\n\nDo you know someone who would enjoy learning Mahjong, joining our guided games, attending our social events, or becoming part of the Mahjong Success Circle?\n\nSimply complete the form below with their details, and we will send them an invitation to learn more about Mahjong Success and our upcoming activities.\n\nWhether they are complete beginners or experienced players looking for a friendly community, we would be delighted to welcome them.\n\nLet\'s grow our Mahjong Success community — one player at a time.',
      }
    },
    create: {
      pageId: page.id,
      key: 'invite-friend',
      name: 'Invite Friend Section',
      content: {
        inviteTitle: 'Invite a Friend to Join the Mahjong Success Circle',
        inviteText: 'Mahjong is always more enjoyable when shared with friends, family, and fellow enthusiasts.\n\nDo you know someone who would enjoy learning Mahjong, joining our guided games, attending our social events, or becoming part of the Mahjong Success Circle?\n\nSimply complete the form below with their details, and we will send them an invitation to learn more about Mahjong Success and our upcoming activities.\n\nWhether they are complete beginners or experienced players looking for a friendly community, we would be delighted to welcome them.\n\nLet\'s grow our Mahjong Success community — one player at a time.',
      },
      order: 2,
    }
  });

  console.log('Successfully seeded Join Circle CMS page.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
