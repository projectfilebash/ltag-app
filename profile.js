(function () {
  const db = window.MLL?.db;
  if (!db) return;

  function ref(uid) {
    return db.collection("users").doc(uid).collection("profile").doc("main");
  }

  window.MLL.getProfile = async (uid) => {
    const snap = await ref(uid).get();
    return snap.exists ? snap.data() : null;
  };

  window.MLL.saveProfile = async (uid, data) => {
    const payload = {
      name: (data.name || "").trim(),
      age: Number(data.age || 0),
      bloodGroup: (data.bloodGroup || "").trim(),
      medicalNotes: (data.medicalNotes || "").trim(),
      emergencyContacts: Array.isArray(data.emergencyContacts)
        ? data.emergencyContacts
        : [],
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    const r = ref(uid);
    const existing = await r.get();
    if (!existing.exists) {
      payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    }

    await r.set(payload, { merge: true });
    return payload;
  };

  window.MLL.parseContactsFromForm = (box) => {
    const rows = box.querySelectorAll("[data-contact]");
    return [...rows].map((r) => ({
      name: r.querySelector("input[name=name]").value.trim(),
      phone: r.querySelector("input[name=phone]").value.trim()
    })).filter(c => c.name || c.phone);
  };

  window.MLL.renderContactsToForm = (box, contacts) => {
    box.innerHTML = "";
    (contacts.length ? contacts : [{}]).forEach(c =>
      window.MLL.addContactRow(box, c.name || "", c.phone || "")
    );
  };

  window.MLL.addContactRow = (box, name, phone) => {
    const row = document.createElement("div");
    row.dataset.contact = "1";
    row.className = "row g-2 mb-2";

    row.innerHTML = `
      <div class="col-5">
        <input class="form-control" name="name" placeholder="Name" value="${name}">
      </div>
      <div class="col-5">
        <input class="form-control" name="phone" placeholder="Phone" value="${phone}">
      </div>
      <div class="col-2">
        <button class="btn btn-outline-danger w-100">✕</button>
      </div>
    `;

    row.querySelector("button").onclick = () => {
      row.remove();
      if (!box.querySelector("[data-contact]")) {
        window.MLL.addContactRow(box, "", "");
      }
    };

    box.appendChild(row);
  };
})();
