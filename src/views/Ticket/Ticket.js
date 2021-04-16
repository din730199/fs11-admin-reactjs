import axios from 'axios';
import React, {Component} from 'react';

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
      url: `https://vexere-dint.herokuapp.com/all-ticket`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.setState({list: response.data, loading: false});
  };

  render() {
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
                  <h2 className="h3 mb-2 ml-3">Vé xe</h2>
                  <div className="ml-auto mr-3"></div>
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
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Ngày khởi hành</th>
                        <th>Thời gian khởi hành</th>
                        <th>Giá vé</th>
                        <th>Số ghế</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.list.map((i, index) => {
                        return (
                          <tr key={i._id}>
                            <td>{i._id}</td>
                            <td>{i.user?.username}</td>
                            <td>{i.user?.email}</td>
                            <td>
                              {new Date(
                                i.trip?.startedDate
                              ).toLocaleDateString()}
                            </td>
                            <td>
                              {new Date(
                                i.trip?.departureTime
                              ).toLocaleTimeString()}
                            </td>
                            <td>{i.trip?.price}</td>
                            <td>
                              {i.seat?.map((i) => (
                                <p key={i._id}>Ghế số: {i.name}</p>
                              ))}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
