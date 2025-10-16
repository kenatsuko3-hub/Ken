export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let body = req.body;

      // If body is empty or string, try to read raw data (helps with form submissions)
      if (!body || (typeof body === 'object' && Object.keys(body).length === 0)) {
        body = await new Promise((resolve) => {
          let data = '';
          if (req.on) {
            req.on('data', chunk => data += chunk);
            req.on('end', () => resolve(data));
          } else {
            resolve(body);
          }
          // safety timeout
          setTimeout(() => resolve(data || body), 50);
        });
      }

      // If body is a raw string like "username=..&key=..", parse it
      if (typeof body === 'string') {
        const parsed = {};
        body.split('&').forEach(pair => {
          if (!pair) return;
          const kv = pair.split('=');
          const k = decodeURIComponent(kv[0] || '');
          const v = decodeURIComponent(kv[1] || '');
          parsed[k] = v;
        });
        body = parsed;
      }

      const { username, key } = body || {};

      // validated credentials
      if (username === "KennCiiile" && key === "2345") {
        res.writeHead(302, { Location: '/?msg=Login berhasil.' });
        return res.end();
      } else {
        res.writeHead(302, { Location: '/?msg=Username atau password salah.' });
        return res.end();
      }

    } catch (err) {
      console.error("Error in /api/auth:", err);
      res.statusCode = 500;
      res.end("Terjadi kesalahan server.");
    }
  } else {
    // Friendly message on GET
    res.statusCode = 200;
    res.end("Gunakan metode POST untuk login.");
  }
}
