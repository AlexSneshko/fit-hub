import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { ExercisesGrid } from "./_components/exercises-grid";
import axios from "axios";

const ExercisesPage = async () => {
  return (
    <div className="px-6">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-2xl font-semibold">Exercises</h1>
        <Link href="/exercises/create">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" /> Exercise
          </Button>
        </Link>
      </div>
      <ExercisesGrid />
    </div>
  );
};

export default ExercisesPage;
