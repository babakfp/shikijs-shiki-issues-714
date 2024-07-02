export const load = () => {
    const posts = import.meta.glob(["/**/*.md"], {
        eager: true,
    })

    return {
        // @ts-expect-error
        posts: Object.values(posts).map((post) => post.default),
    }
}
