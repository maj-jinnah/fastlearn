import 'server-only';

import { auth } from '@/auth';
import { getUserByEmail } from '@/queries/user';

export async function getLoggedInUser() {
    const session = await auth();
    if (!session?.user?.email) {
        return null;
    }
    return await getUserByEmail(session?.user?.email);
}