export const pagesPath = {
  "$404": {
    $url: (url?: { hash?: string }) => ({ pathname: '/404' as const, hash: url?.hash })
  },
  "app": {
    "room": {
      _id: (id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/app/room/[id]' as const, query: { id }, hash: url?.hash })
      })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/app' as const, hash: url?.hash })
  },
  "terms": {
    $url: (url?: { hash?: string }) => ({ pathname: '/terms' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  _DS_Store: '/.DS_Store',
  _gitkeep: '/.gitkeep',
  favicon_ico: '/favicon.ico',
  img: {
    apple_touch_icon_png: '/img/apple-touch-icon.png',
    cafe_png: '/img/cafe.png',
    github_svg: '/img/github.svg',
    google_svg: '/img/google.svg',
    icon_svg: '/img/icon.svg',
    logo_png: '/img/logo.png'
  }
} as const

export type StaticPath = typeof staticPath
