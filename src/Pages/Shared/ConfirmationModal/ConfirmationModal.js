import React from 'react';

const ConfirmationModal = ({title,message,  successBtnName,closeModal, handleDeletDoctor, modalData}) => {
    return (
        <div>
          {/* The button to open modal */}
{/* <label htmlFor="confirmation-modal" className="btn">open modal</label> */}

<input type="checkbox" id="confirmation-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="py-4">{message}</p>
    <div className="modal-action">
      <label onClick={()=>handleDeletDoctor(modalData)} 
      htmlFor="confirmation-modal" className="btn">{successBtnName}</label>
      <button  onClick={closeModal} className='btn btn-secondary'>close</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default ConfirmationModal;