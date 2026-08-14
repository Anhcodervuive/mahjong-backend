const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const INTERNATIONAL_EMOJIS = ["🚀", "🀄", "🤝", "🎭", "🀄"];
const AMERICAN_EMOJIS = ["🇺🇸", "🃏"];
const WESTERN_EMOJIS = ["🌍", "🏆"];
const TAIWANESE_EMOJIS = ["🇹🇼", "🎯"];

async function run() { 
  const page = await prisma.cmsPage.findUnique({
    where:{slug:'fast-track-bundles'}, 
    include:{sections:true}
  }); 

  for (const sec of page.sections) {
    if (!sec.content || !sec.content.bundles) continue;
    
    const bundles = sec.content.bundles;
    
    let emojiList = [];
    if (sec.key === 'international') emojiList = INTERNATIONAL_EMOJIS;
    if (sec.key === 'american') emojiList = AMERICAN_EMOJIS;
    if (sec.key === 'western') emojiList = WESTERN_EMOJIS;
    if (sec.key === 'taiwanese') emojiList = TAIWANESE_EMOJIS;

    if (emojiList.length > 0) {
      for (let i = 0; i < bundles.length; i++) {
        if (emojiList[i]) {
          bundles[i].emoji = emojiList[i];
        }
      }
      await prisma.cmsSection.update({
        where:{id:sec.id}, 
        data:{content:{...sec.content, bundles}}
      }); 
      console.log(`Updated emojis for ${sec.key}`);
    }
  }
} 

run().catch(console.error).finally(()=>prisma.$disconnect());
