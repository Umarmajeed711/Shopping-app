import React, { useEffect, useState } from "react";

export const Friends = () => {

    const [Allusers,setAllUsers] = useState([]);

    useEffect(() => {
        let unsubscribe;
    
        // function for get real time data
        const getRealTimeData = async () => {
          const q = query(collection(db, "posts"),orderBy("authorName"));
           unsubscribe = onSnapshot(q, (querySnapshot) => {
            const realTimePost = [];
            querySnapshot.forEach((doc) => {
              realTimePost.push({...doc.data(), id : doc.id});
              
            });
            setAllUsers(realTimePost);
            
          });
        };
        getRealTimeData();
    
        // function for disconnect the connect of page to the database
        return () => {
          unsubscribe();
        }
      },[] );
  return (
    <div className="home">
      <div
        className="d-flex justify-content-start mt-5 flex-column align-items-center"
        style={{ minHeight: "100vh", color: "#fff" }}
      >
        <div className="d-flex flex-column gap-2 mt-3">
          {AllUsers.map((user, i) => {
            return (
              <div key={i} className="post">
                {/* user Detail */}
                <div className="d-flex gap-2">
                  <div className="userImage">
                    <img
                      src={user.authorProfile}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "50%",
                      }}
                      onError={(e) => {
                        e.target.src = "/image.png";
                      }}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <p className="userName">{user.authorName}</p>
                    <div>
                      <button>Add Friend</button>
                      <button>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
