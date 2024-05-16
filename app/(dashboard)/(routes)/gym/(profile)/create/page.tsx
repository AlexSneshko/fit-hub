"use client"

import { z } from "zod"

import { GymForm, gymFormSchema } from "../_components/gym-form"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

const CreateGymPage = () => {
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof gymFormSchema>) => {
        try {
            const response = await axios.post("/api/gyms", values)
            router.push(`/gym/${response.data.username}`)
            toast.success("Gym created")
        } catch (error) {
            toast.error("Failed to create gym")
        }
    }

    return (
        <div className="mx-auto md:px-96">
            <h1 className="text-center text-2xl">Create Gym</h1>
            <GymForm onSubmit={onSubmit} />
        </div>
    )
}

export default CreateGymPage