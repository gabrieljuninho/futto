import { auth } from "@/auth";

import { updateUsername } from "@/features/auth/helpers/user";

import LogoutButton from "@/features/auth/components/logout-button";

const DashboardPage = async () => {
  const session = await auth();

  await updateUsername(session?.user.id as string);

  return (
    <div>
      Dashboard Page: {JSON.stringify(session)} <LogoutButton />
    </div>
  );
};

export default DashboardPage;
