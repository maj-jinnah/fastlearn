
export const getSlug = (title) => {
    if (!title) return null;

    const slug = title.toLowerCase().replace(/ /g, -'')
        .replace(/[^\w-]+/g, '');

    return slug;
}