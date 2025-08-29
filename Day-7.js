//task-7 of hackathon....

import React, { useState } from "react";

//React component: Counter + Live Text Preview

export default function CounterPreview() {
  // state for counter
  const [count, setCount] = useState(0);
  // state for text input
  const [text, setText] = useState("");

  // simple handlers (easy to understand)
  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    // prevent negative if you want
    if (count > 0) setCount(count - 1);
  }

  function reset() {
    setCount(0);
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  function clearText() {
    setText("");
  }

  // small inline styles so beginner doesn't have to make separate css file
  const boxStyle = {
    maxWidth: "700px",
    margin: "30px auto",
    padding: "18px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    background: "#fafafa",
  };

  const btn = {
    padding: "8px 12px",
    margin: "6px",
    borderRadius: "6px",
    border: "1px solid #bbb",
    cursor: "pointer",
    background: "white",
  };

  const bigNum = {
    fontSize: "40px",
    fontWeight: "700",
    margin: "10px 0",
  };

  return (
    <div style={boxStyle}>
      <h2 style={{ margin: 0 }}>Counter + Live Text Preview</h2>
      <p style={{ color: "#555", marginTop: "6px" }}>
        Simple beginner example: increment / decrement counter and live preview of text input.
      </p>

      <hr style={{ margin: "14px 0" }} />

      {/* Counter Section */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button style={btn} onClick={decrement} aria-label="decrement">
            -
          </button>

          <div style={bigNum} aria-live="polite">
            {count}
          </div>

          <button style={btn} onClick={increment} aria-label="increment">
            +
          </button>

          <button style={{ ...btn, marginLeft: "auto" }} onClick={reset}>
            Reset
          </button>
        </div>

        <p style={{ marginTop: "8px", color: "#444" }}>
          Counter is <strong>{count % 2 === 0 ? "Even" : "Odd"}</strong>.
        </p>
      </div>

      <hr style={{ margin: "14px 0" }} />

      {/* Live Text Preview Section */}
      <div>
        <label style={{ display: "block", marginBottom: "6px" }} htmlFor="previewInput">
          Enter text (live preview below):
        </label>
        <input
          id="previewInput"
          value={text}
          onChange={handleChange}
          placeholder="Type something..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
          <small style={{ color: "#666" }}>{text.length} characters</small>
          <button style={btn} onClick={clearText}>
            Clear
          </button>
        </div>

        <div
          style={{
            marginTop: "12px",
            padding: "12px",
            minHeight: "60px",
            borderRadius: "6px",
            background: "white",
            border: "1px dashed #ddd",
          }}
        >
          {/* Live preview area */}
          {text ? (
            <p style={{ margin: 0 }}>{text}</p>
          ) : (
            <p style={{ margin: 0, color: "#999" }}>Live preview will appear here...</p>
          )}
        </div>
      </div>

      <hr style={{ margin: "14px 0" }} />

      {/* Tips for beginner */}
      <div style={{ fontSize: "13px", color: "#666" }}>
        <p style={{ margin: "6px 0" }}>
          Tip: This is a controlled input (value comes from state). Try typing and pressing the + or - buttons.
        </p>
      </div>
    </div>
  );
}
