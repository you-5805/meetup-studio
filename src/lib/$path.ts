export const pagesPath = {
  "app": {
    $url: (url?: { hash?: string }) => ({ pathname: '/app' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  _gitkeep: '/.gitkeep',
  img: {
    info_svg: '/img/info.svg'
  }
} as const

export type StaticPath = typeof staticPath
