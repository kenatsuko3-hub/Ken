export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, key } = req.body || {};

      if (username === "admin" && key === "1234") {
        return res.redirect("/?msg=Login berhasil!");
      } else {
        return res.redirect("/?msg=Username atau password salah!");
      }

    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Terjadi kesalahan server.");
    }
  } else {
    res.status(405).send("Method tidak diizinkan");
  }
}
