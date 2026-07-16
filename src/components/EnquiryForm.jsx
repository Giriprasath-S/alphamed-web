import { useState } from "react";

const EnquiryForm = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const update = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "https://formspree.io/f/xgogoroy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Failed");
      }

      alert("Enquiry submitted successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      alert("Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #4f5d7a",
    backgroundColor: "#34415f",
    color: "#ffffff",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Full name"
          value={form.name}
          onChange={update("name")}
          style={inputStyle}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={update("email")}
          style={inputStyle}
          required
        />
      </div>

      <input
        type="text"
        placeholder="Phone number"
        value={form.phone}
        onChange={update("phone")}
        style={inputStyle}
        required
      />

      <textarea
        rows={4}
        placeholder="Comments (optional)"
        value={form.message}
        onChange={update("message")}
        style={inputStyle}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: "#D9A52A",
          color: "#001B44",
          border: "none",
          padding: "16px",
          borderRadius: "12px",
          fontWeight: "600",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        {loading ? "Sending..." : "Submit Enquiry"}
      </button>
    </form>
  );
};

export default EnquiryForm;