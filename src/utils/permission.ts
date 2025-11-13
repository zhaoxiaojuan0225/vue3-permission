import router from '@/router'
export const checkPermission = (el: any, binding: any) => {
  let routerBtn: string[] = router.currentRoute.value.meta.btn as string[]
  let currentBtn: string = binding.value
  if (!routerBtn.includes(currentBtn)) {
    el.remove()
  }
}
