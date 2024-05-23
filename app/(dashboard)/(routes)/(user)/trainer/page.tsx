"use client"

import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/ui/button'

const CreateTrainerPage = () => {
  const router = useRouter()

  const onUpgradeClick = async () => {
    try {
      const response = await axios.post('/api/trainer');
      router.push('/shared-trainings')
      toast.success("You are upgraded to trainer, now you can share trainings!!🎉")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div>
      <h1 className='text-2xl font-semibold'>Become a trainer</h1>
      <Button>
        Upgrage to trainer
      </Button>
    </div>
  )
}

export default CreateTrainerPage