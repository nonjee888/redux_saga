import { useState } from "react";
import { connect } from "react-redux";
import { searchUsersReq } from "../reducers/user/action";

const { Link } = require("react-router-dom");

const Search = (props) => {
  const { userList = [], searchUsers } = props;
  const [name, setName] = useState("");

  return (
    <>
      <div>
        <div>
          <Link to="/">메인 페이지로</Link>
        </div>
      </div>
      검색페이지
      <div>
        <input value={name || ""} onChange={(e) => setName(e.target.value)} />
        <button onClick={() => searchUsers(`?name=${name}`)}>검색</button>
        <div>
          <table>
            <thead>
              <tr>
                <th>이름</th>
                <th>전화번호</th>
                <th>이메일</th>
              </tr>
            </thead>
            <tbody>
              {userList?.map((user) => (
                <tr key={user.name}>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchUsers: (params) => dispatch(searchUsersReq(params)),
  };
};

const mapStateToProps = (state) => {
  return {
    userList: state.userReducer.userList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
