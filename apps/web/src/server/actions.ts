'use server';
import { client } from '@/lib/hono';
import { getAuthHeaders } from './data-layer';
import { revalidatePath } from 'next/cache';

export async function markAsSeen(id: string, unmark = false, alwaysRevalidate = false) {
    try {
        await client.movie[":id"].interaction.$post({
            param: { id },
            json: { timeSeen: unmark ? null : new Date() }
        },
            { headers: await getAuthHeaders() });
    } catch (e) {
        console.error(e);
        revalidatePath(`/movie/${id}`);
    }
    revalidatePath(`/me`);
}

export async function toggleWatchlist(id: string, remove = false, alwaysRevalidate = false) {
    try {
        await client.movie[":id"].interaction.$post({
            param: { id },
            json: { timeAdded: remove ? null : new Date() }
        },
            { headers: await getAuthHeaders() });
    } catch (e) {
        console.error(e);
        revalidatePath(`/movie/${id}`);
    }
    revalidatePath(`/me`);
}

export async function toggleFavorite(id: string, remove = false, alwaysRevalidate = false) {
    try {
        await client.movie[":id"].interaction.$post({
            param: { id },
            json: { timeFavorited: remove ? null : new Date() }
        },
            { headers: await getAuthHeaders() });
    } catch (e) {
        console.error(e);
        revalidatePath(`/movie/${id}`);
    }
    revalidatePath(`/me`);
}
