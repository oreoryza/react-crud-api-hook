import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { LangaugeContext } from "../App";
import PropTypes from "prop-types";

export default function Form({
  newStudent,
  onAdd,
  onUpdate,
  onChange,
  isEdit,
}) {
  const navigate = useNavigate();

  const { language } = useContext(LangaugeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      onUpdate();
    } else {
      onAdd();
    }
    navigate("/");
  };

  return (
    <>
      <div className="btn-absolute-container">
        <button className="btn-absolute" onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left-circle"
            className="arrow"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
            />
          </svg>
        </button>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>{isEdit ? `${language === "en" ? "Edit data" : "Ubah data"}` : `${language === "en" ? "Add Data" : "Tambah Data"}`}</h2>
        <div className="form-group">
          <div className="form-label">
            <label htmlFor="name" className="form-label">
              {language === "en" ? "Name" : "Nama"}
            </label>
            <label htmlFor="nim" className="form-label">
              NIM
            </label>
            <label htmlFor="class" className="form-label">
              {language === "en" ? "Class" : "Kelas"}
            </label>
            <label htmlFor="year" className="form-label">
              {language === "en" ? "Year" : "Tahun"}
            </label>
            <label htmlFor="gender" className="form-label">
              {language === "en" ? "Gender" : "Jenis Kelamin"}
            </label>
            <label htmlFor="birthDate" className="form-label">
              {language === "en" ? "Birth Date" : "Tanggal Lahir"}
            </label>
            <label htmlFor="guardian_name" className="form-label">
              {language === "en" ? "Guardian Name" : "Nama Wali"}
            </label>
            <label htmlFor="address" className="form-label">
              {language === "en" ? "Address" : "Alamat"}
            </label>
          </div>
          <div className="form-input">
            <input
              type="text"
              name="name"
              id="name"
              value={newStudent.name}
              onChange={onChange}
              minLength={3}
              required
            />
            <input
              type="text"
              name="nim"
              id="nim"
              value={newStudent.nim}
              onChange={onChange}
              required
            />
            <input
              type="text"
              name="class"
              id="class"
              value={newStudent.class}
              onChange={onChange}
              required
            />
            <input
              type="number"
              name="year"
              id="year"
              value={newStudent.year}
              onChange={onChange}
              min={2000}
              max={2024}
              required
            />
            <select
              name="gender"
              id="gender"
              className="form-select"
              value={newStudent.gender}
              onChange={onChange}
              required
            >
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              type="date"
              value={newStudent.birthDate}
              onChange={onChange}
              name="birthDate"
              className="form-control"
              id="birthDate"
              required
            />
            <input
              type="text"
              name="guardian_name"
              id="guardian_name"
              value={newStudent.guardian_name}
              onChange={onChange}
              required
            />
            <textarea
              type="text"
              name="address"
              id="address"
              value={newStudent.address}
              onChange={onChange}
              minLength={20}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn">
          {isEdit ? `${language === "en" ? "Update" : "Perbarui"}` : `${language === "en" ? "Add" : "Tambah"}`}
        </button>
      </form>
    </>
  );
}

Form.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  newStudent: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};