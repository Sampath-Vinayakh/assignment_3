import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState(() => {
    if (user[0].role === "Admin") {
      setIsAdmin(true);
      return JSON.parse(localStorage.getItem("users")).filter(
        (value) => value.email !== user[0].email
      );
    } else {
      return user;
    }
  });

  const navigate = useNavigate();

  function handleClick(email) {
    const users = JSON.parse(localStorage.getItem("users"));
    let filtered_users = users.filter((user) => user.email !== email);
    console.log(filtered_users);
    if (user[0].role === "Admin") {
      filtered_users = filtered_users.filter(
        (value) => value.email !== user[0].email
      );
    }
    console.log(filtered_users);
    localStorage.setItem("users", JSON.stringify(filtered_users));
    setUsers(filtered_users);
  }

  function handleLogout() {
    localStorage.removeItem("currentUser");
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Dashboard
          </a>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <table className="table mt-5">
        <thead>
          <tr className="text-center">
            <th scope="col">Id</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
            {isAdmin && <th scope="col">Remove</th>}
          </tr>
        </thead>
        <tbody className="text-center">
          {users.map((user, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              {isAdmin && (
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClick(user.email)}
                >
                  X
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Dashboard;
