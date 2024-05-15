import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { CategoryForm } from "./_components/category-form";

const SharedTrainingIdPage = async ({ params }: {
    params: {
       sharedTrainingId: string
    }
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/")
  }

  const training = await db.training.findUnique({
    where: {
      id: params.sharedTrainingId
    }
  })

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  })

  if(!training) {
    redirect("/")
  }

  const requiredFields = [
    training.title,
    training.description,
  ]

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">
            Training setup
          </h1>
          <span className="text-sm text-slate-700">
            Complete all fields: {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">
              Customize you training
            </h2>
          </div>
          <TitleForm
            initialData={training}
            trainingId={training.id}
          />
          <DescriptionForm 
            initialData={training}
            trainingId={training.id}
          />
          <CategoryForm
            initialData={training}
            trainingId={training.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id
            }))}
          />
        </div>
      </div>
    </div>
  )
}

export default SharedTrainingIdPage