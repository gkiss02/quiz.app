import styles from "./Settings.module.css";
import BlueButton from "../UI/BlueButton";
import ButtonContainer from "../UI/ButtonContainer";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getAuthToken } from "../util/auth";
import User from "../util/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../Components/DeleteModal/DeleteModal";

function Settings() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState(new User(0, "", "", "", ""));
  const [profilePicture, setProfilePicture] = useState("");
  const [showModal, setShowModal] = useState(false);

  const arr: string[] = [];
  
  const backIcon = require("../Images/back.png");

  function toHome() {
    navigate("/main");
  }

  function showModalHandler() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function profilePictureClick(event: any) {
    setProfilePicture(event.target.src);
  }

  function updateProfilePicture() {
    fetch('http://localhost:8080/users/updateProfilePicture', {
      method: 'PATCH',
      headers: {
        Authorization: "Bearer " + getAuthToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          profilePicture: profilePicture
      })
    })
  }

  function updateEmail() {
    fetch('http://localhost:8080/users/updateEmail', {
      method: 'PATCH',
      headers: {
        Authorization: "Bearer " + getAuthToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: emailRef.current?.value
      })
    })
  }

  function updatePassword() {
    fetch('http://localhost:8080/users/updatePassword', {
      method: 'PATCH',
      headers: {
        Authorization: "Bearer " + getAuthToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: passwordRef.current?.value,
        passwordConfirm: passwordConfirmRef.current?.value
      })
    })
  }

  useEffect(() => {
    async function fetchMyData() {
      const response = await fetch("http://localhost:8080/users/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + getAuthToken(),
        },
      });
      const data = await response.json();
      setUser(data);
      setProfilePicture(data.profilePicture);
    }
    fetchMyData();
  }, []);

  arr.push("https://i.ibb.co/Bg4G0m5/woman1.png")
  arr.push("https://i.ibb.co/JzNqyv7/woman2.png")
  arr.push("https://i.ibb.co/2g9qyNt/woman3.png")
  arr.push("https://i.ibb.co/tsShGjD/woman4.png")
  arr.push("https://i.ibb.co/18qpxs6/woman5.png")
  arr.push("https://i.ibb.co/SQb81Qk/woman6.png")
  arr.push("https://i.ibb.co/4j0fH2X/woman7.png")
  arr.push("https://i.ibb.co/8rQcDVd/woman8.png")
  arr.push("https://i.ibb.co/s633K4Y/woman9.png")
  arr.push("https://i.ibb.co/SsFwpgY/woman10.png")
  arr.push("https://i.ibb.co/8cD2yHq/man1.png")
  arr.push("https://i.ibb.co/w6LNC43/man2.png")
  arr.push("https://i.ibb.co/mhdMdtz/man3.png")
  arr.push("https://i.ibb.co/6nnDNMD/man4.png")
  arr.push("https://i.ibb.co/N92K8v9/man5.png")
  arr.push("https://i.ibb.co/mThDMXb/man6.png")
  arr.push("https://i.ibb.co/CKW50DB/man7.png")
  arr.push("https://i.ibb.co/x8RZx79/man8.png")
  arr.push("https://i.ibb.co/mT3GfQV/man9.png")
  arr.push("https://i.ibb.co/58Tcxv7/man10.png")

  return (
    <div className={styles.container}>
      <img src={backIcon} className={styles.icon} onClick={toHome}></img>
      <div className={styles["element-container"]}>
        <h2>Profile Picture</h2>
        <div className={styles["input-container"]}>
          <div className={styles["image-container"]}>
            {arr.map((image, index) =>
              <div className={styles['image-wrapper']} onClick={profilePictureClick}>
                {profilePicture == image && <FontAwesomeIcon icon={faCheck} className={styles.marker}/>}
                <img key={index} src={image} className={`${styles.image}`}></img>
              </div>
            )}
          </div>
          <ButtonContainer>
            <BlueButton onClick={updateProfilePicture}>Save</BlueButton>
          </ButtonContainer>
        </div>
      </div>
      <div className={styles["element-container"]}>
        <h2>Email</h2>
        <div className={styles["input-container"]}>
          <input type="email" placeholder={user.email} className={styles.input} ref={emailRef}></input>
          <ButtonContainer>
            <BlueButton onClick={updateEmail}>Save</BlueButton>
          </ButtonContainer>
        </div>
      </div>
      <div className={styles["element-container"]}>
        <h2>Password</h2>
        <div className={styles["input-container"]}>
          <label>New password</label>
          <input type="password" placeholder="••••••••" className={styles.input} ref={passwordRef}></input>
          <label>Confirm password</label>
          <input type="password" placeholder="••••••••" className={styles.input} ref={passwordConfirmRef}></input>
          <ButtonContainer>
            <BlueButton onClick={updatePassword}>Save</BlueButton>
          </ButtonContainer>
        </div>
      </div>
      <div className={styles["element-container"]}>
        <div className={styles["single-item"]}>
          <h2>Dark mode</h2>
          <Switch></Switch>
        </div>
      </div>
      <div className={styles['delete-button_container']}>
        <button className={styles['delete-button']} onClick={showModalHandler}>Delete Profile</button>
      </div>
      {showModal && <DeleteModal closeModal={closeModal}></DeleteModal>}
    </div>
  );
}

export default Settings;
