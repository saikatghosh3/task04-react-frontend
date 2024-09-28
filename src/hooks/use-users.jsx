import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllusers } from "../services/user";

export default function useUsers(defaultPageLimit = 10) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useSearchParams({ page: 1 });
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const page = search.get("page");
  const limit = search.get("limit") || defaultPageLimit;
  const fetchUsers = useCallback(() => {
    (() => {
      setLoading(true);
      getAllusers(page, limit)
        .then((data) => {
          setUsers(data.data.items);
          setTotalPages(data.data.totalPages);
          setTotalCount(data.data.totalItems);
        })
        .catch((e) => {
          setError("Something went wrong");
          setUsers([]);
          setTotalCount(0);
          setTotalPages(1);
        })
        .finally(() => setLoading(false));
    })();
  }, [page, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    search,
    setSearch,
    totalPages,
    totalCount,
    page: parseInt(page),
    fetchUsers,
  };
}
