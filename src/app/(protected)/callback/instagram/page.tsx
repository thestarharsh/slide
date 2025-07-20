import { onIntegrate } from "@/actions/integrations";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  
  const code =
    typeof resolvedSearchParams?.code === "string"
      ? resolvedSearchParams.code.split("#_")[0]
      : undefined;

  if (code) {
    const user = await onIntegrate(code);

    if (!user) return redirect("/sign-in");

    if (user.status === 200) {
      return redirect(
        `/dashboard/${user.data?.firstname}${user.data?.lastname}/integrations`
      );
    }
  }

  return redirect("/sign-up");
}