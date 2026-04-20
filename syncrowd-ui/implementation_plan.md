# Advanced Technical Design: Photorealistic Skeuomorphic Dashboard

This plan details the exact architectural, styling, and asset-generation strategies required to achieve the ultra-premium, photorealistic "glass and metal" aesthetic presented in the mockup. 

## User Review Required

> [!IMPORTANT]
> This advanced plan involves completely stripping out the standard flat UI (Tailwind's default look) in favor of heavily customized CSS variables, inset shadows, and generated images to create a 3D skeuomorphic feel. Please confirm that you are ready for this highly customized structural change.

## Proposed Changes

---

### 1. Advanced CSS & Theming Strategy
The standard Tailwind classes are insufficient for the complex metallic borders and glowing inset depths shown in the image. We will create custom utility classes in `index.css`.

#### [MODIFY] [index.css](file:///c:/Users/Balamurugan/Downloads/SynCrowd%20AI/syncrowd-ui/src/index.css)
- **Deep Backgrounds**: Set body background to a deep metallic slate (`#0a0f18`).
- **`.skeuo-panel`**: Create a class mimicking the thick, dark metallic panels.
  - `background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%)`
  - `border: 1px solid #334155`
  - `box-shadow: inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.6)`
- **`.skeuo-inset`**: For the inner content areas (like the gate list or AI cards).
  - `background: rgba(0, 0, 0, 0.4)`
  - `box-shadow: inset 0 2px 10px rgba(0,0,0,0.5)`
  - `border-top: 1px solid rgba(0,0,0,0.8)`
  - `border-bottom: 1px solid rgba(255,255,255,0.05)`

---

### 2. Component Refactoring & New Architecture

We will delete `Sidebar.jsx` and `Header.jsx` and create a completely new layout structure to match the 3-column dense dashboard.

#### [NEW] `TopNavigationBar.jsx`
- Spans 100vw. Features the SmartCrowdX logo (left), Navigation Tabs with cyan active-state underlines (center), and Action Icons + Admin Profile (right).

#### [MODIFY] [CommandCenter.jsx](file:///c:/Users/Balamurugan/Downloads/SynCrowd%20AI/syncrowd-ui/src/views/CommandCenter.jsx)
Will serve as the grid wrapper for the 3 columns:

**Column 1: `GateStatusPanel.jsx` (Left)**
- **Header**: "Real-Time Gate Status"
- **Table**: Maps through `densities` (G1-G17). 
- **Custom Progress Bar**: Instead of text percentages, renders a dynamic width `div` colored Green (<40%), Yellow (40-75%), or Red (>75%), alongside the queue length text.
- **Footer**: A "Liv: Congested [READY]" glowing metallic button.

**Column 2: `HeatmapCenterpiece.jsx` (Center)**
- **Background**: The AI-generated stadium image (see Asset Generation below).
- **SVG Overlay**: We will overlay the existing bezier curve paths and glowing nodes *directly on top* of the stadium image, adjusting coordinates so it perfectly frames the pitch.
- **Floating HUD**: A translucent floating box showing dynamic `Total Attendance` (calculated from gate loads) and `Capacity %`.
- **Live Statistics Footer**: A metallic bar pinned to the bottom showing: `Total Attendance`, `Avg Entry Rate`, `VIP Gate Entries`, `Weather (32°C)`, and `Local Time`.

**Column 3: `AIInsightsPanel.jsx` & `CameraFeeds.jsx` (Right)**
- **Insights**: 4 distinct skeuomorphic cards (`Expected Surge`, `Recommended Gates`, `Gates to Monitor`, `Emergency Mode`). Will pull actual data from `RoutingEngine.js` and `PredictionEngine.js`.
- **Camera Feeds**: Two stacked, realistic security camera images (generated) with timestamp overlays.

---

### 3. AI Asset Generation Prompts

I will execute the `generate_image` tool using the following exact prompts to build the visual assets:

1. **Center Stadium**: `stadium_bg`
   > "High angle sweeping wide drone shot of a massive circular cricket stadium at night, packed with crowds, brightly lit green pitch, photorealistic, 8k resolution, cinematic lighting, hyper-detailed."
2. **Camera Feed 1**: `cam_gate`
   > "Security camera footage of a crowded stadium entrance gate at night, dense crowds pushing through turnstiles, low quality CCTV look, glowing lights."
3. **Camera Feed 2**: `cam_concourse`
   > "Security camera footage of an indoor stadium concourse, wide angle, people walking, fluorescent lighting, CCTV aesthetic."

---

### 4. Dynamic Data Binding

- **Attendance Math**: I will update `MetricsPanel` logic to extrapolate a realistic Total Attendance number based on the current gate loads (e.g., if average load is 50%, attendance is ~32,000 / 65,000).
- **AI Recommendation**: The "Recommended Gates" card will actively display the output of `RoutingEngine.getBestGate()`.
- **Emergency Action**: Clicking the "Emergency Mode" card on the right will trigger the red pulsing lockdown across the entire dashboard interface.

## Verification Plan
1. Generate the 3 necessary AI images and verify they save to the artifacts directory.
2. Build out the CSS architecture and grid layout without data.
3. Wire up the live `useSimulation` data to the new UI components.
4. Verify the SVG overlay correctly lines up with the generated center stadium image.
