"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Image from "next/image";
import logoIaca from "../../../../public/logo-iaca-purple.svg";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ILoginActionProps {
  onLoginAction: (formData: FormData) => Promise<void | { error: string }>;
}

const schema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  password: z.string().min(1, "Senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm({ onLoginAction }: ILoginActionProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    setLoading(true);

    const result = await onLoginAction(data);

    router.push("/cart");

    if (result?.error) {
      toast.error(result.error);

      setLoading(false);
      return;
    }

    setLoading(false);
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md px-8 py-8 flex items-center justify-center flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] shadow-md"
    >
      <Image src={logoIaca} alt="Logo IAÇA" width={70} height={60} />

      <span className="font-medium text-sm">
        Olá para continuar, faça seu login
      </span>

      <div className="grid w-full items-center gap-1.5 mt-4 mb-4">
        <Label className="text-xs" htmlFor="email">
          E-mail
        </Label>
        <Input {...register("email")} id="email" placeholder="E-mail" />

        {errors.email && (
          <span className="text-red-400 text-xs">{errors.email.message}</span>
        )}
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label className="text-xs" htmlFor="password">
          Senha
        </Label>
        <Input
          {...register("password")}
          id="password"
          placeholder="Senha"
          type="password"
        />
        {errors.password && (
          <span className="text-red-400 text-xs">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="w-full flex justify-end">
        <span className="text-[#16A6FF] text-xs underline cursor-pointer mt-4">
          Criar meu cadastro
        </span>
      </div>

      <Button
        type="submit"
        className="bg-[#2B0036] rounded-full mt-4 w-full hover:bg-[#421d4b]"
      >
        {loading && "Entrando..."}
        {!loading && "Login"}
      </Button>
    </form>
  );
}