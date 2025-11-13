import { $get } from '@/api/request'

export function getHomeGoodsApi(data: any) {
  return $get({
    url: '/home/goods/guessLike',
    data,
  })
}
