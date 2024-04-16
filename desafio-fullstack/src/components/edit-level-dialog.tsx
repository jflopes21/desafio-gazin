import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "./ui/form";
import { toast } from "sonner";

interface Level {
  id: string;
  nivel: string;
}

interface ChildProps {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setLevelState: React.Dispatch<React.SetStateAction<boolean>>;
  levels: Level[];
}

const editLevelSchema = z.object({
  nivelId: z.number(),
  nivel: z.string().optional(),
});

export function EditLevelDialog({
  setState,
  setLevelState,
  levels,
}: ChildProps) {
  const form = useForm<z.infer<typeof editLevelSchema>>({
    resolver: zodResolver(editLevelSchema),
  });

  async function handleEditLevel(data: z.infer<typeof editLevelSchema>) {
    const nivelId = data.nivelId;
    if (nivelId === undefined) {
      toast.warning("Nível que será editado não foi preenchido");
      return;
    }

    const url = `http://localhost:3333/api/niveis/${nivelId}`;
    if (data.nivel === "" || data.nivel === undefined) {
      toast.warning("Nível não foi preenchido");
      return;
    }

    const requestData: any = Object.fromEntries(
      Object.entries(data).filter(([key]) => key !== "nivelId")
    );

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const jsonResponse = await response.json();
    if (response.ok) {
      setLevelState(true);
      setState(true);
      toast.success(jsonResponse.message);
    } else {
      toast.error(jsonResponse.message);
    }
  }

  async function handleDeleteDeveloper(data: z.infer<typeof editLevelSchema>) {
    const nivelId = data.nivelId;
    const url = `http://localhost:3333/api/niveis/${nivelId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();
    if (response.ok) {
      setLevelState(true);
      toast.success(jsonResponse.message);
      return
    } else {
      toast.error(jsonResponse.message);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar/Excluir nível</DialogTitle>
        <DialogDescription>
          Edite ou exclua um nível existente
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleEditLevel)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="nivelId"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center text-right gap-3">
                  <Label htmlFor="level">Nível</Label>
                  {levels && levels.length > 0 ? (
                  <Select
                    onValueChange={(selectedLevel) => {
                      const selected = levels.find(
                        (level) => level.nivel === selectedLevel
                      );
                      if (selected) {
                        field.onChange(selected.id);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="col-span-2" id="level">
                        <SelectValue placeholder="Selecione um nível" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {levels.map((level) => {
                        return (
                          <SelectItem key={level.id} value={level.nivel}>
                            {level.nivel}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  ) : (
                    <Input
                    disabled
                    value={''}
                    placeholder="Não existem níveis cadastrados!"
                    className="col-span-2"
                    id="level"
                  />
                  )}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nivel"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center text-right gap-3">
                  <Label htmlFor="newLevelValue">Novo valor</Label>
                  <Input
                    placeholder="Digite o novo nome do nível"
                    className="col-span-2"
                    {...field}
                    id="newLevelValue"
                  />
                </div>
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                variant="destructive"
                onClick={form.handleSubmit(handleDeleteDeveloper)}
              >
                Excluir
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Editar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
