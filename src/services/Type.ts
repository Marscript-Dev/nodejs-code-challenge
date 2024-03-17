import prisma from '../lib/prisma';
const insertType = async ( Name: string) => {
    return await prisma.type.upsert({
        create:{
            Name: Name,
        },
        where:{
            Name: Name,
        },
        update:{
            Name: Name
        }
    });
}
export { insertType }