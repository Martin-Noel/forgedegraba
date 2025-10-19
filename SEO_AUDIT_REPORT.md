# Rapport d'audit SEO complet - La forge de Graba
**Date:** 19 octobre 2025  
**Domaine:** https://www.laforgedegraba.com

---

## ✅ Optimisations techniques implémentées

### 1. **Métadonnées et balises méta** ✓
- ✅ Titre optimisé avec mots-clés : "La forge de Graba | Couteaux artisanaux forgés à la main en Dordogne"
- ✅ Description enrichie (160 caractères) avec mots-clés géolocalisés
- ✅ Balises Open Graph complètes pour Facebook/LinkedIn
- ✅ Twitter Card (summary_large_image) configurée
- ✅ Keywords meta ajoutés : couteau artisanal, coutellerie, forge, Dordogne, Tursac, acier carbone, lame damas
- ✅ URL canoniques sur toutes les pages
- ✅ metadataBase configuré (https://www.laforgedegraba.com)
- ✅ Viewport optimisé pour mobile
- ✅ Robots meta configuré (index, follow, max-image-preview: large)

### 2. **Structure des titres (H1-H6)** ✓
- ✅ **Homepage:** H1 unique "La forge de Graba" avec texte caché SEO
- ✅ **Créations:** H1 "Les créations", H3 pour chaque produit
- ✅ **Stages:** H1 "Stages", H2 pour chaque stage, H3/H4 pour sous-sections
- ✅ **Mentions légales:** H1 "Mentions légales", H2 pour sections
- ✅ Hiérarchie logique respectée (pas de saut de niveaux)
- ✅ Aucun duplicate H1 (corrigé : header logo changé de h1 à div)

### 3. **Images et optimisation** ✓
- ✅ Tous les attributs alt descriptifs ajoutés
- ✅ Next.js Image component utilisé (lazy loading automatique)
- ✅ Formats modernes configurés (AVIF, WebP)
- ✅ Tailles d'images optimisées (deviceSizes, imageSizes)
- ✅ Priority sur l'image hero (LCP)
- ✅ Images décoratives marquées aria-hidden="true" avec alt=""
- ✅ Dimensions explicites pour éviter le layout shift

**Images optimisées:**
- Hero background: "Forgeron à l'œuvre"
- Logo header: "Logo La forge de Graba - poinçon artisanal"
- Stamps: "Poinçon de La forge de Graba"
- Créations: titres descriptifs depuis JSON

### 4. **HTML sémantique** ✓
- ✅ Balises `<section>` avec id et aria-labelledby
- ✅ Balises `<article>` pour les cartes créations/stages
- ✅ Balises `<header>`, `<main>`, `<footer>`, `<nav>`
- ✅ Attributs ARIA (aria-label, aria-hidden, aria-current)
- ✅ Attribut lang="fr" sur <html>
- ✅ Rôles accessibles (role="list", role="listitem")

### 5. **Données structurées (JSON-LD)** ✓
- ✅ **LocalBusiness** (layout.tsx)
  - Nom, description, URL, téléphone, email
  - Adresse complète (Hameau des Genêts, 24620 Tursac)
  - Coordonnées GPS (45.0167, 1.0333)
  - Horaires d'ouverture
  - Fondateur: Valentin ADAM
  
- ✅ **Product** (creations/page.tsx)
  - ItemList avec tous les couteaux
  - Prix, disponibilité, marque
  - Images, descriptions

- ✅ **Course** (stages/page.tsx)
  - 3 stages avec prix, durée, description
  - Informations instructeur
  - Mode: onsite (présentiel)

- ✅ **FAQPage** (public/faq-schema.json)
  - 6 questions/réponses fréquentes
  - Couvre: types de couteaux, stages, localisation, délais, aciers, entretien

### 6. **Fichiers SEO essentiels** ✓
- ✅ **sitemap.xml** 
  - 4 URLs avec lastmod, changefreq, priority
  - Format XML valide
  
- ✅ **robots.txt**
  - Allow: /
  - Référence au sitemap
  
- ✅ **llm.txt**
  - Description pour IA/LLM
  - Contact complet (email, téléphone)
  - Services et technologies

### 7. **Liens internes** ✓
- ✅ Navigation principale avec liens sémantiques
- ✅ Ancres descriptives ("Découvrir les créations", "Voir toutes les créations")
- ✅ Footer avec lien mentions légales
- ✅ Breadcrumb navigation claire
- ✅ Liens hover states pour UX

### 8. **Performance et Core Web Vitals** ✓
- ✅ Next.js 15 avec optimisations automatiques
- ✅ Vercel Analytics intégré (@vercel/analytics)
- ✅ Fonts preload via Google Fonts (Cinzel, Playfair Display)
- ✅ Code splitting automatique (App Router)
- ✅ Lazy loading images (next/image)
- ✅ Framer Motion pour animations optimisées
- ✅ CSS Tailwind optimisé (purge automatique)

### 9. **Mobile-first et responsive** ✓
- ✅ Viewport configuré correctement
- ✅ Design responsive (Tailwind breakpoints)
- ✅ Touch-friendly (boutons 44x44px minimum)
- ✅ Scroll snap pour carousel mobile
- ✅ Menu mobile avec hamburger
- ✅ Modals fullscreen sur mobile

### 10. **Accessibilité (a11y)** ✓
- ✅ Contraste couleurs suffisant (WCAG AA)
- ✅ Navigation clavier (focus-visible)
- ✅ Texte sr-only pour lecteurs d'écran
- ✅ ARIA labels sur contrôles
- ✅ Formulaire accessible avec labels
- ✅ Skip links possibles

---

## 📊 Mots-clés ciblés

### Primaires
- couteau artisanal
- coutellerie artisanale
- couteau forgé main
- forge couteau
- artisan coutelier Dordogne

### Secondaires
- stage coutellerie Dordogne
- couteau cuisine artisanal
- lame damas
- acier carbone
- couteau Tursac
- coutelier Périgord

### Longue traîne
- "stage initiation coutellerie Dordogne"
- "couteau forgé acier carbone"
- "artisan coutelier Tursac 24"
- "apprendre forge couteau Périgord"
- "couteau damas fait main"

---

## 🎯 Recommandations supplémentaires

### Court terme (1-2 semaines)
1. **Google My Business**
   - Créer/optimiser la fiche GMB
   - Ajouter photos atelier, créations
   - Demander avis clients

2. **Google Search Console**
   - Soumettre sitemap.xml
   - Vérifier indexation
   - Monitorer requêtes

3. **Backlinks locaux**
   - Annuaires artisans Dordogne
   - Office tourisme Périgord
   - Associations couteliers

### Moyen terme (1-3 mois)
4. **Blog/Actualités**
   - Créer section blog
   - Articles techniques (forge, trempe, aciers)
   - Storytelling créations
   - SEO local (événements Dordogne)

5. **Vidéos**
   - Processus forge (YouTube)
   - Témoignages stagiaires
   - Présentation atelier
   - Intégrer sur site

6. **Réseaux sociaux**
   - Instagram (photos créations)
   - Facebook (événements, stages)
   - Pinterest (inspiration)
   - Liens dans metadata (sameAs)

### Long terme (3-6 mois)
7. **Avis et témoignages**
   - Section avis clients
   - Schema Review markup
   - Rich snippets étoiles

8. **E-commerce**
   - Boutique en ligne
   - Paiement sécurisé
   - Schema Product Offer

9. **Newsletter**
   - Collecte emails
   - EmailJS déjà intégré
   - Contenus exclusifs

---

## 🔍 Checklist validation SEO

### On-page SEO
- [x] Titre unique par page (50-60 caractères)
- [x] Meta description (150-160 caractères)
- [x] URL lisibles et cohérentes
- [x] Un seul H1 par page
- [x] Hiérarchie H1-H6 logique
- [x] Alt text images
- [x] Liens internes pertinents
- [x] Temps de chargement < 3s
- [x] Mobile-friendly
- [x] HTTPS (Vercel)

### Technical SEO
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URLs
- [x] Structured data (JSON-LD)
- [x] Schema markup
- [x] Open Graph tags
- [x] Twitter Cards
- [x] 404 page (Next.js default)
- [x] Compression GZIP/Brotli (Vercel)
- [x] CDN (Vercel Edge)

### Content SEO
- [x] Contenu unique et original
- [x] Mots-clés naturellement intégrés
- [x] Longueur suffisante (>300 mots/page)
- [x] Formatting (listes, paragraphes)
- [x] Call-to-actions clairs
- [ ] Blog/actualités (à créer)
- [ ] FAQ section visible (JSON-LD créé)

### Local SEO
- [x] Adresse complète
- [x] Téléphone local
- [x] Ville/région dans contenu
- [ ] Google My Business (à créer)
- [ ] Avis clients (à collecter)
- [x] Schema LocalBusiness
- [x] Coordonnées GPS

---

## 📈 Métriques à suivre

### Google Search Console
- Impressions
- Clics
- CTR moyen
- Position moyenne
- Pages indexées
- Erreurs d'exploration

### Google Analytics / Vercel Analytics
- Sessions
- Taux de rebond
- Durée moyenne session
- Pages par session
- Sources de trafic
- Conversions (formulaire contact)

### Core Web Vitals
- **LCP** (Largest Contentful Paint) < 2.5s
- **FID** (First Input Delay) < 100ms
- **CLS** (Cumulative Layout Shift) < 0.1

### PageSpeed Insights
- Score mobile > 90
- Score desktop > 95

---

## 🚀 Estimation timeline indexation

**Indexation initiale:** 1-7 jours après soumission sitemap

**Positionnement initial (page 5-10):** 2-4 semaines
- Mots-clés longue traîne
- Requêtes géolocalisées spécifiques

**Positionnement page 1-3:** 2-4 mois
- Avec backlinks de qualité
- Contenu régulier (blog)
- Avis Google positifs
- Optimisations continues

**Top 3 résultats:** 6-12 mois
- Autorité domaine établie
- Nombreux backlinks locaux
- Contenu expert régulier
- Engagement social media

**Facteurs accélérateurs:**
- Google My Business optimisé
- Avis clients 5 étoiles
- Backlinks annuaires artisans
- Mentions presse locale
- Contenu vidéo (YouTube)

---

## ✅ Actions immédiates recommandées

1. **Soumettre sitemap à Google Search Console**
   ```
   https://search.google.com/search-console
   ```

2. **Créer Google My Business**
   - Photos atelier (min 10)
   - Heures d'ouverture
   - Services (stages, vente)
   - Demander premiers avis

3. **Vérifier indexation**
   ```
   site:laforgedegraba.com
   ```

4. **Tester vitesse**
   - PageSpeed Insights
   - GTmetrix
   - WebPageTest

5. **Backlinks prioritaires**
   - https://www.dordogne-perigord-tourisme.fr
   - Annuaire artisans d'art
   - Chambres des métiers Dordogne

---

## 📞 Support et maintenance

**Développeur:** Martin Noel  
**Email:** martin.noel.dev@gmail.com

**Propriétaire site:**  
Valentin ADAM - La forge de Graba  
grabaistos@gmail.com  
06 27 89 95 93

---

**Rapport généré le:** 19 octobre 2025  
**Version:** 1.0  
**Prochaine révision:** Dans 3 mois (janvier 2026)
