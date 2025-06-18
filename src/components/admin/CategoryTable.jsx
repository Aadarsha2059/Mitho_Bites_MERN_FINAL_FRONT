// import React, { useState } from 'react'
// import { useAdminCategory, useDeleteOneCategory } from '../../hooks/admin/useAdminCategory'


// import { Link } from 'react-router-dom'
// import { getBackendImageUrl } from '../../utils/backend-image'
// import DeleteModal from '../DeleteModal'

// function Welcome(props) {
//   return <h1>{props.name}</h1>
// }

// function NameComponent({ name, username }) {
//   return <h1>{name}{username}</h1>
// }

// export default function CategoryTable() {

//   const { categories, error, isPending } = useAdminCategory()
//   const useDeleteOneCategoryHook = useDeleteOneCategory()
//   const [deleteId, setDeleteId] = useState(null)

//   const handleDelete = () => {
//     useDeleteOneCategoryHook.mutate(
//       deleteId,
//       {
//         onSuccess: () => {
//           setDeleteId(null)
//         }
//       }
//     )
//   }

//   if (isPending) return <div>Loading...</div>
//   if (error) return <div>Error:{error.message}</div>

//   return (
//     <div>
//       <Welcome name="Aadarsha" />
//       <NameComponent name="Aadarsha" username="aadarsha2059" />
//       <DeleteModal
//         isOpen={deleteId}
//         onClose={() => setDeleteId(null)}
//         onConfirm={handleDelete}
//         title="delete confirmation"
//         description="Are you sure you want to delete?"
//       ></DeleteModal>
//       Mitho Bites Category
//       <table className='min-w-full table-auto'>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {
//             categories.map((row) =>
//               <tr key={row._id}>
//                 <td>{row.name}</td>
//                 <td>
//                   <img
//                     className='w-16 h-16 object-cover'
//                     src={getBackendImageUrl(row.filepath)}
//                     alt={row.name}
//                   />
//                 </td>
//                 <td className="flex gap-2">
//                   <Link to={`/admin/category/${row._id}`}>
//                     <button>View</button>
//                   </Link>
//                   <Link to={`/admin/category/${row._id}/edit`}>
//                     <button>Edit</button>
//                   </Link>

//                   <button onClick={() => setDeleteId(row._id)}>Delete</button>
//                 </td>
//               </tr>
//             )
//           }
//         </tbody>
//       </table>

//     </div>
//     // <div className="category-table-container">
//     //   <h2 className="category-table-heading">Available Categories on Mitho Bites</h2>
//     //   <div className="categories-grid">
//     //     {categories.map((row) => (
//     //       <div className="category-card-container" key={row._id}>
//     //         <img
//     //           className="category-image"
//     //           src={getBackendImageUrl(row.filepath)}
//     //           alt={row.name}
//     //           loading="lazy"
//     //         />
//     //         <h3 className="category-name">{row.name}</h3>
//     //         <p className="category-description">
//     //           Freshly prepared {row.name.toLowerCase()} to satisfy your cravings.
//     //         </p>
//     //       </div>
//     //     ))}
//     //   </div>
//     // </div>
//   )
// }

import './CategoryTable.css'
import React, { useState } from 'react'
import { useAdminCategory, useDeleteOneCategory } from '../../hooks/admin/useAdminCategory'
import { Link } from 'react-router-dom'
import DeleteModal from '../DeleteModal'
import { getBackendImageUrl } from '../../utils/backend-image'

function Welcome(props) {
    return <h1 className="welcome-heading">{props.name}</h1>
}

// function NameComponent({ name, username }) {
//     return <h2 className="name-username">{name} {username}</h2>
// }

export default function CategoryTable() {
    const { categories, error, isPending } = useAdminCategory()
    const deleteOneCategoryHook = useDeleteOneCategory()
    const [deleteId, setDeleteId] = useState(null)

    const handleDelete = () => {
        deleteOneCategoryHook.mutate(
            deleteId,
            {
                onSuccess: () => {  // fixed typo from onSucess
                    setDeleteId(null)
                }
            }
        )
    }

    if (isPending) return <div className="loading">Loading...</div>
    if (error) return <div className="error">Error: {error.message}</div>

    return (
        <div className="category-table-container">
            {/* <Welcome name="Aadarsha" />
            <NameComponent name="Aadarshaa" username="aadarsha2059" /> */}
            <DeleteModal
                isOpen={deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Confirmation"
                description="Are you sure you want to delete?"
            />
            <h3 className="table-title">Category Table</h3>
            <table className='category-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((row) =>
                            <tr key={row._id} className="category-row">
                                <td>{row.name}</td>
                                <td>
                                    <img
                                        className='category-image'
                                        src={getBackendImageUrl(row.filepath)}
                                        alt={row.name}
                                    />
                                </td>
                                <td className="actions-cell">
                                    <Link to={`/admin/category/${row._id}`}>
                                        <button className="btn view-btn">View</button>
                                    </Link>
                                    <Link to={`/admin/category/${row._id}/edit`}>
                                        <button className="btn edit-btn">Edit</button>
                                    </Link>
                                    <button
                                        className="btn delete-btn"
                                        onClick={() => setDeleteId(row._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
