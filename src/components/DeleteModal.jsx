import React from 'react';

import './DeleteModal.css'

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description
}) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg w-[320px] shadow-lg'>
        <h2 className='text-lg font-semibold mb-3'>{title}</h2>
        <p className='text-sm mb-6'>
          Are you sure you want to delete? <span role="img" aria-label="sad">😢😞</span>
        </p>
        <div className='flex justify-end space-x-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
