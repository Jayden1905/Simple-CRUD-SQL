import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [obj, setObj] = useState({
    name: "",
    age: 0,
    country: "",
    position: "",
    wage: 0,
  });

  const [employeeList, setEmployeeList] = useState([]);

  const [show, setShow] = useState(false);

  const [isEdit, setIsEdit] = useState(true);

  const loadEmployees = async () => {
    const data = await axios.get("http://localhost:3001/get");
    setEmployeeList(data.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const resetValues = () => {
    setObj({
      name: "",
      age: "",
      country: "",
      position: "",
      wage: "",
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    resetValues();

    axios
      .post("http://localhost:3001/create", {
        data: obj,
      })
      .then(() => {
        console.log("Post Success");
        loadEmployees();
      });
  };

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:3001/remove/${id}`).then((res) => {
      console.log("Delete Success");
      setEmployeeList(employeeList.filter((item) => item.id !== id));
      loadEmployees();
    });
  };

  const editHandler = (id) => {
    setIsEdit(false);
    axios.get(`http://localhost:3001/get/${id}`).then((res) => {
      const data = res.data;
      setObj(...data);
    });
  };

  const updateHandler = (id) => {
    axios
      .put(`http://localhost:3001/put/${id}`, {
        data: obj,
      })
      .then((res) => {
        console.log("Update Success");
        resetValues();
        loadEmployees();
      });
  };

  return (
    <>
      <div className="App">
        <form action="submit">
          <label htmlFor="input">Name:</label>
          <input
            htmlFor="input"
            value={obj.name}
            onChange={(e) => {
              setObj((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
          <label htmlFor="input">Age:</label>
          <input
            type="number"
            value={obj.age === 0 ? "" : obj.age}
            onChange={(e) => {
              setObj((prev) => {
                return { ...prev, age: e.target.value };
              });
            }}
          />
          <label htmlFor="input">Country:</label>
          <input
            type="text"
            value={obj.country}
            onChange={(e) => {
              setObj((prev) => {
                return { ...prev, country: e.target.value };
              });
            }}
          />
          <label htmlFor="input">Position:</label>
          <input
            type="text"
            value={obj.position}
            onChange={(e) => {
              setObj((prev) => {
                return { ...prev, position: e.target.value };
              });
            }}
          />
          <label htmlFor="input">Wage (year):</label>
          <input
            type="number"
            value={obj.wage === 0 ? "" : obj.wage}
            onChange={(e) => {
              setObj((prev) => {
                return { ...prev, wage: e.target.value };
              });
            }}
          />
          <button onClick={submitHandler} type="submit">
            Submit
          </button>
          <button
            className="show"
            onClick={(e) => {
              e.preventDefault();
              setShow((prev) => !prev);
            }}
          >
            Show
          </button>
        </form>
        <div className="employees">
          {show &&
            employeeList.map((employee) => {
              return (
                <div className="employee">
                  <ul>
                    <li>Name: {employee.name}</li>
                    <li>Age: {employee.age}</li>
                    <li>Country: {employee.country}</li>
                    <li>Position: {employee.position}</li>
                    <li>Wage: {employee.wage}</li>
                  </ul>
                  <button
                    onClick={
                      isEdit
                        ? () => editHandler(employee.id)
                        : () => updateHandler(employee.id)
                    }
                  >
                    {isEdit ? "Edit" : "Update"}
                  </button>
                  <button onClick={() => deleteHandler(employee.id)}>
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
