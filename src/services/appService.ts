import { links } from "@/data/links";
import { addPreviousUrl } from "@/utils/session";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const handleNonLogin = (pathName: string, router: AppRouterInstance) => {
  addPreviousUrl(pathName);
  router.push(links.auth.login);
};
export const appService = { handleNonLogin };
