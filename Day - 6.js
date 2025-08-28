//task - 6 of hackathon....
import React from "react";

function ProfileCard(props) {
  return (
    <div style={{
      border: "1px solid black",
      borderRadius: "10px",
      width: "250px",
      padding: "15px",
      textAlign: "center",
      margin: "20px auto"
    }}>
      <img 
        src={props.image} 
        alt="profile" 
        style={{width: "100px", height: "100px", borderRadius: "50%"}}
      />
      <h2>{props.name}</h2>
      <p>{props.bio}</p>
      <button style={{
        marginTop: "10px",
        padding: "5px 15px",
        backgroundColor: "blue",
        color: "white",
        border: "none",
        borderRadius: "5px"
      }}>
        Follow
      </button>
    </div>
  );
}

// Example usage
export default function App() {
  return (
    <div>
      <ProfileCard 
        name="Bunty Bhai" 
        bio="College Student | Learning React 🚀" 
        image="https://via.placeholder.com/100"
      />
    </div>
  );
}
