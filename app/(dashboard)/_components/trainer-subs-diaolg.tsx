"use client"

import { Button } from "@/components/ui/button"
import { useProModal } from "@/hooks/use-pro-modal"

export const TrainerSubsDialog = () => {
  const proModal = useProModal();

  return (
    <Button variant="outline" onClick={proModal.onOpen}>Upgrade to Trainer</Button>
  )
}
