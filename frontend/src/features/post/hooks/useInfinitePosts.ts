import { useRef, useCallback } from "react"

export default function useInfinitePosts(callback: () => void) {
  const observer = useRef<IntersectionObserver | null>(null)

  const refCallback = useCallback((node: Element | null) => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback()
      }
    })

    if (node) observer.current.observe(node)
  }, [callback])

  return refCallback
}