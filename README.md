# BREACH — Outpost FPS

An original 3D tactical first-person shooter web application built with **WebGL 2**, **Three.js**, and **Next.js 16**. Play solo survival against endless escalating enemy waves or squad up in private 6-player multiplayer rooms with tactical abilities, multiple game modes, and custom procedural weaponry.

Runs directly in modern desktop web browsers without downloads or extensions.

---

## Features

- **Game Modes**:
  - **Co-op Outpost Defense**: Defend the compound against escalating waves of AI hostiles. Clear every enemy to advance to higher difficulty tiers.
  - **Team Deathmatch (TDM)**: Team-based combat to 40 eliminations with rapid respawns and temporary spawn protection.
  - **Search & Destroy (S&D)**: 5-round tactical objective mode featuring site planting and defusal mechanics with no mid-round respawns.
- **Procedural Arsenal**:
  - `Slot 1` — **AR-30**: Automatic tactical rifle with reflex optics.
  - `Slot 2` — **Tactical Blade**: Close-quarters melee with sprint speed bonus.
  - `Slot 3` — **VX-9**: High-fire-rate compact SMG for close encounters.
  - `Slot 4` — **S-88**: Heavy bolt-action rifle with 5× magnification optic scope (`RMB` or `X`).
  - `Slot 5` — **P12**: Semi-automatic high-impact sidearm.
  - `Equipment` — Timed **Frag Grenades** and blinding **Flashbangs** with collision and line-of-sight physics.
- **Tactical Abilities & Mechanics**:
  - **Outpost Pulse (`V`)**: Charge energy via eliminations. When full, release a pulse to stun nearby hostiles and restore squad armor.
  - **Blackout Conditions**: Night combat operations trigger periodically with reduced visibility and emergency illumination.
  - **Operator Roles**: Choose between Pathfinder (enhanced speed), Lifeline (improved revive health), or Breacher (extra ordnance).
  - **Revives (`E`)**: Assist downed teammates within range before team elimination.
- **Networking**:
  - Private squad rooms supporting up to 6 players via invite link.
  - Real-time peer-to-peer data channel synchronization paired with server signaling.

---

## Controls

| Action | Key / Input |
| :--- | :--- |
| Move | <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> |
| Look / Aim | <kbd>Mouse</kbd> |
| Fire / Attack | <kbd>Left Click</kbd> or <kbd>J</kbd> |
| Aim Down Sights / Scope | <kbd>Right Click (Hold)</kbd> or <kbd>X</kbd> |
| Select Weapon | <kbd>1</kbd> – <kbd>5</kbd> or <kbd>Scroll Wheel</kbd> |
| Quick Switch | <kbd>Q</kbd> |
| Reload | <kbd>R</kbd> |
| Sprint | <kbd>Shift</kbd> (Hold) |
| Jump | <kbd>Space</kbd> |
| Crouch | <kbd>C</kbd> (Hold) |
| Frag Grenade | <kbd>G</kbd> |
| Flashbang | <kbd>F</kbd> |
| Outpost Pulse | <kbd>V</kbd> |
| Revive / Interact | <kbd>E</kbd> |
| Pause / Settings | <kbd>Esc</kbd> or <kbd>P</kbd> |

---

## Local Setup

### Requirements
- Node.js 20 or higher
- npm / pnpm / yarn

### Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:
   ```bash
   npm run build
   npm start
   ```

---

## Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. Push this project to your GitHub repository:
   ```
   https://github.com/Som-0619/BREACH-OutpostFPS
   ```
2. Navigate to [vercel.com](https://vercel.com) and log in.
3. Click **Add New...** > **Project**.
4. Import your **`BREACH-OutpostFPS`** repository.
5. In the project configuration:
   - **Framework Preset**: Next.js (automatically detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (or `next build`)
   - **Output Directory**: `.next`
6. Click **Deploy**. Vercel will build the project and provide your live application URL.

### Method 2: Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run the deployment command from the project root:
   ```bash
   vercel
   ```
3. To deploy directly to production:
   ```bash
   vercel --prod
   ```

---

## Architecture

- **Rendering Engine**: Client-side WebGL 2 powered by Three.js in `public/`
- **Application Framework**: Next.js 16 (App Router) + React 19 in `app/`
- **Styling**: Tailwind CSS v4
- **Room Coordination & Signaling**: Next.js dynamic API routes in `app/api/rooms/[action]` with WebRTC peer connections
