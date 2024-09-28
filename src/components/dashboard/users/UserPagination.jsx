import { Pagination } from "react-bootstrap";
const UsersPagination = ({ currentPage, totalPages, onPageChange, loading }) => {
    return (
      <Pagination
        className="justify-content-end pe-2 pb-3"
        style={{
          pointerEvents: loading ? "none" : "auto",
          filter: loading ? "blur(1.2px)" : "none"
        }}
      >
        <Pagination.First onClick={() => onPageChange(1)} />
        <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
        <Pagination.Item>{currentPage}</Pagination.Item>
        <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
        <Pagination.Last onClick={() => onPageChange(totalPages)} />
      </Pagination>
    );
  };

  export default UsersPagination;