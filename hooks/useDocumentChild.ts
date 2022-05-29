import { useEffect, useRef } from 'react'

export function useDocumentChild(modalContainerId: string) {
  const modalInstance = useRef<HTMLDivElement | null>(null)

  if (!modalInstance.current) {
    modalInstance.current = document.createElement('div')
  }

  useEffect(() => {
    const modalContainer = document.getElementById(modalContainerId)
    if (!modalContainer) {
      const missingModalContainer = document.createElement('div')
      missingModalContainer.setAttribute('id', modalContainerId)
      document.body.appendChild(missingModalContainer)
      modalInstance.current &&
        missingModalContainer.appendChild(modalInstance.current)
    } else {
      modalInstance.current && modalContainer.appendChild(modalInstance.current)
    }

    return () => {
      modalInstance.current && modalInstance.current.remove()
    }
  }, [modalContainerId])

  return modalInstance.current
}
