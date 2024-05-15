import { Button } from "@/components/ui/button";
import Link from "next/link";

const SharedTrainingsPage = () => {
  return (
    <div className="p-6">
      <Link href="/trainer/sharedTrainings/create">
        <Button>New Shared Training</Button>
      </Link>
    </div>
  );
};

export default SharedTrainingsPage;
