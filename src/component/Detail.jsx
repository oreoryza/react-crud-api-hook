import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LangaugeContext } from "../App";
import PropTypes from "prop-types";

export default function Detail({ students }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [studentDetail, setStudentDetail] = useState(null);

  const { language } = useContext(LangaugeContext);

  useEffect(() => {
    const student = students.find((student) => student.id === id);
    if (student) {
      setStudentDetail(student);
    }
  }, [id, students]);

  if (!studentDetail) {
    return <div className="loader"></div>;
  }

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
      <div className="detail-container">
        <div className="detail-card">
          <h4>{language === "en" ? "Name" : "Nama"}:</h4>
          <p>{studentDetail.name}</p>
          <h4>NIM:</h4>
          <p>{studentDetail.nim}</p>
          <h4>{language === "en" ? "Class" : "Kelas"}:</h4>
          <p>{studentDetail.class}</p>
          <h4>{language === "en" ? "Birth Date" : "Tanggal Lahir"}:</h4>
          <p>{studentDetail.birthDate}</p>
          <h4>{language === "en" ? "Year" : "Tahun"}:</h4>
          <p>{studentDetail.year}</p>
          <h4>{language === "en" ? "Address" : "Alamat"}:</h4>
          <p>{studentDetail.address}</p>
          <h4>{language === "en" ? "Gender" : "Jenis Kelamin"}:</h4>
          <p>{studentDetail.gender}</p>
          <h4>{language === "en" ? "Guardian Name" : "Nama Wali"}:</h4>
          <p>{studentDetail.guardian_name}</p>
        </div>
      </div>
    </>
  );
}

Detail.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      nim: PropTypes.string.isRequired,
      class: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      birthDate: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      guardian_name: PropTypes.string.isRequired,
    })
  ).isRequired,
};