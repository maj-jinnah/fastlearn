import 'server-only';

import { auth } from '@/auth';
import { getUserByEmail } from '@/queries/user';
import { dbConnection } from '@/service/dbConnection';

export async function getLoggedInUser() {
    await dbConnection();
    const session = await auth();
    if (!session?.user?.email) {
        return null;
    }
    return await getUserByEmail(session?.user?.email);
}