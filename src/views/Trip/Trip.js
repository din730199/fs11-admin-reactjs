import axios from 'axios';
import React, {Component} from 'react';
import DeleteModal from './DeleteModal';
import AddModal from './AddModal';

export default class Trip extends Component {
  state = {
    loading: true,
    list: [],
    requiredItem: 0,
  };

  componentDidMount() {
    this.getList();
  }

  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
    });
  }

  getList = async () => {
    var response = await axios({
      url: `https://vexere-dint.herokuapp.com/all-trip`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.setState({list: response.data, loading: false});
  };

  render() {
    const requiredItem = this.state.requiredItem;
    let modalData = this.state.list[requiredItem];
    return (
      <div className="container-fluid">
        {this.state.loading || !this.state.list ? (
          <div>Loading...</div>
        ) : (
          <div>
            {/* <!-- DataTales  --> */}
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <div className="row">
                  <h2 className="h3 mb-2 ml-3">Chuyến xe</h2>
                  <div className="ml-auto mr-3">
                    <button
                      className="btn btn-info mr-2"
                      data-toggle="modal"
                      data-target="#addModal"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      <span>Thêm</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered "
                    id="dataTable"
                    width="100%"
                  >
                    <thead className="bg-info text-white">
                      <tr>
                        <th>Id</th>
                        <th>Điểm đi</th>
                        <th>Điểm đến</th>
                        <th>Ngày khởi hành</th>
                        <th>Thời gian khởi hành</th>
                        <th>Giá vé</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.list.map((i, index) => {
                        return (
                          <tr key={i._id}>
                            <td>{i._id}</td>
                            <td>{i.departurePlace?.name}</td>
                            <td>{i.arrivalPlace?.name}</td>
                            <td>
                              {new Date(i.startedDate).toLocaleDateString()}
                            </td>
                            <td>
                              {new Date(i.departureTime).toLocaleTimeString()}
                            </td>
                            <td>{i.price}</td>
                            <td className="justify-content-center">
                              <button
                                className="fas fa-trash-alt font-weight-bold btn btn-danger"
                                data-toggle="modal"
                                data-target="#deleteModal"
                                onClick={() => this.replaceModalItem(index)}
                              ></button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <DeleteModal id={modalData._id} />
                  <AddModal />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
