function sendPhone() {
  const phone = document.getElementById("phone").value;
  const status = document.getElementById("status");

  if (!phone) {
    status.innerText = "Please enter a phone number";
    return;
  }

  status.innerText = "Sending...";

  fetch("https://otp-varification-bice.vercel.app/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      phone: phone
    })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("Request failed");
    }
    return res.text();
  })
  .then(() => {
    status.innerText = "Phone number sent successfully!";
  })
  .catch(err => {
    console.error(err);
    status.innerText = "Error sending phone number";
  });
}
