import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';
import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <AppView />
      <UserView />
    </>
  );
}
