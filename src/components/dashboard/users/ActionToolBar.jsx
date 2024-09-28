import { Button, ButtonGroup, Form } from "react-bootstrap";
import { FaLock, FaTrash, FaUnlock } from "react-icons/fa";

// Action toolbar component
const ActionToolbar = ({
  onBlock,
  onUnblock,
  onDelete,
  onChange,
  itemPerPage,
  disabled,
}) => (
  <div className="d-flex justify-content-between align-items-center mb-3 mt-3 ps-1 pe-1">
    <Form.Select
      value={parseInt(itemPerPage)}
      onChange={onChange}
      style={{ width: "min(220px, 50%)" }}
      aria-label="per page users"
    >
      <option value="1">1 - user per page</option>
      <option value="2">2 - users per page</option>
      <option value="5">5 - users per page</option>
      <option value="10">10 - users per page</option>
      <option value="20">20 - users per page</option>
    </Form.Select>
    <ButtonGroup
      style={{
        opacity: disabled ? "0.8" : "1",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <Button variant="outline-primary" onClick={onBlock} disabled={disabled}>
        <FaLock className="text-danger" />{" "}
        <span className="text-danger">Block</span>
      </Button>
      <Button variant="outline-primary" onClick={onUnblock} disabled={disabled}>
        <FaUnlock className="text-success" />
      </Button>
      <Button variant="outline-primary" onClick={onDelete} disabled={disabled}>
        <FaTrash className="text-danger" />
      </Button>
    </ButtonGroup>
  </div>
);

export default ActionToolbar;
