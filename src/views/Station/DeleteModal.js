import React from 'react';
import axios from 'axios';

export default function DeleteModal({id}) {
  const handleSubmit = async () => {
    let response = await axios({
      url: `https://vexere-dint.herokuapp.com/station?id=${id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data) {
      alert('Thành công');
      window.location.reload();
    } else {
      alert('Error');
    }
  };

  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {id}
            </h5>
            <button
              className="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">Xóa loại sản phẩm</div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Hủy
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
