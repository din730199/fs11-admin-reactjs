import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function AddModal() {
  const [branch, setBranch] = useState();
  const [list, setList] = useState();
  const [licensePlate, setLicensePlate] = useState();
  const [seats, setSeats] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await axios({
      url: `https://vexere-dint.herokuapp.com/car`,
      method: 'POST',
      data: {branch, licensePlate, seats},
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

  useEffect(() => {
    const getList = async () => {
      var response = await axios({
        url: `https://vexere-dint.herokuapp.com/branch`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setList(response.data.data);
    };
    getList();
  }, []);

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
              Thêm xe
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
            <div className="input-group mb-3">
              <select
                onClick={(e) => setBranch(e.target.value)}
                className="custom-select"
                id="inputGroupSelect02"
              >
                <option value="">Nhà xe...</option>
                {list?.map((i) => {
                  return (
                    <option key={i._id} value={i._id}>
                      {i.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                aria-describedby="emailHelp"
                placeholder="Biển số"
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                aria-describedby="emailHelp"
                placeholder="Số lượng ghế"
                onChange={(e) => setSeats(e.target.value)}
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
