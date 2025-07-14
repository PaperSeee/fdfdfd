# Déploiement sur Vercel – Site statique HTML/CSS/JS

Ce projet est un site statique moderne (HTML, CSS, JS Vanilla, Three.js, GSAP, etc.) **sans Next.js**.

## Structure minimale attendue

```
/ (racine du repo)
  index.html
  styles.css
  main.js
  three-scene.js
  loader.js
  ...
```

## Déploiement sur Vercel

1. **Créer un nouveau projet sur Vercel** (import GitHub ou upload manuel).
2. **Dans les paramètres du projet Vercel** :
   - **Framework Preset** : sélectionnez `Other` ou `Static Site` (pas Next.js !)
   - **Root Directory** : mettez le dossier où se trouve `index.html` (souvent la racine).
   - **Build Command** : laissez vide (ou mettez `echo "no build"`)
   - **Output Directory** : laissez vide ou mettez `.` (racine)
3. **Supprimez tout fichier ou config Next.js** (`next.config.js`, `pages/`, etc.) s’il y en a.
4. **Supprimez le fichier `package.json`** si vous n’avez pas besoin de dépendances Node (optionnel, mais évite la confusion).
5. **Déployez**. Vercel servira automatiquement votre `index.html` comme page d’accueil.

## Résolution de l’erreur “No Next.js version detected”

- Cette erreur apparaît si Vercel pense que votre projet est un projet Next.js alors qu’il ne l’est pas.
- Vérifiez bien que le preset/framework choisi est “Other” ou “Static Site”, **pas Next.js**.
- Vérifiez que la racine du projet contient bien `index.html`.
- Supprimez toute référence à Next.js dans le projet.

## Exemple de configuration Vercel

- **Framework Preset** : Other
- **Root Directory** : .
- **Build Command** : (vide)
- **Output Directory** : .

---

**Votre site sera alors servi comme un site statique ultra-performant, sans build Node/Next.js.** 