import { useLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { ServerDashboardContent } from "./servers/master";
import { getCurrentUserId } from "./actions/dashboard_actions";

export default async function Page() {
     const t = await getTranslations("Dashboard");
     const locale =await getLocale() as 'ar' | 'en';
     const userId = await getCurrentUserId();
    return (
        <main>
      <ServerDashboardContent userId={userId} />
    </main>
        // <div className="flex items-center justify-center h-screen">
        //     <h1 className="text-4xl font-bold text-gray-900">
                  
        //           {t("soon")}
      
        //     </h1>
        // </div>


    );
}



/// cards for 