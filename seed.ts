// seed.ts
import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    //create default roles
    const userRoles = ['GUEST', 'USER', 'ADMIN', 'MANAGER']
    for (const role of userRoles) {
        await prisma.userRole.create({
            data: { name: role }
        })
    }


    // Create default permissions
    const permissions = ['READ', 'WRITE', 'DELETE'];
    for (const permission of permissions) {
        await prisma.permission.create({
            data: { name: permission },
        });
    }

   //Assign permission to role
   const adminPermissions = ['READ', 'WRITE', 'DELETE'];
   const adminRole = await prisma.userRole.findUnique({ where: { name: 'ADMIN' } });
   for (const permissionName of adminPermissions) {
    const permission = await prisma.permission.findUnique({ where: { name: permissionName } });
    if (permission && adminRole) {
      await prisma.rolePermission.create({
        data: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      });
    }
  }


    // Create a default admin user
    await prisma.user.create({
        data: {
            phone: 'qaz',
            name: 'Admin',
            chatId: '111',
            password: (await bcrypt.hash('aezakmi', await bcrypt.genSalt())),
            roleId: (await prisma.userRole.findUnique({ where: {name: 'ADMIN'}})).id
        },
    });

    console.log('Database has been seeded');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
