import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const createLevelSchema = z.object({
  nivel: z.string(),
});

type CreateLevelSchema = z.infer<typeof createLevelSchema>;

interface ChildProps {
  setLevelState: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateLevelDialog({ setLevelState }: ChildProps) {
  const { register, handleSubmit } = useForm<CreateLevelSchema>({
    resolver: zodResolver(createLevelSchema),
  });

  async function handleCreateLevel(data: CreateLevelSchema) {
    const response = await fetch("http://localhost:3333/api/niveis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();
    if (response.ok) {
      setLevelState(true);
      toast.success(jsonResponse.message);
    } else {
      toast.error(jsonResponse.message);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo nível</DialogTitle>
        <DialogDescription>Criar novo nível</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateLevel)} className="space-y-8">
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="level">Nível</Label>
          <Input id="level" className="col-span-3" {...register("nivel")} />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Salvar</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
