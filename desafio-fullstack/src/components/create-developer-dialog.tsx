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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { toast } from "sonner";

const createDeveloperSchema = z.object({
  nome: z.string().nonempty({ message: "O nome é obrigatório" }),
  nivelId: z.number(),
  sexo: z.string(),
  datanascimento: z.string(),
  hobby: z.string(),
});

interface Level {
  id: string;
  nivel: string;
}

interface ChildProps {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setLevelState: React.Dispatch<React.SetStateAction<boolean>>;
  levels: Level[];
}

export function CreateDeveloperDialog({
  setState,
  setLevelState,
  levels,
}: ChildProps) {
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

  const [formattedDate, setFormattedDate] = useState("");

  const form = useForm<z.infer<typeof createDeveloperSchema>>({
    resolver: zodResolver(createDeveloperSchema),
  });

  async function handleCreateDeveloper(
    data: z.infer<typeof createDeveloperSchema>
  ) {
    const response = await fetch("http://localhost:3333/api/desenvolvedores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo desenvolvedor</DialogTitle>
        <DialogDescription>Criar um novo desenvolvedor</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateDeveloper)}
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
                    id="name"
                    placeholder="Digite o nome do Desenvolvedor"
                    className="col-span-3"
                    {...field}
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
                    placeholder="Ex: 21/08/2002"
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
                        <SelectValue placeholder="Selecione o gênero" />
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
                    placeholder="Hobby"
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
              <Button type="submit">Salvar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

// export function CreateDeveloperDialog() {
//   const [levels, setLevels] = useState<Level[]>([]);
//   useEffect(() => {
//     const url = new URL("http://localhost:3333/api/niveis");
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         setLevels(data);
//       });
//   }, []);

//   async function handleCreateDeveloper(data: CreateDeveloperSchema) {
//     console.log(data);
//     const response = await fetch("http://localhost:3333/api/desenvolvedores", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (response.ok) {
//       console.log("Desenvolvedor cadastrado com sucesso!");
//     }
//   }

//   return (
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Novo desenvolvedor</DialogTitle>
//         <DialogDescription>Criar um novo desenvolvedor</DialogDescription>
//       </DialogHeader>

//       <Form {...register}>
//         <form
//           onSubmit={handleSubmit(handleCreateDeveloper)}
//           className="space-y-8"
//         >
//           <FormField
//             name={"nivelId"}
//             render={({ field }) => (
//               <FormItem>
//                 <Label htmlFor="level">Nível</Label>
//                 <Select {...register("nivelId")}>
//                   <SelectTrigger className="col-span-2">
//                     <SelectValue placeholder="Selecione o nível" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {levels.map((level) => {
//                       return (
//                         <SelectItem key={level.id} value={level.nivel}>
//                           {level.nivel}
//                         </SelectItem>
//                       );
//                     })}
//                   </SelectContent>
//                 </Select>
//               </FormItem>
//             )}
//           />
//           <div className="grid grid-cols-4 items-center text-right gap-3">
//             <Label htmlFor="name">Nome</Label>
//             <Input className="col-span-3" {...register("nome")} />
//           </div>

//           <div className="grid grid-cols-4 items-center text-right gap-3">
//             <Label htmlFor="level">Nível</Label>
//             <Select {...register("nivelId")}>
//               <SelectTrigger className="col-span-2">
//                 <SelectValue placeholder="Selecione o nível" />
//               </SelectTrigger>
//               <SelectContent>
//                 {levels.map((level) => {
//                   return (
//                     <SelectItem key={level.id} value={level.nivel}>
//                       {level.nivel}
//                     </SelectItem>
//                   );
//                 })}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="grid grid-cols-4 items-center text-right gap-3">
//             <Label>Nascimento</Label>
//             <Input className="col-span-2" {...register("datanascimento")} />
//           </div>

//           <div className="grid grid-cols-4 items-center text-right gap-3">
//             <Label>Sexo</Label>

//             <select
//               className="col-span-2 rounded-md border bg-transparent px-2 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
//               {...register("sexo")}
//             >
//               <option value="F">Feminino</option>
//               <option value="M">Masculino</option>
//             </select>
//             {/* <Select {...register("sexo")}>
//             <SelectTrigger className="col-span-2">
//               <SelectValue placeholder="Selecione uma opção" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem defaultValue="M" value="M">Masculino</SelectItem>
//               <SelectItem defaultValue="F" value="F">Feminino</SelectItem>
//             </SelectContent>
//           </Select> */}
//           </div>

//           <div className="grid grid-cols-4 items-center text-right gap-3">
//             <Label>Hobby</Label>
//             <Input className="col-span-2" {...register("hobby")} />
//           </div>

//           <DialogFooter>
//             <DialogClose>
//               <Button variant="outline" type="button">
//                 Cancelar
//               </Button>
//             </DialogClose>
//             <Button type="submit">Salvar</Button>
//           </DialogFooter>
//         </form>
//       </Form>
//     </DialogContent>
//   );
// }
