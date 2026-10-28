# Avatar Roi — web y servidor

Archivos: index.html, valorar.html, privacy.html, avatar.js, roi.png, logo.svg, supabase.sql y la carpeta api/.

## Activar rankings, mapa y contactos reales
1. supabase.com → New project (plan gratis). SQL Editor → pega supabase.sql → Run.
2. Settings → API: copia Project URL y la clave `service_role` (SECRETA: solo va en Vercel, nunca en la extensión ni en la web).
3. Vercel → tu proyecto → Settings → Environment Variables: SUPABASE_URL y SUPABASE_SERVICE_KEY. Redeploy.
4. En la extensión: pon la dirección `https://TU-DOMINIO.vercel.app/api/ratings` en `API` (content.js) y `https://TU-DOMINIO.vercel.app/` en `API_ORIGIN` (background.js).
5. En index.html cambia CONTACT_EMAIL por tu email y rellena los corchetes de privacy.html.
