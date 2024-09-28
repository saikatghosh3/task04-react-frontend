import React, { useMemo } from "react";
import { Table, Form, Stack, Badge } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActionToolbar from "./ActionToolBar";
import UsersPagination from "./UserPagination";
import ConfirmModal from "./ConfirmModal";
import { useSelection } from "../../../hooks/use-selection";
import useUsers from "../../../hooks/use-users";
import { useConfirmAction } from "../../../hooks/use-confrim";
import { deleteusers, updateUsersStatus } from "../../../services/user";

export function Users() {
  const [itemPerPage, setItemPerPage] = React.useState(5);
  const { users, loading, setSearch, page, totalPages, fetchUsers } =
    useUsers(itemPerPage);
  const rowIds = useMemo(() => users.map((user) => user._id), [users]);
  const {
    selectAll,
    deselectAll,
    selectOne,
    deselectOne,
    selected,
    selectedAny,
    selectedAll,
  } = useSelection(rowIds);
  const {
    showModal,
    action,
    confirmingAction,
    openModal,
    closeModal,
    handleConfirm,
  } = useConfirmAction();

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setSearch({ page: pageNumber });
  };

  const handleSelectAll = (event) => {
    event.target.checked ? selectAll() : deselectAll();
  };

  const handleSelectOne = (id, event) => {
    event.target.checked ? selectOne(id) : deselectOne(id);
  };

  const handleAction = (actionType) => {
    openModal(actionType, async () => {
      if (confirmingAction) return;
      try {
        if (actionType == "Block") {
          await updateUsersStatus(Array.from(selected), "BLOCKED");
        } else if (actionType == "Unblock") {
          await updateUsersStatus(Array.from(selected), "UNBLOCKED");
        } else if (actionType == "Delete") {
          await deleteusers(Array.from(selected));
        }
        toast.success(`${actionType} selected users successful`);
        fetchUsers();
      } catch (e) {
        toast.error(e.message);
      }
    });
  };

  const renderUserRow = (user) => {
    const isSelected = selected?.has(user._id);

    return (
      <tr key={user._id} className={isSelected ? "table-active" : ""}>
        <td className="py-3 align-middle">
          <Form.Check
            type="checkbox"
            checked={isSelected}
            onChange={(e) => handleSelectOne(user._id, e)}
            className="large-checkbox"
          />
        </td>
        <td className="align-middle">
          <Stack direction="horizontal" gap={2} className="align-items-center">
            <span>{user._id}</span>
          </Stack>
        </td>
        <td className="align-middle">
          <Stack direction="horizontal" gap={2} className="align-items-center">
            <span>{user.name}</span>
          </Stack>
        </td>
        <td className="align-middle">{user.email}</td>
        <td className="align-middle">
          <Badge
            bg={user.status === "BLOCKED" ? "danger" : "success"}
            className="p-2"
          >
            {user.status}
          </Badge>
        </td>
        <td className="align-middle">
          {new Date(user.lastLogin).toLocaleString()}
        </td>
        <td className="align-middle">
          {new Date(user.registrationDate).toLocaleString()}
        </td>
      </tr>
    );
  };

  const renderTableContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={6}>
            <div className="d-flex justify-content-center align-items-center">
              <p className="pt-2 pb-2 text-bold">Loading...</p>
            </div>
          </td>
        </tr>
      );
    }

    if (!users.length) {
      return (
        <tr>
          <td colSpan={6}>
            <div className="d-flex justify-content-center align-items-center">
              <p className="pt-2 pb-2 text-bold">No data</p>
            </div>
          </td>
        </tr>
      );
    }

    return users.map(renderUserRow);
  };

  return (
    <div className="shadow-lg rounded border">
      {/* Action toolbar at the top of the table */}
      <ActionToolbar
        onChange={(e) => setItemPerPage(e.target.value)}
        itemPerPage={itemPerPage}
        onBlock={() => handleAction("Block")}
        onUnblock={() => handleAction("Unblock")}
        onDelete={() => handleAction("Delete")}
        disabled={!selectedAny}
      />
      <div className="table-responsive rounded pe-1 ps-1">
        <Table
          hover
          className="table-hover rounded"
          style={{
            pointerEvents: loading ? "none" : "auto",
            filter: loading ? "blur(1.2px)" : "none",
          }}
        >
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  className="large-checkbox"
                  checked={selectedAll}
                  onChange={handleSelectAll}
                  indeterminate={selectedAny && !selectedAll}
                />
              </th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Last login</th>
              <th>Signed Up</th>
            </tr>
          </thead>
          <tbody>{renderTableContent()}</tbody>
        </Table>
      </div>

      <UsersPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={goToPage}
        loading={loading}
      />

      {/* Modal for confirming actions */}
      <ConfirmModal
        show={showModal}
        action={action}
        onHide={closeModal}
        onConfirm={handleConfirm}
        confirmingAction={confirmingAction}
      />

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}
