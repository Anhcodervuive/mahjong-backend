const {PrismaClient}=require('@prisma/client'); 
const prisma=new PrismaClient(); 

async function run() { 
  const page = await prisma.cmsPage.findUnique({
    where:{slug:'fast-track-bundles'}, 
    include:{sections:true}
  }); 
  page.sections.forEach(s => { 
    console.log(s.key); 
    if (s.content && s.content.bundles) { 
      s.content.bundles.forEach(b => console.log('  ', b.title, '=>', b.emoji)); 
    } 
  }); 
} 

run().finally(() => prisma.$disconnect());
