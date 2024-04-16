import {
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
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
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { toast } from "sonner";

interface Developer {
  id: string;
  nome: string;
  nivel: string;
  datanascimento: string;
  idade: number;
  sexo: string;
  hobby: string;
}

const editDeveloperSchema = z.object({
  nome: z.string().optional(),
  nivelId: z.number().optional(),
  sexo: z.string().optional(),
  datanascimento: z.string().optional(),
  hobby: z.string().optional(),
});

interface Level {
  id: string;
  nivel: string;
}

interface EditDeveloperProps {
  developer: Developer;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setLevelState: React.Dispatch<React.SetStateAction<boolean>>;
  levels: Level[];
}

export function EditDeveloper({ developer, setState, setLevelState, levels }: EditDeveloperProps) {
  const [formattedDateOfBirth, setFormattedDateOfBirth] = useState<string>("");
  const formatBirthDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const options = { timeZone: "America/Sao_Paulo" };
    const formattedDate = date.toLocaleDateString("pt-BR", options);
    return formattedDate;
  };
  useEffect(() => {
    if (developer.datanascimento) {
      const formattedDate = formatBirthDate(developer.datanascimento);
      setFormattedDateOfBirth(formattedDate);
    }
  }, [developer.datanascimento]);

  const [formattedDate, setFormattedDate] = useState("");
  function formatDate(inputDate: string): string {
    const [day, month, year] = inputDate.split("/");
    if (day && month && year) {
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;
      return formattedDate;
    } else {
      return inputDate;
    }
  }

  const form = useForm<z.infer<typeof editDeveloperSchema>>({
    resolver: zodResolver(editDeveloperSchema),
  });

  async function handleUpdateDeveloper(
    data: z.infer<typeof editDeveloperSchema>
  ) {
    const developerId = developer.id;
    const url = `http://localhost:3333/api/desenvolvedores/${developerId}`;
    let method: string = "PUT";
    if (
      data.nome === undefined ||
      data.nivelId === undefined ||
      data.datanascimento === undefined ||
      data.hobby === undefined ||
      data.sexo === undefined
    ) {
      method = "PATCH";
    }

    const requestData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined)
    );

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const jsonResponse = await response.json();
    if (response.ok) {
      setState(true);
      setLevelState(true);
      toast.success(jsonResponse.message);
    } else {
      toast.error(jsonResponse.message);
    }
  }

  async function handleDeleteDeveloper() {
    const developerId = developer.id;
    const url = `http://localhost:3333/api/desenvolvedores/${developerId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();
    if (response.ok) {
      setState(true);
      toast.success(jsonResponse.message);
    } else {
      toast.error(jsonResponse.message);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar/Excluir desenvolvedor</DialogTitle>
        <DialogDescription>Edite as informações desejadas ou exclua o registro</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateDeveloper)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center text-right gap-3">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    placeholder={developer.nome}
                    className="col-span-3"
                    {...field}
                    id="name"
                  />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nivelId"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center text-right gap-3">
                  <Label htmlFor="level">Nível</Label>
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
                        <SelectValue placeholder={developer.nivel} />
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
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="datanascimento"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center text-right gap-3">
                  <Label htmlFor="birthDate">Nascimento</Label>
                  <Input
                    id="birthDate"
                    placeholder={formattedDateOfBirth}
                    className="col-span-2"
                    {...field}
                    value={formattedDate}
                    onChange={(e) => {
                      const inputDate = e.target.value;
                      const formattedDate = formatDate(inputDate);
                      setFormattedDate(inputDate);
                      field.onChange(formattedDate);
                    }}
                  />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sexo"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center text-right gap-3">
                  <Label htmlFor="gender">Sexo</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="col-span-2" id="gender">
                        <SelectValue
                          placeholder={
                            developer.sexo === "F" ? "Feminino" : "Masculino"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="F">Feminino</SelectItem>
                      <SelectItem value="M">Masculino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hobby"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center text-right gap-3">
                  <Label htmlFor="hobby">Hobby</Label>
                  <Input
                    id="hobby"
                    placeholder={developer.hobby}
                    className="col-span-2"
                    {...field}
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
              <Button onClick={handleDeleteDeveloper} variant="destructive">
                Excluir
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Salvar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
