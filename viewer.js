(function () {
  const db = window.MLL?.db;
  if (!db) return;

  const uid = new URLSearchParams(location.search).get("uid");
  document.getElementById("viewerUid").textContent = uid || "—";

  if (!uid) return;

  const profileRef =
    db.collection("users").doc(uid).collection("profile").doc("main");

  const logsRef =
    db.collection("scans").doc(uid).collection("logs");

  profileRef.get().then((snap) => {
    if (!snap.exists) return;

    const p = snap.data();
    document.getElementById("viewerCard").classList.remove("d-none");

    document.getElementById("viewerCardBody").innerHTML = `
      <h4>${p.name || "—"}</h4>
      <div>Age: ${p.age || "—"}</div>
      <div><strong>Blood:</strong> ${p.bloodGroup || "—"}</div>
      <hr>
      <strong>Contacts</strong>
      <ul>
        ${(p.emergencyContacts || []).map(c =>
          `<li>${c.name} – ${c.phone}</li>`).join("")}
      </ul>
      <hr>
      <strong>Medical Notes</strong>
      <div>${p.medicalNotes || "None"}</div>
    `;
  });

  logsRef.add({
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    userAgent: navigator.userAgent
  }).then(() => {
    document.getElementById("scanStatus").textContent = "Scan logged";
  });
})();
