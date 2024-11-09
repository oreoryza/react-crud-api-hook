import React, { useContext } from "react";
import { LangaugeContext } from "../App";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Home({
  students,
  onEdit,
  onDelete,
  onDetail,
  loading,
  error,
  onAddStudent,
}) {
  const { language } = useContext(LangaugeContext);

  if (loading) return <div className="loader-container">
    <div className="loader"></div>
    </div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="data-list">
      <div>
        <h1>{language === "en" ? "Student Data List" : "Daftar Siswa"}</h1>
        {loading && <div className="loader"></div>}
      </div>
      <div className="btn-add">
        <Link to="/form">
          <button className="btn" onClick={onAddStudent}>
            <i className="bi bi-plus-lg me-2"></i>
            {language === "en" ? "Add Student" : "Tambah Siswa"}
          </button>
        </Link>
      </div>
      <table className="table table-striped table-bordered table-hover table-responsive">
        <thead>
          <tr>
            <th>No</th>
            <th>{language === "en" ? "Name" : "Nama"}</th>
            <th className="hidden">NIM</th>
            <th>{language === "en" ? "Class" : "Kelas"}</th>
            <th className="hidden">{language === "en" ? "Year" : "Tahun"}</th>
            <th>{language === "en" ? "Actions" : "Aksi"}</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td scope="row">{index + 1}</td>
              <td>{student.name}</td>
              <td className="hidden">{student.nim}</td>
              <td>{student.class}</td>
              <td className="hidden">{student.year}</td>
              <td>
                <Link to={`/form/${student.id}`}>
                  <button
                    onClick={() => onEdit(student)}
                    className="btn btn-sm btn-primary my-1 me-1"
                  >
                    Edit
                  </button>
                </Link>
                <Link to={`/detail/${student.id}`}>
                  <button
                    onClick={() => onDetail(student.id)}
                    className="btn btn-sm btn-danger my-1 me-1"
                  >
                    {language === "en" ? "Detail" : "Detil"}
                  </button>
                </Link>
                <button
                  onClick={() => onDelete(student.id)}
                  className="btn btn-sm btn-danger my-1 me-1"
                >
                  {language === "en" ? "Delete" : "Hapus"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Home.propTypes = {
  students: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDetail: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  onAddStudent: PropTypes.func.isRequired,
};
