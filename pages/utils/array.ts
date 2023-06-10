export const shuffled = (list: number[]) => {
  return list.sort(() => Math.random() - 0.5)
}