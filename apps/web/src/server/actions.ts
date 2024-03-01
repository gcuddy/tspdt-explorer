'use server';
import { client } from '@/lib/hono';
import { getAuthHeaders } from './data-layer';
import { revalidatePath } from 'next/cache';

export async function markAsSeen(id: string) {
    await client.movie[":id"].interaction.$post({ param: { id }, form: { timeSeen: String(new Date()) } }, { headers: await getAuthHeaders() });
    revalidatePath(`/movie/${id}`);
}
