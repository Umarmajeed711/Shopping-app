import { getAuth, verifyBeforeUpdateEmail } from 'firebase/auth';
import React, { useState } from 'react'

export const practice = () => {
     // show form hook
      const [showForm, setShowForm] = useState(false);
       const [newEmail, setNewEmail] = useState("");
      
       const auth = getAuth();
        // function for edit email
        const changeEmail = (e) => {
          e.preventDefault();
      
          verifyBeforeUpdateEmail(auth.currentUser, newEmail)
            .then(() => {
              // Email updated!
              console.log("Email Updated");
              handleClose()
              // ...
            })
            .catch((error) => {
              // An error occurred
              console.log("Update Email Error", error);
              // ...
            });
        };

        const handleClose = () => {
            setShowForm(false)
            setNewEmail("")
          }
        
  return (
    <div>
        {/* button for show form */}

      {/* <button
        onClick={() => setShowForm((oldValue) => !oldValue)}
        className="button"
      >
        {showForm ? "Hide" : "Show"} Form
      </button> */}

      {/* show form div */}
      {/* <div>
        {showForm ? (
          <form onSubmit={changeEmail}>
            <label htmlFor="newEmail">
              New Email:{" "}
              <input
                value={newEmail}
                type="email"
                onChange={(e) => {
                  setNewEmail(e.target.value);
                }}
                required
              />
              <button type="submit" className="button">
                Submit
              </button>
            </label>
          </form>
        ) : null}
      </div> */}
    </div>
  )
}
