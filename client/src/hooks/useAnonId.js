export default function useAnonId() {
  const key = 'investmate_anon_id'
  let id = localStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)
    localStorage.setItem(key, id)
  }
  return id
}
