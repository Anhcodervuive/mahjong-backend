const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() { 
  const page = await prisma.cmsPage.findUnique({
    where:{slug:'fast-track-bundles'}, 
    include:{sections:true}
  }); 
  const sec = page.sections.find(s=>s.key==='american'); 
  const bundles = sec.content.bundles; 
  bundles[0].emoji = '🇺🇸'; 
  bundles[1].emoji = '🃏'; 
  await prisma.cmsSection.update({
    where:{id:sec.id}, 
    data:{content:{...sec.content, bundles}}
  }); 
  console.log('Updated American Bundles Emojis'); 
} 

run().catch(console.error).finally(()=>prisma.$disconnect());
