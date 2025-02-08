document.getElementById("ticketForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const github = document.getElementById("github").value;
    const avatarInput = document.getElementById("avatar").files[0];
  
    // Validate email format
    if (!validateEmail(email)) {
      alert("Invalid email format!");
      return;
    }
  
    // Validate avatar file type and size
    if (avatarInput) {
      const validTypes = ["image/png", "image/jpeg"];
      if (!validTypes.includes(avatarInput.type)) {
        alert("Only JPG and PNG files are allowed.");
        return;
      }
  
      if (avatarInput.size > 500 * 1024) { // 500KB
        alert("Image size must be less than 500KB.");
        return;
      }
  
      const reader = new FileReader();
      reader.onload = function (e) {
        generateTicket(name, email, github, e.target.result);
      };
      reader.readAsDataURL(avatarInput);
    } else {
      generateTicket(name, email, github, "");
    }
  });
  
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function generateTicket(name, email, github, avatarSrc) {
    document.getElementById("ticketContainer").classList.remove("hidden");
    document.getElementById("ticketName").textContent = name;
    document.getElementById("ticketEmail").textContent = email;
    document.getElementById("ticketFullName").textContent = name;
    document.getElementById("ticketGithub").textContent = `@${github}`;
    document.getElementById("ticketAvatar").src = avatarSrc || "assets/images/default-avatar.png";
  }
  
  // Ticket Download
  document.getElementById("downloadBtn").addEventListener("click", function () {
    const ticketElement = document.getElementById("ticketContainer");
    html2canvas(ticketElement).then(canvas => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "ticket.png";
      link.click();
    });
  });
  