import type { coordinatesType } from "@/ts/type/index";
//获取一个组件的中心坐标，传入组件类型为object类型，输出的是一个坐标类型，里面两个属性一个x,一个y均为number
export function get_current_item_coordinates(item: object): coordinatesType {
  const rect = (item as HTMLElement).getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  return { x, y }
}
