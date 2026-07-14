const fs = require('fs');

async function testSubmit() {
  const formData = new FormData();
  formData.append("college_name", "Test College (New)");
  formData.append("college_website", "https://test.com");
  formData.append("club_name", "Test Club");
  formData.append("club_email", "testnew@test.com");
  formData.append("club_instagram", "test");
  formData.append("coordinator_name", "Test Coord");
  formData.append("designation", "President");
  formData.append("contact_number", "1234567890");
  formData.append("whatsapp_number", "1234567890");
  formData.append("description", "Desc");
  formData.append("experience", "Exp");
  
  const buf = fs.readFileSync('public/logos/logoFF.png');
  const blob = new Blob([buf], { type: 'image/png' });
  formData.append("college_logo", blob, "test.png");

  try {
    const res = await fetch("http://localhost:3000/api/college-requests", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Response:", data);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

testSubmit();
