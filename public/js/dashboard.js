document.getElementById("btnLoad").addEventListener("click", async () => {
  const res = await fetch("/api/session");
  const data = await res.json();
  console.log(data);
  

  if (res.ok) {
    document.getElementById("output").innerHTML = `
          <h2>Token brut :</h2>
          <pre>${data.access_token}</pre>

          <h2>Token décodé :</h2>
          <pre>${JSON.stringify(data.user, null, 2)}</pre>
        `;
  } else {
    document.getElementById("output").innerHTML = `
          <p style="color:red">${data.message}</p>
        `;
  }
});

document.getElementById("btnLogout").addEventListener("click", async () => {
  const res = await fetch("/api/auth/logout", { method: "POST" });
  if (res.ok) {
    window.location.href = "/";
  } else {
    window.location.href = "/";
  }
});
