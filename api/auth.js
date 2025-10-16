export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let body = req.body;

      // If body is empty, try to read raw data (handles form urlencoded)
      if (!body || (typeof body === 'object' && Object.keys(body).length === 0)) {
        body = await new Promise((resolve) => {
          let data = '';
          req.on && req.on('data', chunk => data += chunk);
          req.on && req.on('end', () => resolve(data));
          // fallback for environments where req is already parsed to string
          setTimeout(() => resolve(body), 5);
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

      if (username === "KennCiiile" && key === "2345") {
        // redirect to home with success message
        res.writeHead(302, { Location: '/?msg=Login berhasil!' });
        return res.end();
      } else {
        res.writeHead(302, { Location: '/?msg=Username atau password salah!' });
        return res.end();
      }

    } catch (err) {
      console.error("Error in /api/auth:", err);
      res.statusCode = 500;
      res.end("Terjadi kesalahan server.");
    }
  } else {
    res.statusCode = 405;
    res.end("Method tidak diizinkan");
  }
}
