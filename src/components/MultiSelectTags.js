// src/components/MultiSelectTags.js
import React, { useState } from "react";

export default function MultiSelectTags({ options, selectedValues, onChange }) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (value) => {
    if (value && !selectedValues.includes(value)) {
      onChange([...selectedValues, value]);
      setInputValue("");
    }
  };

  const removeTag = (value) => {
    onChange(selectedValues.filter(v => v !== value));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const styles = {
    container: {
      border: "1px solid #ccc",
      borderRadius: "6px",
      padding: "5px 8px",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "5px",
      minHeight: "44px",
      cursor: "text",
    },
    tag: {
      backgroundColor: "#1E88E5",
      color: "#fff",
      padding: "5px 10px",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontSize: "14px",
    },
    removeBtn: {
      cursor: "pointer",
      fontWeight: "bold",
    },
    input: {
      border: "none",
      outline: "none",
      flex: 1,
      minWidth: "100px",
      fontSize: "14px",
      padding: "5px",
    },
    dropdown: {
      border: "1px solid #ccc",
      borderRadius: "6px",
      maxHeight: "100px",
      overflowY: "auto",
      marginTop: "5px",
      position: "absolute",
      backgroundColor: "#fff",
      width: "100%",
      zIndex: 100,
    },
    dropdownItem: {
      padding: "8px",
      cursor: "pointer",
    },
    dropdownItemHover: {
      backgroundColor: "#f0f0f0",
    },
    wrapper: {
      position: "relative",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container} onClick={() => document.getElementById("tag-input")?.focus()}>
        {selectedValues.map((val, idx) => (
          <div key={idx} style={styles.tag}>
            {options.find(o => o.id === val)?.name || val}
            <span style={styles.removeBtn} onClick={() => removeTag(val)}>×</span>
          </div>
        ))}
        <input
          id="tag-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter..."
          style={styles.input}
        />
      </div>
      {inputValue && (
        <div style={styles.dropdown}>
          {options
            .filter(o => o.name.toLowerCase().includes(inputValue.toLowerCase()) && !selectedValues.includes(o.id))
            .map(o => (
              <div
                key={o.id}
                style={styles.dropdownItem}
                onClick={() => addTag(o.id)}
              >
                {o.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}