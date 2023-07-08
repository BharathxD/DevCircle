import { type MetadataRoute } from "next"

import siteConfig from "@/config"
import database from "@/lib/database"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const postsData = await database.post.findMany();
    const forumData = await database.forum.findMany();

    const posts = postsData.map((post) => ({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        url: `${siteConfig.url}/d/${forumData.find(forum => forum.id === post.forumId)!.name}/${post.id}`,
        lastModified: post.updatedAt.toISOString()
    }))

    const forums = forumData.map(forum => ({
        url: `${siteConfig.url}/d/${forum.name}`,
        lastModified: forum.updatedAt.toISOString()
    }))

    const routes = [
        "",
        "/home",
        "/leaderboard",
    ].map((route) => ({
        url: `${siteConfig.url}${route}`,
        lastModified: new Date().toISOString(),
    }))

    return [...routes, ...posts, ...forums]
}