"use server"

import database from "@/lib/database"

const getTags = async (): Promise<string[] | null> => {
    try {
        const tags = await database.tag.findMany({})
        const modifiedTags = tags.map(tag => tag.name);
        return modifiedTags;
    } catch (error: unknown) {
        console.log(error);
        return null
    }
}
export default getTags
