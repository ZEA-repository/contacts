//TODO: Сделать для апи fetcher
export const fetcher = async (url: string) => {
  const baseUrl = import.meta.env.VITE_API_URL
  const response = await fetch(`${baseUrl}/${url}`)
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
  return await response.json()
}
