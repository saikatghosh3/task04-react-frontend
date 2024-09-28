import { Navbar, Nav, OverlayTrigger } from "react-bootstrap";
import MenuToogleIcon from "../../icons/hamburger.svg?react";
import { usePopover } from "../../../hooks/use-popover";
import { UserPopover } from "./user-popover";
import { useUser } from "../../../hooks/use-user";
import { getUserFirstAndLastChar } from "../../../utils/user";

export function MainNav({ onToggle }) {
  const { user } = useUser();
  const userPopover = usePopover();
  return (
    <Navbar
      style={{ minHeight: 65 }}
      bg="light"
      expand="lg"
      sticky="top"
      className="border-bottom"
    >
      <div className="container-fluid d-flex justify-content-between align-items-center px-5">
        <Nav className="d-flex align-items-center">
          <MenuToogleIcon
            height={24}
            width={24}
            onClick={() => onToggle()}
            role="button"
            className="d-block d-lg-none"
          />
        </Nav>
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={
            <UserPopover className="" onClose={userPopover.handleClose} />
          }
          rootClose
        >
          <div className="d-flex flex-column">
            <p
              role="button"
              style={{ height: 44, width: 44 }}
              onClick={userPopover.handleToggle}
              className="p-1 align-self-end rounded-circle d-flex align-items-center justify-content-center bg-primary text-white text-center my-auto"
            >
              {getUserFirstAndLastChar(user)}
            </p>
          </div>
        </OverlayTrigger>
      </div>
    </Navbar>
  );
}
