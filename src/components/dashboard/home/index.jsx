import { Users } from "../users";
export function Home() {
  return (
    <>
      <h2 className="display-6 text-muted">Users</h2>
      <p className="text-muted fst-italic">
        *You have to select user/users for performing block, unblock and delete
        actions*
      </p>
      <Users />
    </>
  );
}
