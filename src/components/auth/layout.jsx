import { Container, Row, Col, Image } from "react-bootstrap";
import loginImg from "../../assets/auth-widgets.png";
import { GuestGuard } from "./guest-guard";
import LogoDark from "../icons/logo-dark.svg?react";
export function AuthLayout({children}) {
  return (
    <GuestGuard>
      <Container fluid className="d-flex" style={{ minHeight: "100vh" }}>
      <Row className="g-0 flex-grow-1 w-100">
        <Col xs={12} lg={6} className="d-flex flex-column">
          <div className="p-3">
            <LogoDark/>
          </div>
          <div className="d-flex flex-grow-1 justify-content-center align-items-center p-3">
            <div style={{ maxWidth: "450px", width: "100%" }}>
              {children}
            </div>
          </div>
        </Col>
        <Col
          xs={12}
          lg={6}
          className="d-none d-lg-flex align-items-center justify-content-center"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
            color: "#fff",
          }}
        >
          <div className="text-center">
            {/* <h1 style={{ fontSize: "24px", lineHeight: "32px" }}>
              Welcome to <span style={{ color: "#15b79e" }}>Devias Kit</span>
            </h1>
            <p className="lead">
              A professional template that comes with ready-to-use Bootstrap
              components.
            </p> */}
            <div className="d-flex justify-content-center">
              <Image
                src={loginImg}
                alt="Widgets"
                fluid
                style={{ maxWidth: "600px" }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    </GuestGuard>
  );
}
