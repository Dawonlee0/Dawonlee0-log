export const queryKey = {
  SCHEME: 'scheme',
  POSTS: 'posts',
  POST: 'post',
  TAGS: 'tags',
  CATEGORIES: 'categories',

  // 이전 방식 지원
  scheme: () => ['scheme'],
  posts: () => ['posts'],
  tags: () => ['tags'],
  categories: () => ['categories'],
  post: (slug: string) => ['post', slug],
}
