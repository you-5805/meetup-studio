export const pagesPath = {
  "app": {
    "room": {
      _id: (id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/app/room/[id]' as const, query: { id }, hash: url?.hash })
      })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/app' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  _gitkeep: '/.gitkeep',
  img: {
    github_svg: '/img/github.svg',
    google_svg: '/img/google.svg'
  }
} as const

export type StaticPath = typeof staticPath
