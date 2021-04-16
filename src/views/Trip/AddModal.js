import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default function AddModal() {
  const [list2, setList2] = useState();
  const [list, setList] = useState();
  const [departurePlace, setDeparturePlace] = useState();
  const [arrivalPlace, setArrivalPlace] = useState();
  const [startedDate, setStartedDate] = useState();
  const [carId, setCarId] = useState();
  const [price, setPrice] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await axios({
      url: `https://vexere-dint.herokuapp.com/trip`,
      method: 'POST',
      data: {
        departurePlace,
        arrivalPlace,
        startedDate: new Date(startedDate).toISOString().slice(0, 10),
        departureTime: new Date(startedDate).toISOString(),
        carId,
        price,
      },
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
        url: `https://vexere-dint.herokuapp.com/car`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setList(response.data.data);
    };
    const getList2 = async () => {
      var response = await axios({
        url: `https://vexere-dint.herokuapp.com/station`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setList2(response.data);
    };
    getList();
    getList2();
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
              Thêm
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
                onClick={(e) => setDeparturePlace(e.target.value)}
                className="custom-select"
                id="inputGroupSelect02"
              >
                <option value="">Điểm đi...</option>
                {list2?.map((i) => {
                  return (
                    <option key={i._id} value={i._id}>
                      {i.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input-group mb-3">
              <select
                onClick={(e) => setArrivalPlace(e.target.value)}
                className="custom-select"
                id="inputGroupSelect02"
              >
                <option value="">Điểm đến...</option>
                {list2?.map((i) => {
                  return (
                    <option key={i._id} value={i._id}>
                      {i.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input-group mb-3">
              <select
                onClick={(e) => setCarId(e.target.value)}
                className="custom-select"
                id="inputGroupSelect02"
              >
                <option value="">Xe...</option>
                {list?.map((i) => {
                  return (
                    <option key={i._id} value={i._id}>
                      {i.branch.name} - {i.licensePlate}
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
                placeholder="Giá vé"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <DatePicker
              selected={startedDate}
              showTimeSelect
              placeholderText="Ngày/thời gian khởi hành"
              dateFormat="dd/MM/yyyy h:mm aa"
              onChange={(date) => setStartedDate(date)}
            />
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
