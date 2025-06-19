// import React, { useState } from 'react';
// import { useAdminUser, useDeleteOneUser } from '../../hooks/admin/useAdminUser';
// import './UserTable.css';
// import { Link } from 'react-router-dom';
// import DeleteModal from '../DeleteModal';
// import { toast } from 'react-toastify'; // <-- Make sure you have react-toastify installed and imported

// export default function UserTable() {
//   const [deleteId, setDeleteId] = useState(null);
//   const deleteOneUserHook = useDeleteOneUser();

//   const {
//     users,
//     error,
//     isPending,
//     pageNumber,
//     setPageNumber,
//     pagination,
//     canNextPage,
//     canPreviousPage,
//     pageSize,
//     setPageSize,
//     search,
//     setSearch
//   } = useAdminUser();

//   const handleDelete = () => {
//     deleteOneUserHook.mutate(deleteId, {
//       onSuccess: () => {
//         setDeleteId(null);
//         toast.success("User deleted successfully");
//       },
//       onError: (error) => {
//         toast.error("Failed to delete user: " + error.message);
//       }
//     });
//   };

//   // Optionally, if you have a way to detect user updates via your hook, add toast there as well.
//   // Assuming you do it somewhere else or inside the update component.

//   const handleSearch = (e) => {
//     setPageNumber(1);
//     setSearch(e.target.value);
//   };

//   const handlePrev = () => {
//     if (canPreviousPage) setPageNumber((prev) => prev - 1);
//   };

//   const handleNext = () => {
//     if (canNextPage) setPageNumber((prev) => prev + 1);
//   };

//   if (isPending) return <div>Loading users...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div className="user-table-container">
//       <h2>Mitho Bites - User Table</h2>

//       {/* Delete Confirmation Modal */}
//       <DeleteModal
//         isOpen={deleteId}
//         onClose={() => setDeleteId(null)}
//         onConfirm={handleDelete}
//         title="Delete Confirmation"
//         description="Are you sure you want to delete this user?"
//       />

//       {/* Controls */}
//       <div className="controls">
//         <label>Show:</label>
//         <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
//           <option value={10}>10</option>
//           <option value={20}>20</option>
//           <option value={30}>30</option>
//         </select>

//         <label>Search:</label>
//         <input
//           type="text"
//           placeholder="Search by name or username"
//           value={search}
//           onChange={handleSearch}
//         />
//       </div>

//       {/* Table */}
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr>
//             <th>Full Name</th>
//             <th>Username</th>
//             <th>Password</th>
//             <th>Phone</th>
//             <th>Address</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((row) => (
//             <tr key={row._id}>
//               <td>{row.fullname}</td>
//               <td>{row.username}</td>
//               <td>{row.password}</td>
//               <td>{row.phone}</td>
//               <td>{row.address}</td>
//               <td className="flex gap-2">
//                 <Link to={`/admin/users/${row._id}/edit`}>
//                   <button className="edit-btn">Edit</button>
//                 </Link>
//                 <button onClick={() => setDeleteId(row._id)} className="delete-btn">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="pagination-controls mt-4 flex items-center justify-between">
//         <button onClick={handlePrev} disabled={!canPreviousPage}>
//           Back
//         </button>
//         <span>
//           Page {pagination.page} of {pagination.totalPages}
//         </span>
//         <button onClick={handleNext} disabled={!canNextPage}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }




import React, { useState } from 'react';
import { useAdminUser, useDeleteOneUser } from '../../hooks/admin/useAdminUser';
import './UserTable.css';
import { Link } from 'react-router-dom';
import DeleteModal from '../DeleteModal';
import { toast } from 'react-toastify'; // <-- Import toast here

export default function UserTable() {
  const [deleteId, setDeleteId] = useState(null);
  const deleteOneUserHook = useDeleteOneUser();

  const {
    users,
    error,
    isPending,
    pageNumber,
    setPageNumber,
    pagination,
    canNextPage,
    canPreviousPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
  } = useAdminUser();

  const handleDelete = () => {
    deleteOneUserHook.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        toast.success("User deleted successfully");
      },
      onError: (error) => {
        toast.error("Failed to delete user: " + (error?.message || "Unknown error"));
      },
    });
  };

  const handleSearch = (e) => {
    setPageNumber(1);
    setSearch(e.target.value);
  };

  const handlePrev = () => {
    if (canPreviousPage) setPageNumber((prev) => prev - 1);
  };

  const handleNext = () => {
    if (canNextPage) setPageNumber((prev) => prev + 1);
  };

  if (isPending) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="user-table-container">
      <h2>Mitho Bites - User Table</h2>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this user?"
      />

      {/* Controls */}
      <div className="controls">
        <label>Show:</label>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>

        <label>Search:</label>
        <input
          type="text"
          placeholder="Search by name or username"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Table */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((row) => (
            <tr key={row._id}>
              <td>{row.fullname}</td>
              <td>{row.username}</td>
              <td>{row.password}</td>
              <td>{row.phone}</td>
              <td>{row.address}</td>
              <td className="flex gap-2">
                <Link to={`/admin/users/${row._id}/edit`}>
                  <button className="edit-btn">Edit</button>
                </Link>
                <button onClick={() => setDeleteId(row._id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination-controls mt-4 flex items-center justify-between">
        <button onClick={handlePrev} disabled={!canPreviousPage}>
          Back
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button onClick={handleNext} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
