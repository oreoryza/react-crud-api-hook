import React, { useEffect, useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Home from "./container/Home";
import Form from "./component/Form";
import Detail from "./component/Detail";
import useFetch from "./utils/useFetch";
import Navbar from "./component/Navbar";

export const LangaugeContext = createContext();

function App() {
  const { id } = useParams();
  const {
    data: students,
    loading,
    error,
    postData,
    updateData,
    deleteData,
    detailData,
  } = useFetch();

  const [language, setLanguage] = useState("en");

  const [newStudent, setNewStudent] = useState({
    name: "",
    nim: "",
    class: "",
    year: "",
    birthDate: "",
    address: "",
    guardian_name: "",
    gender: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (id) {
      const studentToEdit = students.find((student) => student.id === id);
      if (studentToEdit) {
        setNewStudent(studentToEdit);
        setIsEdit(true);
      } else {
        resetForm();
      }
    }
  }, [id, students]);

  const onAdd = async () => {
    await postData(newStudent);
    resetForm();
  };

  const onAddStudent = () => {
    resetForm();
  };

  const onEdit = (student) => {
    setNewStudent(student);
    setIsEdit(true);
  };

  const onDelete = async (id) => {
    await deleteData(id);
  };

  const onUpdate = async () => {
    await updateData(newStudent, newStudent.id);
    resetForm();
  };

  const onDetail = async (id) => {
    const student = await detailData(id);
    setNewStudent(student);
  };

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setNewStudent({
      name: "",
      nim: "",
      class: "",
      year: "",
      birthDate: "",
      address: "",
      guardian_name: "",
      gender: "",
    });
    setIsEdit(false);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleChangeLanguage = (language) => {
    setLanguage(language);
  };

  return (
    <Router>
      <div className="container">
        <LangaugeContext.Provider value={{ language, setLanguage: handleChangeLanguage }}>
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                students={students}
                onEdit={onEdit}
                onDelete={onDelete}
                onDetail={onDetail}
                onAddStudent={onAddStudent}
                loading={loading}
                error={error}
              />
            }
          />
          <Route
            path="/form/:id"
            element={
              <Form
                newStudent={newStudent}
                onAdd={onAdd}
                onUpdate={onUpdate}
                onChange={handleChange}
                isEdit={isEdit}
                resetForm={resetForm}
              />
            }
          />
          <Route
            path="/form"
            element={
              <Form
                newStudent={newStudent}
                onAdd={onAdd}
                onUpdate={onUpdate}
                onChange={handleChange}
                isEdit={isEdit}
                resetForm={resetForm}
              />
            }
          />
          <Route path="/detail/:id" element={<Detail students={students} />} />
        </Routes>
        </LangaugeContext.Provider>
      </div>
    </Router>
  );
}

export default App;
