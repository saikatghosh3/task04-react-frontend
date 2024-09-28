import { Offcanvas, Nav } from "react-bootstrap";

import { navItems } from "./config";
import { useLocation } from "react-router-dom";
import Logo from "../../icons/logo.svg?react";
export function MobileNav({ open, onClose }) {
  const { pathname } = useLocation();
  return (
    <Offcanvas
      className="d-flex d-lg-none flex-column bg-dark text-white mw-280"
      show={open}
      onHide={onClose}
      placement="start"
    >
      <Offcanvas.Header closeButton closeVariant="white">
        <Offcanvas.Title>
          <Logo />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column p-0">
        <hr className="border-secondary" />
        <Nav className="flex-column p-3">
          {renderNavItems({ pathname, items: navItems })}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

function renderNavItems({ pathname, items }) {
  return (
    <Nav as="ul" className="d-flex flex-column">
      {items.map((item, index) => (
        <Nav.Item key={index} as="li" className="mb-2">
          <Nav.Link
            href={item.href}
            className={`text-white rounded d-flex align-items-center ${
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
