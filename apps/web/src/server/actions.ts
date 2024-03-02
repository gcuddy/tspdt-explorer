'use server';
import { client } from '@/lib/hono';
import { getAuthHeaders } from './data-layer';
import { revalidatePath } from 'next/cache';

export async function markAsSeen(id: string, unmark = false) {
    console.log({ id, unmark });
    console.log("date", new Date());
    try {
        const res = await client.movie[":id"].interaction.$post({
            param: { id },
            json: { timeSeen: unmark ? null : new Date() }
        },
            { headers: await getAuthHeaders() });
        console.log({ res });
    } catch (e) {
        console.error(e);
    }
    revalidatePath(`/movie/${id}`);
}
