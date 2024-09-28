import { Nav, Stack } from "react-bootstrap";
import { navItems } from "./config"; // Your navigation items config
import { useLocation } from "react-router-dom";
import Logo from "../../icons/logo.svg?react";
export function SideNav() {
  const { pathname } = useLocation();

  return (
    <div
      className="d-none d-lg-flex flex-column bg-dark text-white fixed-top"
      style={{ width: "280px", height: "100vh" }}
    >
      <Stack gap={3} className="p-3 flex-grow-0">
        <Nav.Link href="/" className="text-white">
          <Logo />
        </Nav.Link>
      </Stack>
      <hr className="border-secondary" />
      <Nav className="flex-column p-3 flex-grow-1">
        {renderNavItems({ pathname, items: navItems })}
      </Nav>
    </div>
  );
}

function renderNavItems({ pathname, items }) {
  return (
    <Nav as="ul" className="d-flex flex-column">
      {items.map((item, index) => (
        <Nav.Item key={index} as="li" className="mb-2">
          <Nav.Link
            href={item.href}
            className={`text-white rounded d-flex  align-items-center ${
              pathname === item.href ? "bg-primary" : ""
            }`}
          >
            {item.icon && <item.icon className="me-2" />}
            <span className="">{item.title} </span>
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}
