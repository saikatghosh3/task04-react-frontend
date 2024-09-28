import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import ArrowLeft from "./../icons/arrow-left.svg?react";

export function NotFound() {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="text-center">
        <Col xs={12} md={8} className="mx-auto">
          <h3>404: The page you are looking for isn't here</h3>
          <p className="text-muted">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation.
          </p>
          <Button as={Link} to={"/"} variant="primary">
            <ArrowLeft /> Go back to home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
