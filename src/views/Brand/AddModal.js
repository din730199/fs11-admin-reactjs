import React, {useState} from 'react';
import axios from 'axios';

export default function AddModal() {
  const [name, setName] = useState();
  const [code, setCode] = useState();
  const [hotline, setHotline] = useState();
  const [address, setAddress] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await axios({
      url: `https://vexere-dint.herokuapp.com/branch`,
      method: 'POST',
      data: {name, code, hotline, address},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data.msg) {
      alert(response.data.msg);
    } else {
      alert('Thành công');
      window.location.reload();
    }
  };

  return (
    <div
      className="modal fade"
      id="addModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Thêm nhà xe
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
          <div className="modal-body">
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                aria-describedby="emailHelp"
                placeholder="Tên"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                aria-describedby="emailHelp"
                placeholder="Code"
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                aria-describedby="emailHelp"
                placeholder="Hotline"
                onChange={(e) => setHotline(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                aria-describedby="emailHelp"
                placeholder="Địa chỉ"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Hủy
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
